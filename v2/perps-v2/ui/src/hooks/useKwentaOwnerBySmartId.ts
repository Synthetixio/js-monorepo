import { z } from 'zod';
import { useState, useEffect } from 'react';
import { KWENTA_SUBGRAPH_URL } from '../utils';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { useGlobalProvidersWithFallback } from '@snx-v2/useGlobalProvidersWithFallback';

const kwentaClient = new ApolloClient({
  uri: KWENTA_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

const AccountBySmartIdQuery = gql`
  query Account($id: String!) {
    smartMarginAccount(id: $id) {
      owner
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

export const useKwentaOwnerBySmartId = (smartAccountId?: string) => {
  const { data, ...rest } = useQuery(AccountBySmartIdQuery, {
    client: kwentaClient,
    variables: { id: smartAccountId },
    skip: !smartAccountId,
  });

  const parsedResult = ResponseSchema.safeParse(data);
  const kwentaOwner = parsedResult.success ? parsedResult.data?.smartMarginAccount?.owner : null;

  const { globalProviders } = useGlobalProvidersWithFallback();
  const L1DefaultProvider = globalProviders.mainnet;

  const [addressEnsName, setAddressEnsName] = useState<string | null>(null);

  useEffect(() => {
    if (kwentaOwner) {
      const fetchENS = async () => {
        const name = await L1DefaultProvider.lookupAddress(kwentaOwner);
        setAddressEnsName(name);
      };
      fetchENS();
    }
  }, [kwentaOwner, L1DefaultProvider]);

  return { ...rest, kwentaOwner, addressEnsName };
};
