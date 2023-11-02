import { z } from 'zod';
import { KWENTA_SUBGRAPH_URL, POLYNOMIAL_SUBGRAPH_URL } from '../utils';
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';

const kwentaClient = new ApolloClient({
  uri: KWENTA_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

const polyClient = new ApolloClient({
  uri: POLYNOMIAL_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

export const AccountBySmartIdQuery = gql`
  query Account($id: String!) {
    smartMarginAccount(id: $id) {
      owner
    }
  }
`;

export const AccountQuery = gql`
  query SmAccounts($account: String) {
    logAccountCreateds(where: { account: $account }) {
      owner
      account
    }
  }
`;

const SmartMarginAccountSchema = z.object({
  owner: z.string(),
});

const ResponseSchema = z
  .object({
    smartMarginAccount: SmartMarginAccountSchema,
  })
  .optional();

const OwnerByPolyAccountSchema = z.array(
  z.object({
    owner: z.string(),
    account: z.string(),
  })
);

const ResponseSchemaOwnerByPoly = z
  .object({
    logAccountCreateds: OwnerByPolyAccountSchema,
  })
  .optional();

export const useOwnerKwenta = (smartAccountId?: string) => {
  const { data, ...rest } = useQuery(AccountBySmartIdQuery, {
    client: kwentaClient,
    variables: { id: smartAccountId },
    skip: !smartAccountId,
  });

  const parsedResult = ResponseSchema.safeParse(data);
  const kwentaOwner = parsedResult.success ? parsedResult.data?.smartMarginAccount?.owner : null;

  return { ...rest, kwentaOwner };
};

export const useOwnerPolynomial = (polynomialAccount?: string) => {
  const { data, ...rest } = useQuery(AccountQuery, {
    client: polyClient,
    variables: { account: polynomialAccount },
    skip: !polynomialAccount,
  });

  const parsedResult = ResponseSchemaOwnerByPoly.safeParse(data);
  const polynomialOwner = parsedResult.success
    ? parsedResult.data?.logAccountCreateds?.[0]?.owner
    : null;

  return { ...rest, polynomialOwner };
};
