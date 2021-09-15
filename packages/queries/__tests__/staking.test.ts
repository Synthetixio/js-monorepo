import set from 'lodash/set';

import { wei } from '@synthetixio/wei';

import { getFakeQueryContext, getWrapper } from '../testUtils';
import { renderHook } from '@testing-library/react-hooks';

import useFeeClaimHistoryQuery from '../src/queries/staking/useFeeClaimHistoryQuery';
import useGlobalStakingInfoQuery from '../src/queries/staking/useGlobalStakingInfoQuery';

describe('@synthetixio/queries staking', () => {
	const ctx = getFakeQueryContext();

	test('useFeeClaimHistoryQuery', async () => {
		const wrapper = getWrapper();

		ctx.snxData!.feesClaimed = async () => [
			{
				id: '1',
				account: '0x0000000000000000000000000000000000000000',
				value: wei(10).toBN(),
				rewards: wei(1).toBN(),
				block: 1234,
				timestamp: '1234',
			},
			{
				id: '2',
				account: '0x0000000000000000000000000000000000000000',
				value: wei(10).toBN(),
				rewards: wei(1).toBN(),
				block: 1234,
				timestamp: '2345',
			},
		];
		ctx.snxData!.burned = async () => [
			{
				id: '5',
				account: '0x0000000000000000000000000000000000000000',
				source: '0x0',
				value: wei(10).toBN(),
				gasPrice: wei(10),
				block: 1234,
				timestamp: '5678',
			},
			{
				id: '6',
				account: '0x0000000000000000000000000000000000000000',
				source: '0x0',
				value: wei(10).toBN(),
				gasPrice: wei(10),
				block: 1234,
				timestamp: '6789',
			},
		];
		ctx.snxData!.issued = async () => [
			{
				id: '4',
				account: '0x0000000000000000000000000000000000000000',
				source: '0x0',
				value: wei(10).toBN(),
				gasPrice: wei(10),
				block: 1234,
				timestamp: '4567',
			},
			{
				id: '3',
				account: '0x0000000000000000000000000000000000000000',
				source: '0x0',
				value: wei(10).toBN(),
				gasPrice: wei(10),
				block: 1234,
				timestamp: '3456',
			},
		];

		const { result, waitFor } = renderHook(
			() => useFeeClaimHistoryQuery(ctx, '0x0000000000000000000000000000000000000000'),
			{ wrapper }
		);
		await waitFor(() => result.current.isSuccess, { timeout: 3000 });

		expect(result.current.data).toMatchObject([
			{
				type: 'burned',
				timestamp: '6789',
			},
			{
				type: 'burned',
				timestamp: '5678',
			},
			{
				type: 'issued',
				timestamp: '4567',
			},
			{
				type: 'issued',
				timestamp: '3456',
			},
			{
				type: 'feesClaimed',
				timestamp: '2345',
			},
			{
				type: 'feesClaimed',
				timestamp: '1234',
			},
		]);
	});

	test('useGlobalStakingInfoQuery', async () => {
		const wrapper = getWrapper();

		set(ctx.snxjs as any, 'contracts.ExchangeRates.rateForCurrency', async () => wei(10).toBN());
		set(ctx.snxjs as any, 'contracts.Synthetix.totalSupply', async () => wei(1000000).toBN());
		set(ctx.snxjs as any, 'contracts.SynthetixState.lastDebtLedgerEntry', async () =>
			wei(0.5, 27).toBN()
		);
		set(
			ctx.snxjs as any,
			'contracts.Synthetix.totalIssuedSynthsExcludeOtherCollateralQuery',
			async () => wei(100000).toBN()
		);
		set(ctx.snxjs as any, 'contracts.SystemSettings.issuanceRatio', async () => wei(5).toBN());

		ctx.snxData!.snxHolders = async () => [
			{
				collateral: wei(100).toBN(),
				debtEntryAtIndex: wei(0.5, 27).toBN(),
				initialDebtOwnership: wei(10).toBN(),
				block: 1,
				timestamp: 1,
				id: '1',
			},
			{
				collateral: wei(150).toBN(),
				debtEntryAtIndex: wei(0.5, 27).toBN(),
				initialDebtOwnership: wei(15).toBN(),
				block: 1,
				timestamp: 1,
				id: '1',
			},
			{
				collateral: wei(300).toBN(),
				debtEntryAtIndex: wei(0.5, 27).toBN(),
				initialDebtOwnership: wei(20).toBN(),
				block: 1,
				timestamp: 1,
				id: '1',
			},
		];

		const { result, waitFor } = renderHook(() => useGlobalStakingInfoQuery(ctx), { wrapper });
		await waitFor(() => result.current.isSuccess, { timeout: 3000 });

		expect(result.current.data).toMatchObject({
			snxPrice: wei(10),
			totalIssuedSynths: wei(100000),
			issuanceRatio: wei(5),
			totalSupply: wei(550),
			lockedSupply: wei(0.0000899999999999),
			lockedValue: wei(1.63636363636),
		});
	});
});
