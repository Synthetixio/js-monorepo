import { useQuery, UseQueryOptions } from 'react-query';
import request, { gql } from 'graphql-request';

import { DelegationWallet } from './types';
import { DELEGATE_GRAPH_ENDPOINT } from './constants';
import { QueryContext } from '../../context';

const useGetAuthoriserWallets = (ctx: QueryContext, delegationWallet: string, options?: UseQueryOptions<[DelegationWallet]>) => {
	return useQuery<[DelegationWallet]>(
		['delegate', 'authorizers', ctx.networkId, delegationWallet],
		async () => {
			const { delegatedWallets } = await request(
				DELEGATE_GRAPH_ENDPOINT,
				gql`
					query getAuthoriserWallets($delegate: String) {
						delegatedWallets(first: 100, where: { delegate: $delegate }) {
							authoriser
							canMint
							canBurn
							canClaim
						}
					}
				`,
				{
					delegate: delegationWallet,
				}
			);

			return delegatedWallets
				.filter(
					({
						canMint,
						canBurn,
						canClaim,
					}: {
						canMint: boolean;
						canBurn: boolean;
						canClaim: boolean;
					}) => canMint || canBurn || canClaim
				)
				.map(
					({
						authoriser,
						canMint,
						canBurn,
						canClaim,
					}: {
						authoriser: string;
						canMint: boolean;
						canBurn: boolean;
						canClaim: boolean;
					}) => ({
						address: authoriser,
						canMint,
						canBurn,
						canClaim,
					})
				);
		},
		{
			enabled: ctx.networkId != null && delegationWallet != null,
			...options,
			refetchInterval: false,
			refetchIntervalInBackground: false,
		}
	);
};

export default useGetAuthoriserWallets;
