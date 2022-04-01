import { useQuery, UseQueryOptions } from 'react-query';
import { ethers } from 'ethers';
import Wei, { wei } from '@synthetixio/wei';

import { QueryContext } from '../../context';
import { GlobalStakingInfo } from '../../types';
import { useGetSNXHolders } from '../../../generated/mainSubgraphQueries';

/**
 * @deprecated Use useLockedSnxQuery instead
 */
const useGlobalStakingInfoQuery = (
	ctx: QueryContext,
	options?: UseQueryOptions<GlobalStakingInfo>
) => {
	const snxHoldersQuery = useGetSNXHolders(
		ctx.subgraphEndpoints.subgraph,
		{
			first: 1000,
			orderBy: 'collateral',
			orderDirection: 'desc',
		},
		{
			initialDebtOwnership: true,
			collateral: true,
			debtEntryAtIndex: true,
		}
	);

	return useQuery<GlobalStakingInfo>(
		['staking', 'snxLockedValue', ctx.networkId],
		async () => {
			const [
				unformattedSnxPrice,
				unformattedSnxTotalSupply,
				unformattedLastDebtLedgerEntry,
				unformattedTotalIssuedSynths,
				unformattedIssuanceRatio,
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
			} of snxHoldersQuery.data || []) {
				const [collateral, debtEntryAtIndex, initialDebtOwnership] = [
					unformattedCollateral,
					unformattedDebtEntryAtIndex,
					unformattedInitialDebtOwnership,
				].map((val) => (!val ? wei(0) : wei(val)));

				const debtBalance = debtEntryAtIndex.gt(0)
					? totalIssuedSynths
							.mul(lastDebtLedgerEntry)
							.div(debtEntryAtIndex)
							.mul(initialDebtOwnership)
					: wei(0);
				const collateralRatio =
					collateral.gt(0) && usdToSnxPrice.gt(0)
						? debtBalance.div(collateral).div(usdToSnxPrice)
						: wei(0);

				const lockedSnx = collateral.mul(Wei.min(wei(1), collateralRatio.div(issuanceRatio)));

				snxTotal = snxTotal.add(collateral);
				snxLocked = snxLocked.add(lockedSnx);
				stakersTotalDebt = stakersTotalDebt.add(debtBalance);
				stakersTotalCollateral = stakersTotalCollateral.add(collateral.mul(usdToSnxPrice));
			}

			const percentLocked = snxTotal.gt(0) ? snxLocked.div(snxTotal) : wei(0);
			const totalSupply = wei(unformattedSnxTotalSupply);

			return {
				snxPrice: usdToSnxPrice,
				totalIssuedSynths,
				issuanceRatio,
				totalSupply: snxTotal,
				lockedSupply: snxLocked,
				lockedValue: totalSupply.mul(percentLocked).mul(usdToSnxPrice),
				snxStaked:
					usdToSnxPrice.gt(0) && totalIssuedSynths.gt(0) && issuanceRatio.gt(0)
						? totalIssuedSynths.div(issuanceRatio).div(usdToSnxPrice)
						: wei(0),
				snxPercentLocked: snxTotal.gt(0) ? snxLocked.div(snxTotal) : wei(0),
				activeCRatio: stakersTotalDebt.gt(0)
					? stakersTotalCollateral.div(stakersTotalDebt)
					: wei(0),
				lastDebtLedgerEntry,
			};
		},
		{
			enabled: ctx.snxjs != null,
			...options,
		}
	);
};

export default useGlobalStakingInfoQuery;
