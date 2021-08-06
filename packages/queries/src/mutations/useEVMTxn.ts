import { UseMutationOptions, useMutation } from 'react-query';

import Wei, { wei } from '@synthetixio/wei/build/node/wei';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { QueryContext } from '../context';

function hexToASCII(hex: string): string {
	// https://gist.github.com/gluk64/fdea559472d957f1138ed93bcbc6f78a#file-reason-js
	// return ethers.utils.toUtf8String(S.split(' ')[1].toString());
	let str = '';
	for (let n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}

const useEVMTxn = (
	ctx: QueryContext,
	txn: ethers.providers.TransactionRequest|null,
	options: UseMutationOptions<void> = {}
) => {
    const [gasLimit, setGasLimit] = useState<Wei|null>(null);
    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    async function estimateGas() {
        if (txn != null && ctx.signer != null) {
            return ctx.signer!.estimateGas(txn!);
        }

        return null;
    }

    function handleError(err: any) {
        const errorMessage = err.data ? hexToASCII(err.data.substr(147).toString()) : err.message;
        setErrorMessage(errorMessage);
    }

    useEffect(() => {
        estimateGas().then((gl) => {
            if (gl)
                setGasLimit(wei(gl));
        })
        .catch((err) => {
            handleError(err);
        });
    }, [txn]);

    return {
        gasLimit,
        ...useMutation(async () => {
            try {
                if (!txn!.gasLimit) {
                    // add a gas limit with a 10% buffer
                    txn!.gasLimit = (await estimateGas())?.mul(11).div(10);
                }
    
                await ctx.signer!.sendTransaction(txn!);
            } catch(err) {
                handleError(err);
                throw err;
            }
        }, options)
    };
};

export default useEVMTxn;
