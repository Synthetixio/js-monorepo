import useExchangeRatesQuery from '../src/queries/rates/useExchangeRatesQuery';
import useHistoricalRatesQuery from '../src/queries/rates/useHistoricalRatesQuery';
import useHistoricalVolumeQuery from '../src/queries/rates/useHistoricalVolumeQuery';
import { getFakeQueryContext, getWrapper } from '../testUtils';

import { renderHook } from '@testing-library/react-hooks';

import { set, mapValues } from 'lodash';
import { wei } from '@synthetixio/wei';
import { ethers } from 'ethers';

describe('@synthetixio/queries rates', () => {
	const ctx = getFakeQueryContext();

	test('useExchangeRatesQuery', async () => {
		const wrapper = getWrapper();

		set(ctx.snxjs as any, 'contracts.SynthUtil.synthsRates', async () => [
			[ethers.utils.formatBytes32String('sETH'), ethers.utils.formatBytes32String('sBTC')],
			[wei(1000).toBN(), wei(10000).toBN()],
		]);
		set(ctx.snxjs as any, 'contracts.ExchangeRates.ratesForCurrencies', async () => [
			wei(10).toBN(),
		]);

		const { result, waitFor } = renderHook(() => useExchangeRatesQuery(ctx), { wrapper });
		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toEqual({
			ETH: wei(1000),
			BTC: wei(10000),
			sETH: wei(1000),
			sBTC: wei(10000),
			SNX: wei(10),
		});
	});

	test('useHistoricalRatesQuery', async () => {
		const wrapper = getWrapper();

		ctx.snxData!.rateUpdates = async () => [
			{ id: '3', block: 3, timestamp: 10025, currencyKey: 'sETH', synth: 'sETH', rate: 950 },
			{ id: '2', block: 2, timestamp: 10010, currencyKey: 'sETH', synth: 'sETH', rate: 1050 },
			{ id: '1', block: 1, timestamp: 10000, currencyKey: 'sETH', synth: 'sETH', rate: 1000 },
		];

		const { result, waitFor } = renderHook(() => useHistoricalRatesQuery(ctx, 'sETH'), { wrapper });
		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toMatchObject({
			rates: [
				{ timestamp: 10000, rate: 1000 },
				{ timestamp: 10010, rate: 1050 },
				{ timestamp: 10025, rate: 950 },
			],
			low: 950,
			high: 1050,
			change: -0.05,
		});
	});

	test('useHistoricalVolumeQuery', async () => {
		const wrapper = getWrapper();

		ctx.snxData!.synthExchanges = async () => [
			{
				id: '1',
				hash: '',
				block: 1,
				timestamp: 10000,
				account: ethers.constants.AddressZero,
				toAddress: ethers.constants.AddressZero,
				from: ethers.constants.AddressZero,
				fromCurrencyKey: 'sETH',
				fromAmount: 10,
				fromAmountInUSD: 1000,
				toCurrencyKey: 'sBTC',
				toAmount: 0.997,
				toAmountInUSD: 997,
				feesInUSD: 3,
				gasPrice: 5,
				network: 'mainnet',
			},
			{
				id: '2',
				hash: '',
				block: 2,
				timestamp: 10001,
				account: ethers.constants.AddressZero,
				toAddress: ethers.constants.AddressZero,
				from: ethers.constants.AddressZero,
				fromCurrencyKey: 'sETH',
				fromAmount: 100,
				fromAmountInUSD: 100,
				toCurrencyKey: 'sUSD',
				toAmount: 0.995,
				toAmountInUSD: 99.5,
				feesInUSD: 0.5,
				gasPrice: 10,
				network: 'mainnet',
			},
		];

		const { result, waitFor } = renderHook(() => useHistoricalVolumeQuery(ctx), { wrapper });
		await waitFor(() => result.current.isSuccess);

		expect(mapValues(result.current.data, (v) => v.toNumber())).toEqual({
			sUSD: 99.5,
			sETH: 1100,
			sBTC: 997,
		});
	});
});
