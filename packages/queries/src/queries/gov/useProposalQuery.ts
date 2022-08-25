import { useQuery, UseQueryOptions } from 'react-query';
import snapshot from '@snapshot-labs/snapshot.js';

import { getAddress } from '@ethersproject/address';
import { uniqBy } from 'lodash';
import { Vote, SpaceStrategy, Proposal, ProposalResults } from '../../types';
import request, { gql } from 'graphql-request';
import { SPACE_KEY } from './constants';
import { QueryContext } from '../../context';

const useProposalQuery = (
  _: QueryContext,
  snapshotEndpoint: string,
  spaceKey: SPACE_KEY,
  hash: string | null,
  walletAddress: string | null,
  options?: UseQueryOptions<ProposalResults>
) => {
  return useQuery<ProposalResults>(
    ['gov', 'proposal', snapshotEndpoint, spaceKey, hash, walletAddress],
    async () => {
      const { proposal }: { proposal: Proposal } = await request(
        snapshotEndpoint,
        gql`
          query Proposal($id: String) {
            proposal(id: $id) {
              id
              title
              body
              choices
              start
              end
              snapshot
              state
              author
              strategies {
                name
                params
              }
              network
              space {
                id
                name
                symbol
              }
            }
          }
        `,
        { id: hash }
      );

      const pages = ['_1', '_2', '_3', '_4'];
      const params = Object.fromEntries(
        pages.map((q, i) => [
          q,
          {
            __aliasFor: 'votes',
            __args: {
              where: {
                vp_gt: 0,
                proposal: proposal.id,
              },
              first: 1000,
              skip: i * 1000,
              orderBy: 'vp',
            },
            id: true,
            voter: true,
            choice: true,
            vp: true,
            vp_by_strategy: true,
          },
        ])
      );

      let votes = await snapshot.utils.subgraphRequest(snapshotEndpoint, params);
      votes = votes._1.concat(votes._2).concat(votes._3).concat(votes._3);

      // const { votes }: { votes: Vote[] } = await request(
      // 	snapshotEndpoint,
      // 	gql`
      // 		query Votes($proposal: String) {
      // 			votes(
      // 				first: 1000
      // 				orderBy: "vp"
      // 				orderDirection: desc
      // 				where: { proposal: $proposal, vp_gt: 0 }
      // 			) {
      // 				id
      // 				voter
      // 				choice
      // 				vp
      // 				vp_by_strategy
      // 			}
      // 		}
      // 	`,
      // 	{ proposal: proposal.id }
      // );

      const voterAddresses = votes.map((e: Vote) => getAddress(e.voter));

      interface MappedVotes extends Vote {
        scores: number[];
        balance: number;
      }

      let mappedVotes = votes as MappedVotes[];

      if (proposal.state === 'closed') {
        mappedVotes.map((vote) => {
          vote.scores = proposal.strategies.map(
            (_: SpaceStrategy, key: number) => vote.vp_by_strategy[key] || 0
          );
          vote.balance = vote.vp;
          return vote;
        });
      } else {
        const block = parseInt(proposal.snapshot);

        const [scores] = await Promise.all([
          snapshot.utils.getScores(
            spaceKey,
            proposal.strategies,
            proposal.network,
            voterAddresses,
            block
          ),
        ]);

        mappedVotes = uniqBy(
          mappedVotes
            .map((vote) => {
              vote.scores = proposal.strategies.map(
                (_: SpaceStrategy, key: number) => scores[key][getAddress(vote.voter)] || 0
              );
              vote.balance = vote.scores.reduce((a: number, b: number) => a + b, 0);
              return vote;
            })
            .filter((vote) => vote.balance > 0)
            .sort((a, b) => b.balance - a.balance),
          (a) => getAddress(a.voter)
        );
      }

      const returnVoteHistory = () => {
        if (walletAddress && voterAddresses.includes(getAddress(walletAddress))) {
          const index = mappedVotes.findIndex(
            (a) => getAddress(a.voter) === getAddress(walletAddress)
          );
          const currentUserVote = mappedVotes[index];
          mappedVotes.splice(index, 1);
          mappedVotes.unshift(currentUserVote);
        }
        return mappedVotes;
      };

      const voteList = returnVoteHistory();

      const results = {
        totalVotes: proposal.choices.map(
          (_: string, i: number) => mappedVotes.filter((vote) => vote.choice === i + 1).length
        ),
        totalBalances: proposal.choices.map((_: string, i: number) =>
          mappedVotes.filter((vote) => vote.choice === i + 1).reduce((a, b) => a + b.balance, 0)
        ),
        totalScores: proposal.choices.map((_: string, i: number) =>
          proposal.strategies.map((_, sI) =>
            mappedVotes
              .filter((vote) => vote.choice === i + 1)
              .reduce((a, b) => a + b.scores[sI], 0)
          )
        ),
        totalVotesBalances: mappedVotes.reduce((a, b) => a + b.balance, 0),
        choices: proposal.choices,
        spaceSymbol: proposal.space.symbol,
        voteList: voteList,
      };

      return results;
    },
    {
      enabled: !!hash && !!spaceKey && !!snapshotEndpoint,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      ...options,
    }
  );
};

export default useProposalQuery;
