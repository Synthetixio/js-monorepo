import { useQuery, UseQueryOptions } from 'react-query';
import snapshot from '@snapshot-labs/snapshot.js';

import { ethers } from 'ethers';
import { uniqBy } from 'lodash';
import { Vote, SpaceStrategy, Proposal, ProposalResults } from '../../types';
import request, { gql } from 'graphql-request';
import { SPACE_KEY } from './constants';
import { QueryContext } from '../../context';

import CouncilDilution from '../../contracts/CouncilDilution';

const useProposalQuery = (
	ctx: QueryContext,
	snapshotEndpoint: string,
	spaceKey: SPACE_KEY,
	hash: string | null,
	walletAddress: string | null,
	options?: UseQueryOptions<ProposalResults>
) => {
	return useQuery<ProposalResults>(
		['gov', 'proposal', snapshotEndpoint, spaceKey, hash, walletAddress],
		async () => {
			const { getAddress } = ethers.utils;

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

			const { votes }: { votes: Vote[] } = await request(
				snapshotEndpoint,
				gql`
					query Votes($proposal: String) {
						votes(
							first: 1000
							orderBy: "vp"
							orderDirection: desc
							where: { proposal: $proposal, vp_gt: 0 }
						) {
							id
							voter
							choice
							vp
							vp_by_strategy
						}
					}
				`,
				{ proposal: proposal.id }
			);

			const voterAddresses = votes.map((e: Vote) => ethers.utils.getAddress(e.voter));

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
					(a: Vote) => getAddress(a.voter)
				);
			}

			/* Apply dilution penalties for SIP/SCCP pages */
			if (spaceKey === SPACE_KEY.PROPOSAL) {
				const contract = new ethers.Contract(
					CouncilDilution.address,
					CouncilDilution.abi,
					ctx.provider as any
				);
				mappedVotes = await Promise.all(
					mappedVotes.map(async (vote) => {
						const dilutedValueBN = await contract.getDilutedWeightForProposal(
							hash,
							getAddress(vote.voter)
						);
						const diluteValueNumber = Number(ethers.utils.formatEther(dilutedValueBN));

						const dilutedResult = vote.balance * diluteValueNumber;
						return {
							...vote,
							balance: dilutedResult,
							scores: [dilutedResult],
						};
					})
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
			enabled: !!walletAddress && !!hash && ctx.provider != null && !!spaceKey,
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			...options,
		}
	);
};

export default useProposalQuery;
