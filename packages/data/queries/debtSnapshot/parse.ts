import { ethers } from 'ethers';
import { DebtSnapshot } from '../../generated/graphql';
import { formatTimestamp } from '../../src/utils';

export const parseDebtSnapshot = ({
	account,
	block,
	id,
	timestamp,
	collateral,
	balanceOf,
	debtBalanceOf,
}: DebtSnapshot): DebtSnapshot => ({
	account,
	block: Number(block),
	id,
	timestamp: formatTimestamp(timestamp),
	collateral: ethers.utils.formatEther(collateral),
	debtBalanceOf: ethers.utils.formatEther(debtBalanceOf),
	balanceOf: ethers.utils.formatEther(balanceOf),
});
