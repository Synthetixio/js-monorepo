import { useQuery, UseQueryOptions } from 'react-query';
import request, { gql } from 'graphql-request';

import { DelegationWallet } from './types';
import { DELEGATE_GRAPH_ENDPOINT } from './constants';
import { QueryContext } from '../../context';

const useGetDelegateWallets = (ctx: QueryContext, authorizerAddress: string, options?: UseQueryOptions<[DelegationWallet]>) => {
	return useQuery<[DelegationWallet]>(
		['delegate', 'delegated', ctx.networkId, authorizerAddress],
		async () => {
			const { delegatedWallets } = await request(
				DELEGATE_GRAPH_ENDPOINT,
				gql`
					query getDelegateWallets($authoriser: String) {
						delegatedWallets(first: 100, where: { authoriser: $authoriser }) {
							delegate
							canMint
							canBurn
							canClaim
							canExchange
						}
					}
				`,
				{
					authoriser: authorizerAddress,
				}
			);

			return delegatedWallets
				.filter(
					({
						canMint,
						canBurn,
						canClaim,
						canExchange,
					}: {
						canMint: boolean;
						canBurn: boolean;
						canClaim: boolean;
						canExchange: boolean;
					}) => canMint || canBurn || canClaim || canExchange
				)
				.map(
					({
						delegate,
						canMint,
						canBurn,
						canClaim,
						canExchange,
					}: {
						delegate: string;
						canMint: boolean;
						canBurn: boolean;
						canClaim: boolean;
						canExchange: boolean;
					}) => ({
						address: delegate,
						canAll: canMint && canBurn && canClaim && canExchange,
						canMint,
						canBurn,
						canClaim,
						canExchange,
					})
				);
		},
		{
			enabled: ctx.networkId != null && authorizerAddress != null,
			...options,
			refetchInterval: false,
			refetchIntervalInBackground: false,
		}
	);
};

export default useGetDelegateWallets;
