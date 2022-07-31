import { useQuery, UseQueryOptions } from 'react-query';

import { Contract } from '@ethersproject/contracts';
import request, { gql } from 'graphql-request';
import { councilNominationsJson, SPACE_KEY } from './constants';
import { Proposal } from '../../types';
import { QueryContext } from '../../context';
import CouncilDilution from '../../contracts/CouncilDilution';
import { getOVMProvider } from './utils';

const useProposalsQuery = (
	_: QueryContext,
	snapshotEndpoint: string,
	spaceKey: SPACE_KEY,
	options?: UseQueryOptions<Proposal[]>
) => {
	const contract = new Contract(CouncilDilution.address, CouncilDilution.abi, getOVMProvider());
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

			const proposalHashes = proposals.map((e: Proposal) => e.id);
			let validHashes: string[];

			if (spaceKey === SPACE_KEY.PROPOSAL) {
				const hashes = (await contract.getValidProposals(proposalHashes)) as string[];
				validHashes = hashes.filter((e) => e !== '').map((hash) => hash);
			} else if (spaceKey === SPACE_KEY.COUNCIL) {
				const nominationHashes = Object.keys(councilNominationsJson);
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
