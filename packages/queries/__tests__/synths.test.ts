import { wei } from '@synthetixio/wei';
import { renderHook } from '@testing-library/react-hooks';
import { set } from 'lodash';
import { ethers } from 'ethers';
import useSynthsTotalSupplyQuery from '../src/queries/synths/useSynthsTotalSupplyQuery';
import { getFakeQueryContext, getWrapper } from '../testUtils';

describe('@synthetixio/queries synths', () => {
	const ctx = getFakeQueryContext();

	test('useSynthsTotalSupplyQuery', async () => {
		const wrapper = getWrapper();

		const fakeBTCValue = wei(10000);
		const fakeETHValue = wei(1000);

		set(ctx.snxjs as any, 'contracts.SynthUtil.synthsTotalSupplies', async () => [
			[
				ethers.utils.formatBytes32String('sETH'),
				ethers.utils.formatBytes32String('sBTC'),
				ethers.utils.formatBytes32String('iETH'),
				ethers.utils.formatBytes32String('iBTC'),
			],
			[wei(100).toBN(), wei(200).toBN(), wei(0).toBN(), wei(0).toBN()],
			[
				wei(100).mul(fakeETHValue).toBN(),
				wei(200).mul(fakeBTCValue).toBN(),
				wei(0).toBN(),
				wei(0).toBN(),
			],
		]);
		set(ctx.snxjs as any, 'contracts.CollateralManager.short', async () => wei(10).toBN());
		set(ctx.snxjs as any, 'contracts.ExchangeRates.ratesForCurrencies', async () => [
			fakeBTCValue.toBN(),
			fakeETHValue.toBN(),
		]);
		set(ctx.snxjs as any, 'contracts.EtherWrapper.sETHIssued', async () => wei(50).toBN());

		const { result, waitFor } = renderHook(() => useSynthsTotalSupplyQuery(ctx), { wrapper });
		await waitFor(() => result.current.isSuccess);

		const totalValue = wei(2160000);

		expect(result.current.data).toEqual({
			totalValue,
			supplyData: {
				iBTC: {
					name: 'iBTC',
					totalSupply: wei(0),
					value: wei(10).mul(fakeBTCValue),
					poolProportion: wei(10).mul(fakeBTCValue).div(totalValue),
				},
				sBTC: {
					name: 'sBTC',
					totalSupply: wei(200),
					value: wei(200).mul(fakeBTCValue),
					poolProportion: wei(200).mul(fakeBTCValue).div(totalValue),
				},
				iETH: {
					name: 'iETH',
					totalSupply: wei(0),
					value: wei(10).mul(fakeETHValue),
					poolProportion: wei(10).mul(fakeETHValue).div(totalValue),
				},
				sETH: {
					name: 'sETH',
					totalSupply: wei(50),
					value: wei(50).mul(fakeETHValue),
					poolProportion: wei(50).mul(fakeETHValue).div(totalValue),
				},
			},
		});
	});
});
