import { ethers } from 'ethers';
import { UseMutationOptions } from 'react-query';

import { QueryContext } from '../context';
import useEVMTxn from './useEVMTxn';

const useContractTxn = (
	ctx: QueryContext,
	contract: ethers.Contract | null,
	method: string | null,
	args: any[] = [],
	txnOptions: Partial<ethers.providers.TransactionRequest> = {},
	options: UseMutationOptions<void> = {}
) => {
	if (contract != null && method != null) {
		return useEVMTxn(ctx, {
			to: contract.address,
			data: contract.interface.encodeFunctionData(method, args),
			...txnOptions,
		});
	}

	return useEVMTxn(ctx, null, options);
};

export default useContractTxn;
