import { gql } from 'graphql-request';

export const synthetixQuery = gql`
	query synthetixes {
		synthetixes(first: 1) {
			id
			issuers
			snxHolders
		}
	}
`;
