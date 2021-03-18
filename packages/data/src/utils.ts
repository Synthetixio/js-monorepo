export const formatParams = (obj: {
	[key: string]: string | number | undefined;
}): { [key: string]: string | number } => {
	const newObj = { ...obj };
	Object.keys(newObj).forEach((key) => newObj[key] == undefined && delete newObj[key]);
	return newObj as { [key: string]: string | number };
};
