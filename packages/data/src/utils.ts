import { request } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';
import { sortBy, get } from 'lodash';
import BigNumber from 'bignumber.js';

import { GQL_RESPONSE_LIMIT } from './constants';

export const formatParams = (obj?: {
	[key: string]: string | number | boolean | undefined;
}): { [key: string]: string | number | boolean } => {
	if (obj == null) {
		return {};
	}
	const newObj = { ...obj };
	Object.keys(newObj).forEach((key) => newObj[key] == undefined && delete newObj[key]);
	return newObj as { [key: string]: string | number | boolean };
};

export const createGQLBlockNumberString = (blockNumber: number | null): string =>
	blockNumber != null ? `\nblock: { number: ${blockNumber} }\n` : '';

export const createGQLWhereString = (data: Array<[string, string | null]>): string => {
	const whereString = data.reduce((acc, [key, param]) => {
		if (param != null) {
			return (acc += `${key}: $${param},`);
		}
		return acc;
	}, '');
	return whereString !== '' ? '{ ' + whereString.slice(0, -1) + ' }' : '{}';
};

export const formatTimestamp = (ts: number | string): number => Number(ts) * 1000;

export const hexToAscii = (str: string): string => {
	const hex = str.toString();
	let out = '';
	for (let n = 2; n < hex.length; n += 2) {
		const nextPair = hex.substr(n, 2);
		if (nextPair !== '00') {
			out += String.fromCharCode(parseInt(nextPair, 16));
		}
	}
	return out;
};

export const getHashFromId = (id: string): string => id.split('-')[0];

const setPaginationMaxVariable = ({
	variables,
	numTries,
}: {
	variables: any;
	numTries: BigNumber;
}): any => {
	if (!variables) {
		return {};
	}
	const responseVariables = { ...variables };
	const resultsToDate = numTries.times(GQL_RESPONSE_LIMIT);

	if (variables.max == null || variables.max > resultsToDate) {
		responseVariables.max =
			variables.max == null
				? GQL_RESPONSE_LIMIT
				: variables.max - resultsToDate.toNumber() >= GQL_RESPONSE_LIMIT
				? GQL_RESPONSE_LIMIT
				: variables.max - resultsToDate.toNumber();
	}
	return responseVariables;
};

export const getResponseName = (query: string): string =>
	query.substring(query.indexOf('query ') + 'query '.length, query.indexOf('('));

export const getSortedField = (query: string): string => {
	if (query.indexOf('orderBy: ') !== -1) {
		const beginSortedFieldIndex = query.indexOf('orderBy: ') + 'orderBy: '.length;
		const tempString = query.substr(beginSortedFieldIndex);
		return tempString.substr(0, tempString.indexOf('\n'));
	}
	// id is the default field to sort with pagination if there is no orderBy field
	return 'id';
};

export const requestHelper = async ({
	endpoint,
	variables,
	prevOutput,
	field,
	queryMethod,
	numTries = new BigNumber(0),
}: {
	endpoint: string;
	variables?: any;
	prevOutput?: any[];
	field?: string;
	queryMethod: (variables: any) => string;
	numTries?: BigNumber;
}): Promise<any> => {
	const responseVariables = setPaginationMaxVariable({ variables, numTries });

	if (prevOutput && prevOutput.length > 0) {
		const paginationField = prevOutput[0][field as string];
		const numberRegex = /^\d+$/;
		const autoGeneratedPaginationField = numberRegex.test(paginationField)
			? Number(paginationField)
			: paginationField;
		const newQuery = queryMethod({ ...responseVariables, autoGeneratedPaginationField });
		const responseName = getResponseName(newQuery);

		const newResponse = await request(endpoint, newQuery as RequestDocument, {
			...responseVariables,
			autoGeneratedPaginationField,
		});
		const newResponseData = get(newResponse, `${responseName}`, []);
		if (newResponseData.length === GQL_RESPONSE_LIMIT) {
			return requestHelper({
				endpoint,
				variables,
				field,
				queryMethod,
				prevOutput: [...sortBy(newResponseData, ['timestamp']), ...prevOutput],
				numTries: numTries.plus(1),
			});
		}
		return { [responseName]: [...sortBy(newResponseData, ['timestamp']), ...prevOutput] };
	} else {
		const query = queryMethod(responseVariables);
		const responseName = getResponseName(query);
		const field = getSortedField(query);
		const response = await request(endpoint, query as RequestDocument, responseVariables);
		const responseData = get(response, `${responseName}`, []);
		if (responseData.length === GQL_RESPONSE_LIMIT) {
			return requestHelper({
				endpoint,
				variables,
				field,
				queryMethod,
				prevOutput: sortBy(responseData, [field]),
				numTries: numTries.plus(1),
			});
		}
		return response;
	}
};
