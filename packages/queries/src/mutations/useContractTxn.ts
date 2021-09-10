import { ethers } from 'ethers';

import { QueryContext } from '../context';
import useEVMTxn, { UseEVMTxnOptions } from './useEVMTxn';

const useContractTxn = (
	ctx: QueryContext,
	contract: ethers.Contract | null,
	method: string | null,
	args: any[] = [],
	txnOptions: Partial<ethers.providers.TransactionRequest> = {},
	options?: UseEVMTxnOptions
) => {
	if (contract != null && method != null) {
		return useEVMTxn(
			ctx,
			{
				to: contract.address,
				data: contract.interface.encodeFunctionData(method, args),
				...txnOptions,
			},
			options
		);
	}

	return useEVMTxn(ctx, null, options);
};

export default useContractTxn;
