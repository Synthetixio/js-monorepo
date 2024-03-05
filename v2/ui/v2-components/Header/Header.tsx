import { FC, useEffect, useState } from 'react';
import { NetworkIdByName, NetworkId } from '@synthetixio/contracts-interface';
import { Navigation } from '@snx-v2/Navigation';
import Connector from 'containers/Connector';

export const Header: FC = () => {
  const {
    isWalletConnected,
    connectWallet,
    switchNetwork,
    network,
    disconnectWallet,
    walletConnectedToUnsupportedNetwork,
  } = Connector.useContainer();

  const [localNetwork, setLocalNetwork] = useState<NetworkId>(
    network?.id ? (network.id as NetworkId) : (NetworkIdByName.mainnet as NetworkId)
  );

  useEffect(() => {
    setLocalNetwork(
      network?.id ? (network.id as NetworkId) : (NetworkIdByName.mainnet as NetworkId)
    );
  }, [network]);

  const switchMenuNetwork = async (networkId: NetworkId) => {
    if (network && networkId === network.id) return;
    if (isWalletConnected || (!isWalletConnected && walletConnectedToUnsupportedNetwork)) {
      const result = await switchNetwork(networkId);
      if (!result) return;
    }

    setLocalNetwork(networkId);
  };

  return (
    <Navigation
      disconnectWallet={disconnectWallet}
      isWalletConnected={isWalletConnected}
      connectWallet={() => connectWallet()}
      currentNetwork={localNetwork}
      switchNetwork={switchMenuNetwork}
    />
  );
};
