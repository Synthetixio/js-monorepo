import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { POLYNOMIAL_SUBGRAPH_URL } from '../utils';

const gql = (data: TemplateStringsArray) => data[0];

const AccountQuery = gql`
  query SmAccounts($owner: String) {
    logAccountCreateds(where: { owner: $owner }) {
      owner
      account
    }
  }
`;
const PolySmartMarginAccountsSchema = z.array(
  z.object({
    owner: z.string(),
    account: z.string(),
  })
);
const LocationSchema = z.object({
  line: z.number(),
  column: z.number(),
});

const ErrorSchema = z.object({
  locations: z.array(LocationSchema),
  message: z.string(),
});
const DataSchema = z.object({
  logAccountCreateds: PolySmartMarginAccountsSchema,
});

const ResponseSchema = z.union([
  z.object({
    data: DataSchema,
  }),
  z.object({
    errors: z.array(ErrorSchema),
  }),
]);

export const usePolynomialAccount = (address?: string) => {
  return useQuery({
    queryKey: ['usePolynomialAccount', address],
    queryFn: async () => {
      const res = await fetch(POLYNOMIAL_SUBGRAPH_URL, {
        method: 'POST',
        body: JSON.stringify({
          query: AccountQuery,
          variables: { owner: address?.toLowerCase() },
        }),
      });
      const resp = await res.json();
      const json = ResponseSchema.parse(resp);
      if ('errors' in json) {
        const { message } = json.errors[0];
        throw new Error(message);
      }
      return json.data.logAccountCreateds.at(0) || null;
    },
    enabled: Boolean(address),
    staleTime: 10000,
  });
};
