import { TransactionRequest } from '@ethersproject/providers';
import { QueryContext } from '../context';
import useContractTxn from './useContractTxn';
import useEVMTxn, { UseEVMTxnOptions } from './useEVMTxn';

const useSynthetixTxn = (
  ctx: QueryContext,
  contract: string,
  method: string,
  args: any[] = [],
  txnOptions: Partial<TransactionRequest> = {},
  options?: UseEVMTxnOptions
) => {
  if (ctx.snxjs !== null) {
    return useContractTxn(ctx, ctx.snxjs.contracts[contract], method, args, txnOptions, options);
  }

  return useEVMTxn(ctx, {}, options);
};

export default useSynthetixTxn;
