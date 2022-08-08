import { BigNumber } from '@ethersproject/bignumber';
import { TransactionRequest } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

import { QueryContext } from '../context';
import useEVMTxn, { UseEVMTxnOptions } from './useEVMTxn';

const useContractTxn = (
  ctx: QueryContext,
  contract: Contract | null,
  method: string | null,
  args: any[] = [],
  txnOptions: Partial<TransactionRequest> = {},
  options?: UseEVMTxnOptions
) => {
  const hasSigner = Boolean(ctx.signer);
  if (hasSigner && contract != null && method != null && (!options || options.enabled)) {
    return useEVMTxn(
      ctx,
      {
        to: contract.address,
        data: contract.interface.encodeFunctionData(method, args),
        value: txnOptions.value || BigNumber.from(0),
        ...txnOptions,
      },
      options
    );
  }

  return useEVMTxn(ctx, null, options);
};

export default useContractTxn;
