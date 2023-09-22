import { arrayify } from '@ethersproject/bytes';
import {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiInputSeparators,
  NotifiSubscriptionCard,
} from '@notifi-network/notifi-react-card';
import './notifi.css';
import React, { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { SignerContext } from '@snx-v2/SignerContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

const isTestnet = (networkId: null | number) => {
  if (networkId === NetworkIdByName['mainnet-ovm'] || networkId === NetworkIdByName['mainnet']) {
    return false;
  }
  return true;
};
export const NotifiCard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
  const cardId = isMainnet
    ? '283fa53b4b8e4ed1a2234615bf01d240'
    : '8a569abd38974f76837960bd9bf36049';

  const inputLabels: NotifiInputFieldsText = {
    label: {},
    placeholderText: {
      email: 'Email address',
      telegram: 'Telegram ID',
    },
  };

  const inputSeparators: NotifiInputSeparators = {
    emailSeparator: {
      content: 'OR',
    },
  };

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
      <NotifiSubscriptionCard
        cardId={cardId}
        inputLabels={inputLabels}
        inputSeparators={inputSeparators}
        inputs={{ userWallet: walletAddress }}
        copy={{
          FetchedStateCard: {
            SubscriptionCardV1: {
              EditCard: {
                AlertListPreview: {
                  description: 'Get real-time alerts to the destinations of your choice',
                },
              },
            },
          },
        }}
        darkMode
        onClose={onClose}
      />
    </NotifiContext>
  );
};
