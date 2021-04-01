import { gql } from 'graphql-request';

import { BaseQueryParams } from '../../src/types';
import { createGQLBlockNumberString } from '../../src/utils';

export const createSynthetixQuery = (params?: BaseQueryParams): string => gql`
	query synthetixes {
		synthetixes(
			first: 1${createGQLBlockNumberString(params?.blockNumber ?? null)}
		) {
			id
			issuers
			snxHolders
		}
	}
`;
