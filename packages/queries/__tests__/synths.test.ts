import { wei } from '@synthetixio/wei';
import { renderHook } from '@testing-library/react-hooks';
import { set } from 'lodash';
import { ethers } from 'ethers';
import { Synths } from '@synthetixio/contracts-interface';
import useSynthsTotalSupplyQuery from '../src/queries/synths/useSynthsTotalSupplyQuery';
import { getFakeQueryContext, getWrapper } from '../testUtils';

describe('@synthetixio/queries synths', () => {
	const ctx = getFakeQueryContext();

	test('useSynthsTotalSupplyQuery', async () => {
		const wrapper = getWrapper();

		const [sETHKey, sBTCKey, sUSDKey] = [Synths.sETH, Synths.sBTC, Synths.sUSD].map(
			ethers.utils.formatBytes32String
		);

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
		set(
			ctx.snxjs as any,
			'contracts.ExchangeRates.rateForCurrency',
			async (s: string) =>
				({
					[sETHKey]: fakeETHValue.toBN(),
					[sBTCKey]: fakeBTCValue.toBN(),
				}[s])
		);
		set(
			ctx.snxjs as any,
			'contracts.CollateralManagerState.totalIssuedSynths',
			async (s: string) =>
				({
					[sETHKey]: [wei(10).toBN(), wei(10).toBN()],
					[sBTCKey]: [wei(10).toBN(), wei(10).toBN()],
					[sUSDKey]: [wei(10).toBN(), wei(10).toBN()],
				}[s])
		);
		set(ctx.snxjs as any, 'contracts.EtherWrapper.sETHIssued', async () => wei(50).toBN());
		set(ctx.snxjs as any, 'contracts.EtherWrapper.sUSDIssued', async () => wei(50).toBN());
		set(ctx.snxjs as any, 'contracts.EtherCollateral.totalIssuedSynths', async () =>
			wei(50).toBN()
		);
		set(ctx.snxjs as any, 'contracts.EtherCollateralsUSD.totalIssuedSynths', async () =>
			wei(50).toBN()
		);

		const { result, waitFor } = renderHook(() => useSynthsTotalSupplyQuery(ctx), { wrapper });
		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toEqual({
			totalValue: wei(1820000),
			supplyData: {
				sETH: {
					name: 'sETH',
					totalSupply: wei(100),
					value: wei(20000),
					skewValue: wei(-20000),
					poolProportion: wei('0.010989010989010989'),
				},
				sBTC: {
					name: 'sBTC',
					totalSupply: wei(200),
					value: wei(1800000),
					skewValue: wei(1800000),
					poolProportion: wei('0.98901098901098901'),
				},
				iETH: {
					name: 'iETH',
					totalSupply: wei(0),
					value: wei(0),
					skewValue: wei(0),
					poolProportion: wei(0),
				},
				iBTC: {
					name: 'iBTC',
					totalSupply: wei(0),
					value: wei(0),
					skewValue: wei(0),
					poolProportion: wei(0),
				},
			},
		});
	});
});
