import { request } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';
import get from 'lodash/get';
import BigNumber from 'bignumber.js';

import { GQL_RESPONSE_LIMIT } from './constants';

export const formatParams = (obj: {
	[key: string]: string | number | undefined;
}): { [key: string]: string | number } => {
	const newObj = { ...obj };
	Object.keys(newObj).forEach((key) => newObj[key] == undefined && delete newObj[key]);
	return newObj as { [key: string]: string | number };
};

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

export const requestHelper = async ({
	endpoint,
	query,
	variables,
	prevOutput,
	numTries = new BigNumber(0),
}: {
	endpoint: string;
	query: string;
	variables?: any;
	prevOutput?: any[];
	numTries?: BigNumber;
}): Promise<any> => {
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

	const responseName = query.substring(
		query.indexOf('query ') + 'query '.length,
		query.indexOf('(')
	);

	const beginSortedFieldIndex = query.indexOf('orderBy: ') + 'orderBy: '.length;
	const tempString = query.substr(beginSortedFieldIndex);
	const sortedField = tempString.substr(0, tempString.indexOf('\n'));

	if (prevOutput && prevOutput.length > 0) {
		const lastSortedField = prevOutput[prevOutput.length - 1][sortedField];
		const sortedFieldVariable = sortedField + 'var';
		const newQuery = updateQueryString({
			query,
			sortedField,
			sortedFieldVariable,
		});
		responseVariables[sortedFieldVariable] = lastSortedField;
		console.log('repeat newQuery', newQuery, 'responseVariables', responseVariables);
		const newResponse = await request(endpoint, newQuery as RequestDocument, responseVariables);
		const newResponseData = get(newResponse, `${responseName}`, []);
		console.log('repeat newResponseData.length', newResponseData.length);
		if (newResponseData.length === GQL_RESPONSE_LIMIT) {
			return requestHelper({
				endpoint,
				query,
				variables,
				prevOutput: [...prevOutput, ...newResponseData],
				numTries: numTries.plus(1),
			});
		}
		return { responseName: [...prevOutput, ...newResponseData] };
	} else {
		console.log('query', query, 'responseVariables', responseVariables);
		const response = await request(endpoint, query as RequestDocument, responseVariables);
		const responseData = get(response, `${responseName}`, []);
		console.log('responseData.length', responseData.length);
		if (responseData.length === GQL_RESPONSE_LIMIT) {
			return requestHelper({
				endpoint,
				query,
				variables,
				prevOutput: responseData,
				numTries: numTries.plus(1),
			});
		}
		return response;
	}
};

const updateQueryString = ({
	query,
	sortedField,
	sortedFieldVariable,
}: {
	query: string;
	sortedField: string;
	sortedFieldVariable: string;
}): string => {
	const queryStringArray = query.split('where: {');
	queryStringArray.splice(1, 0, `where: { ${sortedField}_gt:$${sortedFieldVariable},`);
	return queryStringArray.join('');
};
