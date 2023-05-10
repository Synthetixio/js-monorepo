import { z } from 'zod';
import { KWENTA_SUBGRAPH_URL } from '../utils';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';

const kwentaClient = new ApolloClient({
  uri: KWENTA_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

const AccountQuery = gql`
  query Account($owner: String) {
    smartMarginAccounts(where: { owner: $owner }) {
      id
      owner
    }
  }
`;

const SmartMarginAccountSchema = z.array(
  z
    .object({
      id: z.string(),
      owner: z.string(),
    })
    .transform((x) => ({ account: x.id, owner: x.owner }))
);

const ResponseSchema = z
  .object({
    smartMarginAccounts: SmartMarginAccountSchema,
  })
  .optional();

export const useKwentaAccount = (address?: string) => {
  const { data, ...rest } = useQuery(AccountQuery, {
    client: kwentaClient,
    variables: { owner: address },
    skip: !address,
  });
  const parsedData = ResponseSchema.parse(data);
  return { ...rest, data: parsedData?.smartMarginAccounts.at(0) };
};
