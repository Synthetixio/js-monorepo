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
	collateral: Number(collateral),
	debtBalanceOf: Number(debtBalanceOf),
	balanceOf: Number(balanceOf),
});
