import { gql } from 'graphql-request';

export const createSynthetixQuery = (): string => gql`
	query synthetixes {
		synthetixes(
			first: 1${createGQLBlockNumberString(blockNumber)}
		) {
			id
			issuers
			snxHolders
		}
	}
`;
