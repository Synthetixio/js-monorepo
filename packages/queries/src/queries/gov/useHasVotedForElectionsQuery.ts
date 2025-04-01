import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import snapshot from '@snapshot-labs/snapshot.js';

import request, { gql } from 'graphql-request';
import { Proposal, SpaceStrategy, Vote } from '../../types';
import { getAddress } from '@ethersproject/address';
import { electionAuthor, SPACE_KEY } from './constants';
import { QueryContext } from '../../context';

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
              strategies {
                name
                params
              }
              network
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
          return {
            hasVoted: true,
          };
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

      const totalWeight = totalScore.reduce((a: number, b: number) => a + b);

      //@notice user has no voting weight
      if (totalWeight === 0) {
        return {
          hasVoted: true,
        };
      }

      const electionHashes = proposals.map((e) => e.id);

      // @ts-ignore
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
          userAddress: walletAddress ?? '',
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
