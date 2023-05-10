import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { KWENTA_SUBGRAPH_URL } from '../utils';

const gql = (data: TemplateStringsArray) => data[0];
const AccountQuery = gql`
  query Account($owner: String) {
    smartMarginAccounts(where: { owner: $owner }) {
      id
      owner
    }
  }
`;

const LocationSchema = z.object({
  line: z.number(),
  column: z.number(),
});

const ErrorSchema = z.object({
  locations: z.array(LocationSchema),
  message: z.string(),
});

const SmartMarginAccountSchema = z.array(
  z
    .object({
      id: z.string(),
      owner: z.string(),
    })
    .transform((x) => ({ account: x.id, owner: x.owner }))
);

const DataSchema = z.object({
  smartMarginAccounts: SmartMarginAccountSchema,
});

const ResponseSchema = z.union([
  z.object({
    data: DataSchema,
  }),
  z.object({
    errors: z.array(ErrorSchema),
  }),
]);

export const useKwentaAccount = (address?: string) => {
  return useQuery({
    queryKey: ['useKwentaAccount', address],
    queryFn: async () => {
      const res = await fetch(KWENTA_SUBGRAPH_URL, {
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
      return json.data.smartMarginAccounts.at(0) || null;
    },
    enabled: Boolean(address),
    staleTime: 10000,
  });
};
