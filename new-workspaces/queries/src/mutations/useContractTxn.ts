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
	const hasSigner = Boolean(ctx.signer);
	if (hasSigner && contract != null && method != null && (!options || options.enabled)) {
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
