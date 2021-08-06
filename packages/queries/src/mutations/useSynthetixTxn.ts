import { ethers } from 'ethers';
import { UseMutationOptions } from 'react-query';

import { QueryContext } from '../context';
import useContractTxn from './useContractTxn';
import useEVMTxn from './useEVMTxn';

const useSynthetixTxn = (
	ctx: QueryContext,
    contract: string,
    method: string,
    args: any[] = [],
	options: UseMutationOptions<void> = {}
) => {
    if(ctx.snxjs == null) {
        return useContractTxn(
            ctx,
            ctx.snxjs!.contracts[contract],
            method,
            args,
            options);
    }

    return useEVMTxn(ctx, {}, options);
};

export default useSynthetixTxn;
