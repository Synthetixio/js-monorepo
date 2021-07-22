import { useQuery, UseQueryOptions } from 'react-query';

import { getHolders } from './helpers';
import { QueryContext } from '../../context';
import Wei, { wei } from '@synthetixio/wei';
import { GlobalStakingInfo } from '../../types';



const useGlobalStakingInfo = (ctx: QueryContext, options?: UseQueryOptions<GlobalStakingInfo>) => {
	return useQuery<GlobalStakingInfo>(
		['staking', 'snxLockedValue', ctx.networkId],
		async () => {
			const [
				unformattedSnxPrice,
				unformattedSnxTotalSupply,
				unformattedLastDebtLedgerEntry,
				unformattedTotalIssuedSynths,
				unformattedIssuanceRatio,
				holders,
			] = await Promise.all([
				ctx.snxjs!.contracts.ExchangeRates.rateForCurrency(ctx.snxjs!.toBytes32('SNX')),
				ctx.snxjs!.contracts.Synthetix.totalSupply(),
				ctx.snxjs!.contracts.SynthetixState.lastDebtLedgerEntry(),
				ctx.snxjs!.contracts.Synthetix.totalIssuedSynthsExcludeEtherCollateral(
					ctx.snxjs!.toBytes32('sUSD')
				),
				ctx.snxjs!.contracts.SystemSettings.issuanceRatio(),
				getHolders(),
			]);

			const lastDebtLedgerEntry = wei(unformattedLastDebtLedgerEntry, 27);

			const [totalIssuedSynths, issuanceRatio, usdToSnxPrice] = [
				unformattedTotalIssuedSynths,
				unformattedIssuanceRatio,
				unformattedSnxPrice,
			].map((val) => wei(val));

			let snxTotal = wei(0);
			let snxLocked = wei(0);

			for (const {
				collateral: unformattedCollateral,
				debtEntryAtIndex,
				initialDebtOwnership,
			} of holders) {
				const collateral = wei(unformattedCollateral);

				let debtBalance = debtEntryAtIndex.gt(0) ? totalIssuedSynths.mul(lastDebtLedgerEntry).div(debtEntryAtIndex).mul(initialDebtOwnership) : wei(0);
				let collateralRatio = debtEntryAtIndex.gt(0) ? debtBalance.div(collateral).div(usdToSnxPrice) : wei(0);

				const lockedSnx = collateral.mul(Wei.min(wei(1), collateralRatio.div(issuanceRatio)));

				snxTotal.add(collateral);
				snxLocked.add(lockedSnx);
			}

			const percentLocked = snxLocked.div(snxTotal);
			const totalSupply = wei(unformattedSnxTotalSupply);

			return {
				snxPrice: usdToSnxPrice,
				totalIssuedSynths,
				issuanceRatio,
				totalSupply: snxTotal,
				lockedSupply: snxLocked,
				lockedValue: totalSupply.mul(percentLocked).mul(usdToSnxPrice),
			}
		},
		{
			enabled: ctx.snxData != null && ctx.snxjs != null,
			...options,
		}
	);
};

export default useGlobalStakingInfo;
