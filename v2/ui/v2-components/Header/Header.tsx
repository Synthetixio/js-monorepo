import { FC, useEffect, useState } from 'react';
import { NetworkIdByName, NetworkId } from '@synthetixio/contracts-interface';
import { Navigation } from '@snx-v2/Navigation';
import Connector from 'containers/Connector';
import { useSynthsBalances } from '@snx-v2/useSynthsBalances';

export const Header: FC = () => {
  const { isWalletConnected, walletAddress, connectWallet, switchNetwork, network } =
    Connector.useContainer();

  const [localNetwork, setLocalNetwork] = useState<NetworkId>(
    network?.id ? (network.id as NetworkId) : (NetworkIdByName.mainnet as NetworkId)
  );

  const { data, isLoading } = useSynthsBalances();
  console.log('Thing is', data, isLoading);

  useEffect(() => {
    setLocalNetwork(
      network?.id ? (network.id as NetworkId) : (NetworkIdByName.mainnet as NetworkId)
    );
  }, [network]);

  const switchMenuNetwork = async (networkId: NetworkId) => {
    if (network && networkId === network.id) return;
    if (isWalletConnected) {
      const result = await switchNetwork(networkId);
      if (!result) return;
    }

    setLocalNetwork(networkId);
  };

  return (
    <Navigation
      isWalletConnected={isWalletConnected}
      connectWallet={() => connectWallet(localNetwork)}
      currentNetwork={localNetwork}
      switchNetwork={switchMenuNetwork}
      walletAddress={walletAddress}
    />
  );
};
