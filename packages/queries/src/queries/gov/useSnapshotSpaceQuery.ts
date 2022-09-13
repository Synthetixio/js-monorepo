import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';
import { SPACE_KEY } from './constants';
import { SpaceData } from '../../types';
import { QueryContext } from '../../context';

const useSnapshotSpaceQuery = (
  _: QueryContext,
  snapshotEndpoint: string,
  spaceKey: SPACE_KEY,
  options?: UseQueryOptions<SpaceData>
) => {
  return useQuery<SpaceData>(
    ['gov', 'snapshotSpace', snapshotEndpoint, spaceKey],
    async () => {
      const { space }: { space: SpaceData } = await request(
        snapshotEndpoint,
        gql`
          query Space($spaceKey: String) {
            space(id: $spaceKey) {
              domain
              about
              members
              name
              network
              skin
              symbol
              strategies {
                name
                params
              }
              filters {
                minScore
                onlyMembers
              }
            }
          }
        `,
        { spaceKey: spaceKey }
      );

      return space;
    },
    {
      enabled: !!snapshotEndpoint && !!spaceKey,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      ...options,
    }
  );
};

export default useSnapshotSpaceQuery;
