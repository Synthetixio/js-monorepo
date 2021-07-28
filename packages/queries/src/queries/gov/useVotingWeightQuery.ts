import { useQuery, UseQueryOptions } from 'react-query';
import snapshot from '@snapshot-labs/snapshot.js';

import { ethers } from 'ethers';
import request, { gql } from 'graphql-request';
import { SPACE_KEY } from './constants';
import { SpaceData, SpaceStrategy } from '../../types';
import { QueryContext } from '../../context';

import { getNetworkFromId } from '@synthetixio/contracts-interface';

const useVotingWeightQuery = (
	ctx: QueryContext,
	snapshotEndpoint: string,
	spaceKey: SPACE_KEY,
	block: number | null,
	walletAddress: string|null,
	options?: UseQueryOptions<number[]>
) => {
	return useQuery<number[]>(
		['gov', 'votingWeight', snapshotEndpoint, spaceKey, block, walletAddress],
		async () => {
			const { getAddress } = ethers.utils;
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

			const scores = await snapshot.utils.getScores(
				SPACE_KEY.COUNCIL,
				space.strategies,
				space.network,
				getNetworkFromId({ id: ctx.networkId }).name,
				[getAddress(walletAddress ?? '')],
				block!
			);

			const totalScore = space.strategies.map(
				(_: SpaceStrategy, key: number) => scores[key][getAddress(walletAddress!)] ?? 0
			);

			return totalScore;
		},
		{
			enabled: ctx.provider != null && !!spaceKey && block != null && !!walletAddress,
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			...options,
		}
	);
};

export default useVotingWeightQuery;
