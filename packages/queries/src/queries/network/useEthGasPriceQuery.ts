import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import { GasPrices } from '../../types';

const ETH_GAS_STATION_API_URL = 'https://ethgasstation.info/json/ethgasAPI.json';
const GAS_NOW_API_URL = 'https://www.gasnow.org/api/v3/gas/price?utm_source=kwenta';

type EthGasStationResponse = {
	average: number;
	avgWait: number;
	blockNum: number;
	block_time: number;
	fast: number;
	fastWait: number;
	fastest: number;
	fastestWait: number;
	gasPriceRange: Record<number, number>;
	safeLow: number;
	safeLowWait: number;
	speed: number;
};

type GasNowResponse = {
	code: number;
	data: {
		rapid: number;
		fast: number;
		standard: number;
		slow: number;
		timestamp: number;
	};
};

const useEthGasPriceQuery = (ctx: QueryContext, options?: UseQueryOptions<GasPrices>) => {
	return useQuery<GasPrices>(
		['network', 'gasPrice', ctx.networkId],
		async () => {
			try {
				const result = await axios.get<GasNowResponse>(GAS_NOW_API_URL);
				const { standard, fast, rapid: fastest } = result.data.data;

				return {
					fastest: Math.round(fastest / 1e8 / 10),
					fast: Math.round(fast / 1e8 / 10),
					average: Math.round(standard / 1e8 / 10),
				};
			} catch (e) {
				const result = await axios.get<EthGasStationResponse>(ETH_GAS_STATION_API_URL);
				const { average, fast, fastest } = result.data;

				return {
					fastest: Math.round(fastest / 10),
					fast: Math.round(fast / 10),
					average: Math.round(average / 10),
				};
			}
		},
		{
			enabled: !!ctx.networkId,
			...options,
		}
	);
};

export default useEthGasPriceQuery;
