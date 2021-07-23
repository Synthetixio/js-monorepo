import { useQuery, UseQueryOptions } from 'react-query';

import { ethers } from 'ethers';
import request, { gql } from 'graphql-request';
import { SPACE_KEY } from './constants';
import { Proposal } from '../../types';
import { QueryContext } from '../../context';

import CouncilDilution from '../../contracts/CouncilDilution';
import axios from 'axios';
import { COUNCIL_NOMINATIONS_URL } from '../../constants';

const useProposalsQuery = (ctx: QueryContext, snapshotEndpoint: string, spaceKey: SPACE_KEY, options?: UseQueryOptions<Proposal[]>) => {

	const contract = new ethers.Contract(
		CouncilDilution.address,
		CouncilDilution.abi,
		ctx.provider!
	);

	return useQuery<Proposal[]>(
		['gov', 'proposals', snapshotEndpoint, spaceKey],
		async () => {
			const { proposals }: { proposals: Proposal[] } = await request(
				snapshotEndpoint,
				gql`
					query ProposalsForSpace($spaceKey: String) {
						proposals(
							first: 10
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

			const proposalHashes = proposals.map((e: Proposal) => e.id);
			let validHashes: string[];

			if (spaceKey === SPACE_KEY.PROPOSAL) {
				const hashes = (await contract.getValidProposals(proposalHashes)) as string[];
				validHashes = hashes.filter((e) => e !== '').map((hash) => hash);
			} else if (spaceKey === SPACE_KEY.COUNCIL) {
				const nominationHashes = Object.keys(await axios.get(COUNCIL_NOMINATIONS_URL));
				validHashes = proposalHashes
					.filter((e) => nominationHashes.includes(e))
					.map((hash) => hash);
			} else {
				validHashes = proposalHashes;
			}

			const mappedProposals = proposals.map(async (proposal) => {
				if (validHashes.includes(proposal.id)) {
					return {
						...proposal,
					};
				} else {
					return null;
				}
			});
			const resolvedProposals = await Promise.all(mappedProposals);
			return resolvedProposals.filter((e) => e !== null) as Proposal[];
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
