import { useQuery } from '@tanstack/react-query';
import { useWallet, useNetwork, useProvider } from '@snx-v3/useBlockchain';
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
  const wallet = useWallet();
  const provider = useProvider();
  const network = useNetwork();

  return useQuery({
    queryKey: [
      network.name,
      { accountAddress: wallet?.address },
      'Allowance',
      { contractAddress, spender },
    ],
    queryFn: async () => {
      if (!(contractAddress && spender && wallet?.address)) throw new Error('OMG');
      const contract = new Contract(contractAddress, abi, provider);
      const allowance = await contract.allowance(wallet.address, spender);
      return AllowanceSchema.parse(allowance);
    },
    enabled: Boolean(wallet?.address && contractAddress && spender && provider),
  });
};
