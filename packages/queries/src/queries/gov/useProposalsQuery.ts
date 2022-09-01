import { useQuery, UseQueryOptions } from 'react-query';
import request, { gql } from 'graphql-request';
import { SPACE_KEY } from './constants';
import { Proposal } from '../../types';
import { QueryContext } from '../../context';

const useProposalsQuery = (
  _: QueryContext,
  snapshotEndpoint: string,
  spaceKey: SPACE_KEY,
  options?: UseQueryOptions<Proposal[]>
) => {
  return useQuery<Proposal[]>(
    ['gov', 'proposals', snapshotEndpoint, spaceKey],
    async () => {
      const { proposals }: { proposals: Proposal[] } = await request(
        snapshotEndpoint,
        gql`
          query ProposalsForSpace($spaceKey: String) {
            proposals(
              first: 20
              where: { space: $spaceKey }
              orderBy: "created"
              orderDirection: desc
            ) {
              id
              title
              body
              choices
              start
              end
              snapshot
              state
              author
              space {
                id
                name
              }
            }
          }
        `,
        { spaceKey: spaceKey }
      );

      return proposals;
    },
    {
      enabled: !!spaceKey,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      ...options,
    }
  );
};

export default useProposalsQuery;
