import { DebtSnapshot } from '../../generated/graphql';
import { formatTimestamp, formatEther } from '../../src/utils';

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
	collateral: formatEther(collateral),
	debtBalanceOf: formatEther(debtBalanceOf),
	balanceOf: formatEther(balanceOf),
});
