import set from 'lodash/set';

import { wei } from '@synthetixio/wei';

import { getFakeQueryContext, getWrapper } from '../testUtils';
import { renderHook } from '@testing-library/react-hooks';

import useGlobalStakingInfoQuery from '../src/queries/staking/useGlobalStakingInfoQuery';

describe('@synthetixio/queries staking', () => {
	const ctx = getFakeQueryContext();

	// TODO: skipped because mocks don't yet exist for removal of snxData
	test.skip('useGlobalStakingInfoQuery', async () => {
		const wrapper = getWrapper();

		set(ctx.snxjs as any, 'contracts.ExchangeRates.rateForCurrency', async () => wei(10).toBN());
		set(ctx.snxjs as any, 'contracts.Synthetix.totalSupply', async () => wei(1000000).toBN());
		set(ctx.snxjs as any, 'contracts.SynthetixState.lastDebtLedgerEntry', async () =>
			wei(0.5, 27).toBN()
		);
		set(ctx.snxjs as any, 'contracts.Synthetix.totalIssuedSynthsExcludeOtherCollateral', async () =>
			wei(100000).toBN()
		);
		set(ctx.snxjs as any, 'contracts.SystemSettings.issuanceRatio', async () => wei(5).toBN());

		/*ctx.snxData!.snxHolders = async () => [
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
		];*/

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
