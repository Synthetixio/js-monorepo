import { useQuery, UseQueryOptions } from 'react-query';

import { AreaChartData, SNXPriceData, TimeSeries } from '../../types';
import { QueryContext } from '../../context';

const formatChartData = (data: SNXPriceData[], timeSeries: TimeSeries): AreaChartData[] =>
	(data as SNXPriceData[]).map(({ id, averagePrice }) => {
		return {
			created: formatIdToIsoString(id, timeSeries as TimeSeries),
			value: averagePrice,
		};
	});

const formatIdToIsoString = (id: string, timeSeries: TimeSeries) => {
	let multiple = 0;
	if (timeSeries === '1d') {
		multiple = 86400;
	} else if (timeSeries === '15m') {
		multiple = 900;
	}
	const created = new Date(Number(id) * multiple * 1000);
	return created.toISOString();
};

const useSnxPriceChartQuery = (
	ctx: QueryContext,
	fetchPeriod: string,
	options?: UseQueryOptions<AreaChartData, Error>
) => {
	return useQuery<AreaChartData[], string>(['network', 'snxPriceChart', fetchPeriod], async () => {
		let timeSeries = '1d';
		let max = 0;
		switch (fetchPeriod) {
			case 'D':
				timeSeries = '15m';
				max = 24 * 4;
				break;
			case 'W':
				timeSeries = '15m';
				max = 24 * 4 * 7;
				break;
			case 'M':
				max = 30;
				break;
			case 'Y':
				max = 365;
				break;
			default:
		}

		const newSNXPriceData = await ctx.snxData?.snxPrices({
			timeSeries: timeSeries as TimeSeries,
			max,
		});
		if (!newSNXPriceData) return [];
		newSNXPriceData.reverse();
		return formatChartData(newSNXPriceData, timeSeries as TimeSeries);
	});
};

export default useSnxPriceChartQuery;
