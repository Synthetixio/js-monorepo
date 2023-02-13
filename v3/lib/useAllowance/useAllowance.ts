import { useQuery } from '@tanstack/react-query';
import { useAccount, useProvider, useNetwork } from '@snx-v3/useBlockchain';
import { Contract } from 'ethers';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';

const AllowanceSchema = ZodBigNumber.transform((x) => wei(x));
const abi = ['function allowance(address, address) view returns (uint256)'];
export const useAllowance = ({
  contractAddress,
  spender,
}: {
  contractAddress?: string;
  spender?: string;
}) => {
  const { address: accountAddress } = useAccount();
  const provider = useProvider();
  const network = useNetwork();

  return useQuery({
    queryKey: [network.name, { accountAddress, contractAddress, spender }, 'allowance'],
    queryFn: async () => {
      if (!(contractAddress && spender)) throw new Error('OMG');
      const contract = new Contract(contractAddress, abi, provider);
      const allowance = await contract.allowance(accountAddress, spender);
      return AllowanceSchema.parse(allowance);
    },
    enabled: Boolean(accountAddress && contractAddress && spender && provider),
  });
};
