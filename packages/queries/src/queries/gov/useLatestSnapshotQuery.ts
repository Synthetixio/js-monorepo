import { useQuery, UseQueryOptions } from 'react-query';
import request, { gql } from 'graphql-request';
import { Proposal } from '../../types';
import { electionAuthor, SPACE_KEY } from './constants';
import { QueryContext } from '../../context';

type LatestSnapshotResult = {
	latestSnapshot: string;
};

const useLatestSnapshotQuery = (_: QueryContext, snapshotEndpoint: string, options?: UseQueryOptions<LatestSnapshotResult>) => {
	return useQuery<LatestSnapshotResult>(
		['gov', 'latestSnapshot', snapshotEndpoint],
		async () => {
			const { proposals }: { proposals: Proposal[] } = await request(
				snapshotEndpoint,
				gql`
					query LatestSnapshot($councilKey: String, $author: String) {
						proposals(
							first: 1
							where: { space: $councilKey, author: $author }
							orderBy: "created"
							orderDirection: desc
						) {
							snapshot
						}
					}
				`,
				{
					councilKey: SPACE_KEY.COUNCIL,
					author: electionAuthor,
				}
			);

			return {
				latestSnapshot: proposals[0].snapshot ?? 0,
			};
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

export default useLatestSnapshotQuery;
