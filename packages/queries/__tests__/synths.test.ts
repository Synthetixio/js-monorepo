import { wei } from '@synthetixio/wei';
import { renderHook } from '@testing-library/react-hooks';
import { set } from 'lodash';
import { ethers } from 'ethers';
import { NetworkId, Synths } from '@synthetixio/contracts-interface';
import useSynthsTotalSupplyQuery from '../src/queries/synths/useSynthsTotalSupplyQuery';
import useRedeemableDeprecatedSynthsQuery from '../src/queries/synths/useRedeemableDeprecatedSynthsQuery';
import { getFakeQueryContext, getWrapper } from '../testUtils';
import * as utils from '../src/utils';

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

		const { result, waitFor } = renderHook(() => useSynthsTotalSupplyQuery(ctx), { wrapper });
		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toEqual({
			totalValue: wei(2100000),
			totalStakersDebt: wei(1830000),
			supplyData: {
				sETH: {
					name: 'sETH',
					totalSupply: wei(100),
					value: wei(100000),
					skewValue: wei(30000),
					poolProportion: wei('0.016393442622950819'),
				},
				sBTC: {
					name: 'sBTC',
					totalSupply: wei(200),
					value: wei(2000000),
					skewValue: wei(1800000),
					poolProportion: wei('0.983606557377049180'),
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
			priceData: {
				ethPrice: wei(1000),
				btcPrice: wei(10000),
			},
			shortData: {
				ethNegativeEntries: wei(70),
				btcNegativeEntries: wei(20),
				usdNegativeEntries: wei(0),
			},
			synthTotalSupplies: [
				[
					'0x7345544800000000000000000000000000000000000000000000000000000000',
					'0x7342544300000000000000000000000000000000000000000000000000000000',
					'0x6945544800000000000000000000000000000000000000000000000000000000',
					'0x6942544300000000000000000000000000000000000000000000000000000000',
				],
				[
					ethers.BigNumber.from('100000000000000000000'),
					ethers.BigNumber.from('200000000000000000000'),
					ethers.BigNumber.from('0'),
					ethers.BigNumber.from('0'),
				],
				[
					ethers.BigNumber.from('100000000000000000000000'),
					ethers.BigNumber.from('2000000000000000000000000'),
					ethers.BigNumber.from('0'),
					ethers.BigNumber.from('0'),
				],
			],
		});
	});

	test('useSynthsTotalSupplyQuery on ovm', async () => {
		const ctx = getFakeQueryContext(NetworkId['Mainnet-Ovm']);
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

		const { result, waitFor } = renderHook(() => useSynthsTotalSupplyQuery(ctx), { wrapper });
		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toEqual({
			totalValue: wei(2100000),
			totalStakersDebt: wei(2100000),
			supplyData: {
				sETH: {
					name: 'sETH',
					totalSupply: wei(100),
					value: wei(100000),
					skewValue: wei(100000),
					poolProportion: wei('0.047619047619047619'),
				},
				sBTC: {
					name: 'sBTC',
					totalSupply: wei(200),
					value: wei(2000000),
					skewValue: wei(2000000),
					poolProportion: wei('0.95238095238095238'),
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
			priceData: {
				ethPrice: wei(1000),
				btcPrice: wei(10000),
			},
			shortData: {
				ethNegativeEntries: wei(0),
				btcNegativeEntries: wei(0),
				usdNegativeEntries: wei(0),
			},
			synthTotalSupplies: [
				[
					'0x7345544800000000000000000000000000000000000000000000000000000000',
					'0x7342544300000000000000000000000000000000000000000000000000000000',
					'0x6945544800000000000000000000000000000000000000000000000000000000',
					'0x6942544300000000000000000000000000000000000000000000000000000000',
				],
				[
					ethers.BigNumber.from('100000000000000000000'),
					ethers.BigNumber.from('200000000000000000000'),
					ethers.BigNumber.from('0'),
					ethers.BigNumber.from('0'),
				],
				[
					ethers.BigNumber.from('100000000000000000000000'),
					ethers.BigNumber.from('2000000000000000000000000'),
					ethers.BigNumber.from('0'),
					ethers.BigNumber.from('0'),
				],
			],
		});
	});

	test('useRedeemableDeprecatedSynthsQuery', async () => {
		const wrapper = getWrapper();

		set(ctx.snxjs as any, 'contracts.SynthRedeemer.filters.SynthDeprecated', async () => ({}));
		set(ctx.snxjs as any, 'contracts.SynthRedeemer.queryFilter', async () => [
			{ args: { synth: '0x0' } },
			{ args: { synth: '0x1' } },
		]);
		set(
			utils,
			'getProxySynthSymbol',
			async (provider: ethers.providers.Provider, address: string) =>
				address === '0x0' ? Synths.iAAVE.toString() : Synths.sGOOG.toString()
		);
		set(ctx.snxjs as any, 'contracts.SynthRedeemer.balanceOf', async (address: string) =>
			wei(address === '0x0' ? '20' : '15')
		);

		const { result, waitFor } = renderHook(() => useRedeemableDeprecatedSynthsQuery(ctx, '0x'), {
			wrapper,
		});
		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toEqual({
			balances: [
				{
					currencyKey: Synths.iAAVE,
					proxyAddress: '0x0',
					balance: wei(0),
					usdBalance: wei(20),
				},
				{
					currencyKey: Synths.sGOOG,
					proxyAddress: '0x1',
					balance: wei(0),
					usdBalance: wei(15),
				},
			],
			totalUSDBalance: wei(35),
		});
	});
});
