import { gql } from 'graphql-request';

export const synthExchangesQuery = gql`
	query synthExchanges($maxBlock: Int, $max: Int, $fromAddress: String, $minTimestamp: Int) {
		synthExchanges(
			first: $max
			where: { from: $fromAddress, timestamp_gte: $minTimestamp, block_lte: $maxBlock }
			orderBy: timestamp
			orderDirection: desc
		) {
			id
			account
			from
			fromCurrencyKey
			fromAmount
			fromAmountInUSD
			toCurrencyKey
			toAmount
			toAmountInUSD
			feesInUSD
			toAddress
			timestamp
			gasPrice
			block
			network
		}
	}
`;
