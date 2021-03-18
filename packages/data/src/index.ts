import { request } from 'graphql-request';
import subHours from 'date-fns/subHours';

import { l1Endpoints, l2Endpoints } from './constants';
import { synthExchangesQuery, synthetixQuery } from '../queries';
import { formatParams } from './utils';

enum Period {
	ONE_HOUR = 'ONE_HOUR',
	FOUR_HOURS = 'FOUR_HOURS',
	ONE_DAY = 'ONE_DAY',
	ONE_WEEK = 'ONE_WEEK',
	ONE_MONTH = 'ONE_MONTH',
}

const PERIOD_IN_HOURS: Record<Period, number> = {
	ONE_HOUR: 1,
	FOUR_HOURS: 4,
	ONE_DAY: 24,
	ONE_MONTH: 672,
	ONE_WEEK: 168,
};

const calculateTimestampForPeriod = (periodInHours: number): number =>
	Math.trunc(subHours(new Date().getTime(), periodInHours).getTime() / 1000);

const synthetixData = ({ useOvm }: { useOvm: boolean }): any => ({
	synthExchanges: async ({
		maxBlock,
		max,
		fromAddress,
		minTimestamp,
	}: {
		maxBlock?: number;
		max?: number;
		fromAddress?: string;
		minTimestamp?: number;
	}) => {
		const response = await request(
			useOvm ? l2Endpoints.snx : l1Endpoints.exchanges,
			synthExchangesQuery,
			{ maxBlock, max, fromAddress, minTimestamp }
		);
		return response != null ? response.synthExchanges : null;
	},
	synthetix: async () => {
		const response = await request(useOvm ? l2Endpoints.snx : l1Endpoints.snx, synthetixQuery);
		return response != null ? response.synthetixes[0] : null;
	},
});

export { Period, PERIOD_IN_HOURS, calculateTimestampForPeriod };
export default synthetixData;
