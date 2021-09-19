import { useQuery, UseQueryOptions } from 'react-query';
import snapshot from '@snapshot-labs/snapshot.js';

import request, { gql } from 'graphql-request';
import { Proposal, SpaceData, SpaceStrategy } from '../../types';
import { getAddress } from 'ethers/lib/utils';
import { electionAuthor, SPACE_KEY } from './constants';
import { QueryContext } from '../../context';
import { getNetworkFromId } from '@synthetixio/contracts-interface';

export enum ProposalStates {
	ACTIVE = 'active',
	CLOSED = 'closed',
}

type HasVotedResult = {
	hasVoted: boolean;
};

const useHasVotedForElectionsQuery = (
	ctx: QueryContext,
	snapshotEndpoint: string,
	walletAddress: string | null,
	options?: UseQueryOptions<HasVotedResult>
) => {
	return useQuery<HasVotedResult>(
		['gov', 'hasVoted', snapshotEndpoint, walletAddress],
		async () => {
			const { proposals }: { proposals: Proposal[] } = await request(
				snapshotEndpoint,
				gql`
					query LatestElections(
						$councilKey: String
						$ambassadorKey: String
						$grantKey: String
						$treasuryKey: String
						$state: String
						$author: String
					) {
						proposals(
							first: 4
							where: {
								space_in: [$councilKey, $ambassadorKey, $grantKey, $treasuryKey]
								author: $author
								state: $state
							}
							orderBy: "created"
							orderDirection: desc
						) {
							id
							snapshot
						}
					}
				`,
				{
					councilKey: SPACE_KEY.COUNCIL,
					ambassadorKey: SPACE_KEY.AMBASSADOR,
					grantKey: SPACE_KEY.GRANTS,
					treasuryKey: SPACE_KEY.TREASURY,
					state: ProposalStates.ACTIVE,
					author: electionAuthor,
				}
			);

			// @notice Three DAO elections not currently active
			if (proposals.length < 4 || !proposals[0]) {
				return { hasVoted: true };
			}

			const latestSnapshot = proposals[0].snapshot;

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
				{ spaceKey: SPACE_KEY.COUNCIL }
			);

			const scores = await snapshot.utils.getScores(
				SPACE_KEY.COUNCIL,
				space.strategies,
				space.network,
				getNetworkFromId({ id: ctx.networkId }).name,
				[getAddress(walletAddress!)],
				latestSnapshot
			);

			const totalScore = space.strategies.map(
				(_: SpaceStrategy, key: number) => scores[key][getAddress(walletAddress!)]
			);

			const totalWeight = totalScore.reduce((a: number, b: number) => a ?? 0 + b ?? 0);

			//@notice user has no voting weight
			if (totalWeight === 0) {
				return {
					hasVoted: true,
				};
			}

			const electionHashes = proposals.map((e) => e.id);

			const { votes } = await request(
				snapshotEndpoint,
				gql`
					query VotesForElections($electionHashes: [String!]!, $userAddress: String) {
						votes(where: { proposal_in: $electionHashes, voter: $userAddress }) {
							voter
							created
						}
					}
				`,
				{
					electionHashes: electionHashes,
					userAddress: walletAddress,
				}
			);
			if (votes.length === 4) {
				return { hasVoted: true };
			} else {
				return { hasVoted: false };
			}
		},
		{
			enabled: ctx.provider != null && !!walletAddress,
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			...options,
		}
	);
};

export default useHasVotedForElectionsQuery;
