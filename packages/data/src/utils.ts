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
