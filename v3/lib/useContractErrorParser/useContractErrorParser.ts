import { ethers } from 'ethers';
import { useCallback } from 'react';

export type ContractErrorType = {
  data: string;
  name: string;
  signature: string;
  args: Record<string, any>;
};

export function useContractErrorParser(Contract?: ethers.Contract) {
  return useCallback(
    (error: any): ContractErrorType | undefined => {
      if (!Contract) {
        return undefined;
      }
      try {
        const errorParsed = Contract.interface.parseError(error.error.data.data);
        const errorArgs = Object.fromEntries(
          Object.entries(errorParsed.args)
            .filter(([key]) => `${parseInt(key)}` !== key)
            .map(([key, value]) => {
              if (value instanceof ethers.BigNumber) {
                // Guess wei
                const unwei = parseFloat(ethers.utils.formatEther(value.toString()));
                if (unwei > 0.001) {
                  // must be wei
                  return [key, unwei];
                }

                // Guess date
                if (
                  value.toNumber() > new Date(2000, 1, 1).getTime() / 1000 &&
                  value.toNumber() < new Date(2100, 1, 1).getTime() / 1000
                ) {
                  return [key, new Date(value.toNumber() * 1000)];
                }

                // Just a number
                return [key, parseFloat(value.toString())];
              }

              // Not a number
              return [key, value];
            })
        );

        return {
          data: error.error.data.data,
          name: errorParsed.name,
          signature: errorParsed.signature,
          args: errorArgs,
        };
      } catch (e) {
        return undefined;
      }
    },
    [Contract]
  );
}
