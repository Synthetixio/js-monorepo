import { useQuery, UseQueryOptions } from 'react-query';
import chunk from 'lodash/chunk';
import orderBy from 'lodash/orderBy';
import flatten from 'lodash/flatten';
import { ethers } from 'ethers';
import { QueryContext } from '../../context';
import Wei, { wei } from '@synthetixio/wei';
import { OPTIMISM_NETWORKS } from '../../../../optimism-networks/build/node';


const VESTING_ENTRIES_PAGINATION = 50;

export type EscrowData = {
	claimableAmount: Wei;
	schedule: Schedule;
	totalEscrowed: Wei;
	totalVested: Wei;
	totalBalancePendingMigration: Wei;
	claimableEntryIds?: Wei[];
	claimableEntryIdsInChunk?: Wei[][];
};

export type Schedule = Array<
	| {
			quantity: Wei;
			date: Date;
	  }
	| []
>;

type VestingEntry = {
	escrowAmount: Wei;
	entryID: Wei;
	endTime: Wei;
};

const useEscrowDataQuery = (ctx: QueryContext, walletAddress: string, options?: UseQueryOptions<EscrowData>) => {
	return useQuery<EscrowData>(
		['escrow', 'stakingRewards', ctx.networkId, walletAddress],
		async () => {
			const {
				contracts: { RewardEscrowV2 },
			} = ctx.snxjs!;

			const [
				numVestingEntries,
				totalEscrowed,
				totalVested,
				totalBalancePendingMigration,
			] = await Promise.all([
				RewardEscrowV2.numVestingEntries(walletAddress),
				RewardEscrowV2.balanceOf(walletAddress),
				RewardEscrowV2.totalVestedAccountBalance(walletAddress),
				OPTIMISM_NETWORKS[ctx.networkId!] != null
					? ethers.BigNumber.from(0)
					: RewardEscrowV2.totalBalancePendingMigration(walletAddress),
			]);

			let vestingEntriesPromise = [];
			let vestingEntriesIdPromise = [];
			const totalVestingEntries = Number(numVestingEntries);

			for (let index = 0; index < totalVestingEntries; index += VESTING_ENTRIES_PAGINATION) {
				const pagination =
					index + VESTING_ENTRIES_PAGINATION > totalVestingEntries
						? totalVestingEntries - index
						: VESTING_ENTRIES_PAGINATION;
				vestingEntriesPromise.push(
					RewardEscrowV2.getVestingSchedules(walletAddress, index, pagination)
				);
				vestingEntriesIdPromise.push(
					RewardEscrowV2.getAccountVestingEntryIDs(walletAddress, index, pagination)
				);
			}

			const vestingEntries = flatten(await Promise.all(vestingEntriesPromise));
			const vestingEntriesId = flatten(await Promise.all(vestingEntriesIdPromise));

			let claimableAmount = 0;

			if (vestingEntriesId != null) {
				claimableAmount = await RewardEscrowV2.getVestingQuantity(walletAddress, vestingEntriesId);
			}

			let unorderedSchedule: Schedule = [];
			let claimableEntryIds: Wei[] = [];

			(vestingEntries ?? []).forEach(({ escrowAmount, entryID, endTime }: VestingEntry) => {
				const quantity = wei(escrowAmount);
				if (quantity) {
					claimableEntryIds.push(wei(entryID, 0));
					unorderedSchedule.push({
						quantity,
						date: new Date(Number(endTime) * 1000),
					});
				}
			});

			const schedule = orderBy(unorderedSchedule, 'date', 'asc');

			const claimableEntryIdsInChunk =
				claimableEntryIds && claimableEntryIds.length > 0 ? chunk(claimableEntryIds, 26) : [];

			const [
				formattedClaimableAmount,
				formattedTotalEscrowed,
				formattedTotalVested,
				formattedTotalBalanceMigration,
			] = [claimableAmount, totalEscrowed, totalVested, totalBalancePendingMigration].map((data) => wei(data));

			return {
				claimableAmount: formattedClaimableAmount,
				schedule,
				totalEscrowed: formattedTotalEscrowed,
				totalVested: formattedTotalVested,
				claimableEntryIds,
				claimableEntryIdsInChunk,
				totalBalancePendingMigration: formattedTotalBalanceMigration,
			};
		},
		{
			enabled: ctx.snxjs != null && !!walletAddress,
			...options,
		}
	);
};

export default useEscrowDataQuery;
