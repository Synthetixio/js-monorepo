import { FC, useEffect, useState } from 'react';
import { NetworkIdByName, NetworkId } from '@synthetixio/contracts-interface';
import { Navigation } from '@snx-v2/Navigation';
import Connector from 'containers/Connector';

export const Header: FC = () => {
  const { isWalletConnected, connectWallet, switchNetwork, network, disconnectWallet } =
    Connector.useContainer();

  const [localNetwork, setLocalNetwork] = useState<NetworkId>(
    network?.id ? (network.id as NetworkId) : (NetworkIdByName.mainnet as NetworkId)
  );

  useEffect(() => {
    if (network?.id && localNetwork !== network.id) {
      setLocalNetwork(network?.id as NetworkId);
    }
  }, [network, localNetwork]);

  const switchMenuNetwork = async (networkId: NetworkId) => {
    if (network && networkId === network.id) return;
    if (isWalletConnected) {
      await switchNetwork(networkId);
    }

    setLocalNetwork(networkId);
  };

  return (
    <Navigation
      disconnectWallet={disconnectWallet}
      isWalletConnected={isWalletConnected}
      connectWallet={() => connectWallet(localNetwork)}
      currentNetwork={localNetwork}
      switchNetwork={switchMenuNetwork}
    />
  );
};
