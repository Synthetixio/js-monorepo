import { useQuery } from '@tanstack/react-query';
import { useAccount, useNetwork, useProvider } from '@snx-v3/useBlockchain';
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
  const account = useAccount();
  const provider = useProvider();
  const network = useNetwork();

  return useQuery({
    queryKey: [
      network.name,
      { accountAddress: account?.address },
      'Allowance',
      { contractAddress, spender },
    ],
    queryFn: async () => {
      if (!(contractAddress && spender && account.address)) throw new Error('OMG');
      const contract = new Contract(contractAddress, abi, provider);
      const allowance = await contract.allowance(account.address, spender);
      return AllowanceSchema.parse(allowance);
    },
    enabled: Boolean(account?.address && contractAddress && spender && provider),
  });
};
