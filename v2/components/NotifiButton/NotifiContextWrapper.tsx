import { arrayify } from '@ethersproject/bytes';
import { NotifiContext } from '@notifi-network/notifi-react-card';
import React, { PropsWithChildren, useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { SignerContext } from '@snx-v2/SignerContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

const isTestnet = (networkId: null | number) => {
  if (networkId === NetworkIdByName['mainnet-ovm'] || networkId === NetworkIdByName['mainnet']) {
    return false;
  }
  return true;
};

export const NotifiContextWrapper: React.FC<PropsWithChildren<{}>> = ({
  children,
}: PropsWithChildren<{}>) => {
  const { networkId, walletAddress } = useContext(ContractContext);
  const signer = useContext(SignerContext);
  if (signer === null || walletAddress === null || networkId === null) {
    // account is required
    return null;
  }
  const isL2 = networkId === NetworkIdByName['mainnet-ovm'];
  const isMainnet = !isTestnet(networkId);
  const walletBlockchain = isL2 ? 'OPTIMISM' : 'ETHEREUM';

  const env = isMainnet ? 'Production' : 'Development';

  return (
    <NotifiContext
      dappAddress="synthetix"
      env={env}
      signMessage={async (message: Uint8Array) => {
        const result = await signer.signMessage(message);
        return arrayify(result);
      }}
      walletPublicKey={walletAddress}
      walletBlockchain={walletBlockchain}
    >
      {children}
    </NotifiContext>
  );
};
