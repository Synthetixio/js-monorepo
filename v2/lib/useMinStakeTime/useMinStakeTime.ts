import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { wei } from '@synthetixio/wei';
import { useSystemSettings, useIssuer } from '@snx-v2/useSynthetixContracts';
import { ContractContext } from '@snx-v2/ContractContext';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';

export const useMinStakeTime = () => {
  const { networkId, walletAddress: connectedWalletAddress } = useContext(ContractContext);
  const { data: Issuer } = useIssuer();

  const { data: SystemSettings } = useSystemSettings();
  const { delegateWallet } = useDelegateWallet();
  const walletAddress = delegateWallet?.address || connectedWalletAddress;
  return useQuery(
    [networkId, 'minStakeTime', { walletAddress }],
    async () => {
      if (!walletAddress || !Issuer || !SystemSettings)
        throw Error('Query should not be enabled if contracts are missing');

      const [minStakeTimeBn, lastIssueEventBn] = await Promise.all([
        SystemSettings.minimumStakeTime(),
        Issuer.lastIssueEvent(walletAddress),
      ]);
      const minStakeTime = wei(minStakeTimeBn, 0);
      const lastIssueEvent = wei(lastIssueEventBn, 0);
      const dateAllowedToBurn = new Date(lastIssueEvent.add(minStakeTime).mul(1000).toNumber());

      return {
        dateAllowedToBurn: dateAllowedToBurn,
      };
    },
    {
      enabled: Boolean(networkId && walletAddress && Issuer && SystemSettings),
      staleTime: 10000,
    }
  );
};
