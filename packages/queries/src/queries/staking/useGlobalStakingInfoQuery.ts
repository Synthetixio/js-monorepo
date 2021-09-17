import { useQuery, UseQueryOptions } from 'react-query';
import { ethers } from 'ethers';
import Wei, { wei } from '@synthetixio/wei';

import { QueryContext } from '../../context';
import { GlobalStakingInfo } from '../../types';
import { GQL_RESPONSE_LIMIT } from '../../constants';

const useGlobalStakingInfoQuery = (
	ctx: QueryContext,
	options?: UseQueryOptions<GlobalStakingInfo>
) => {
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
				ctx.snxjs!.contracts.ExchangeRates.rateForCurrency(ethers.utils.formatBytes32String('SNX')),
				ctx.snxjs!.contracts.Synthetix.totalSupply(),
				ctx.snxjs!.contracts.SynthetixState.lastDebtLedgerEntry(),
				ctx.snxjs!.contracts.Synthetix[
					ctx.snxjs!.contracts.Synthetix.totalIssuedSynthsExcludeOtherCollateral
						? 'totalIssuedSynthsExcludeOtherCollateral'
						: 'totalIssuedSynths'
				](ethers.utils.formatBytes32String('sUSD')),
				ctx.snxjs!.contracts.SystemSettings.issuanceRatio(),
				ctx.snxData!.snxHolders({ max: GQL_RESPONSE_LIMIT - 1 }),
			]);

			const lastDebtLedgerEntry = wei(unformattedLastDebtLedgerEntry, 27);

			const [totalIssuedSynths, issuanceRatio, usdToSnxPrice] = [
				unformattedTotalIssuedSynths,
				unformattedIssuanceRatio,
				unformattedSnxPrice,
			].map((val) => wei(val));

			let snxTotal = wei(0);
			let snxLocked = wei(0);
			let stakersTotalDebt = wei(0);
			let stakersTotalCollateral = wei(0);

			for (const {
				collateral: unformattedCollateral,
				debtEntryAtIndex: unformattedDebtEntryAtIndex,
				initialDebtOwnership: unformattedInitialDebtOwnership,
			} of holders || []) {
				const [collateral, debtEntryAtIndex, initialDebtOwnership] = [
					unformattedCollateral,
					unformattedDebtEntryAtIndex,
					unformattedInitialDebtOwnership,
				].map((val) => wei(val));

				const debtBalance = debtEntryAtIndex.gt(0)
					? totalIssuedSynths
							.mul(lastDebtLedgerEntry)
							.div(debtEntryAtIndex)
							.mul(initialDebtOwnership)
					: wei(0);
				const collateralRatio = debtEntryAtIndex.gt(0)
					? debtBalance.div(collateral).div(usdToSnxPrice)
					: wei(0);

				const lockedSnx = collateral.mul(Wei.min(wei(1), collateralRatio.div(issuanceRatio)));

				snxTotal = snxTotal.add(collateral);
				snxLocked = snxLocked.add(lockedSnx);
				stakersTotalDebt = stakersTotalDebt.add(debtBalance);
				stakersTotalCollateral = stakersTotalCollateral.add(collateral.mul(usdToSnxPrice));
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
				snxStaked:
					usdToSnxPrice && totalIssuedSynths && issuanceRatio
						? totalIssuedSynths.div(issuanceRatio).div(usdToSnxPrice)
						: wei(0),
				snxPercentLocked: snxTotal ? snxLocked.div(snxTotal) : wei(0),
				activeCRatio: stakersTotalDebt ? stakersTotalCollateral.div(stakersTotalDebt) : wei(0),
				lastDebtLedgerEntry,
			};
		},
		{
			enabled: ctx.snxData != null && ctx.snxjs != null,
			...options,
		}
	);
};

export default useGlobalStakingInfoQuery;
