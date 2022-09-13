import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import snapshot from '@snapshot-labs/snapshot.js';

import { getAddress } from '@ethersproject/address';
import request, { gql } from 'graphql-request';
import { electionAuthor, SPACE_KEY } from './constants';
import { Proposal, SpaceStrategy, Vote } from '../../types';
import { QueryContext } from '../../context';

const useVotingWeightQuery = (
  ctx: QueryContext,
  snapshotEndpoint: string,
  spaceKey: SPACE_KEY,
  walletAddress: string | null,
  options?: UseQueryOptions<number[]>
) => {
  return useQuery<number[]>(
    ['gov', 'votingWeight', snapshotEndpoint, spaceKey, walletAddress],
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
              id
              ipfs
              state
              network
              strategies {
                name
                params
              }
            }
          }
        `,
        {
          councilKey: SPACE_KEY.COUNCIL,
          author: electionAuthor,
        }
      );

      let totalScore: number[];

      const latestProposal = proposals[0];

      if (latestProposal.state === 'closed') {
        const { votes }: { votes: Vote[] } = await request(
          snapshotEndpoint,
          gql`
            query Votes($proposal: String, $userAddress: String) {
              votes(
                orderBy: "vp"
                orderDirection: desc
                where: { proposal: $proposal, vp_gt: 0, voter: $userAddress }
              ) {
                id
                voter
                choice
                vp
                vp_by_strategy
              }
            }
          `,
          { proposal: latestProposal.id, userAddress: walletAddress ?? '' }
        );
        if (votes.length === 0) {
          return [0, 0];
        } else {
          totalScore = votes[0].vp_by_strategy;
        }
      } else {
        const scores = await snapshot.utils.getScores(
          SPACE_KEY.COUNCIL,
          latestProposal.strategies,
          latestProposal.network,
          [getAddress(walletAddress ?? '')],
          Number(latestProposal.snapshot!)
        );

        totalScore = latestProposal.strategies.map(
          (_: SpaceStrategy, key: number) => scores[key][getAddress(walletAddress!)] ?? 0
        );
      }

      return totalScore;
    },
    {
      enabled: ctx.provider != null && !!spaceKey && !!walletAddress,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      ...options,
    }
  );
};

export default useVotingWeightQuery;
