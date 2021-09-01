import { gql } from 'graphql-request';
import { SynthHolderParams } from '../../src/types';
import { createGQLWhereString, createGQLBlockNumberString } from '../../src/utils';

export const createSynthHoldersQuery = (params?: SynthHolderParams): string => {
	const whereString = createGQLWhereString(
		Object.entries({
			id: (params?.id ?? null) != null ? 'id' : null,
			synth: (params?.synth ?? null) != null ? 'synth' : null,
		})
	);

	return gql`
		query synthHolders($max: Int, $id: String, $synth: String) {
			synthHolders(
				first: $max${createGQLBlockNumberString(params?.blockNumber ?? null)}
				where: ${whereString}
				orderBy: balanceOf
				orderDirection: desc
			) {
				id
        synth
        balanceOf
			}
		}
	`;
};
