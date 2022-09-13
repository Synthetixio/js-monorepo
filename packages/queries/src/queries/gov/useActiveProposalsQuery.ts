import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import request, { gql } from 'graphql-request';
import { QueryContext } from '../../context';
import { SPACE_KEY } from './constants';
import { Proposal } from '../../types';

const useActiveProposalsQuery = (
  _: QueryContext,
  snapshotEndpoint: string,
  options?: UseQueryOptions<number>
) => {
  return useQuery<number>(
    ['gov', 'activeProposals', snapshotEndpoint],
    async () => {
      const { proposals }: { proposals: Proposal[] } = await request(
        snapshotEndpoint,
        gql`
          query Proposals(
            $councilKey: String
            $ambassadorKey: String
            $grantKey: String
            $proposalKey: String
            $treasuryKey: String
          ) {
            proposals(
              first: 100
              skip: 0
              where: {
                space_in: [$councilKey, $ambassadorKey, $grantKey, $proposalKey, $treasuryKey]
                state: "active"
              }
            ) {
              id
              state
              space {
                id
              }
            }
          }
        `,
        {
          councilKey: SPACE_KEY.COUNCIL,
          ambassadorKey: SPACE_KEY.AMBASSADOR,
          grantKey: SPACE_KEY.GRANTS,
          proposalKey: SPACE_KEY.PROPOSAL,
          treasuryKey: SPACE_KEY.TREASURY,
        }
      );

      return proposals.length;
    },
    {
      enabled: !!snapshotEndpoint,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      ...options,
    }
  );
};

export default useActiveProposalsQuery;
