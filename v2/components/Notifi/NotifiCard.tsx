import {
  NotifiInputFieldsText,
  NotifiInputSeparators,
  NotifiSubscriptionCard,
} from '@notifi-network/notifi-react-card';
import './notifi.css';
import React, { useContext } from 'react';
import { ContractContext } from '@snx-v2/ContractContext';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';

const isTestnet = (networkId: null | number) => {
  if (networkId === NetworkIdByName['mainnet-ovm'] || networkId === NetworkIdByName['mainnet']) {
    return false;
  }
  return true;
};
export const NotifiCard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { networkId, walletAddress } = useContext(ContractContext);
  if (walletAddress === null || networkId === null) {
    // account is required
    return null;
  }
  const isL2 = networkId === NetworkIdByName['mainnet-ovm'];
  const isMainnet = !isTestnet(networkId);

  const cardId = isMainnet
    ? ( isL2 ? '283fa53b4b8e4ed1a2234615bf01d240' : '5ece3cd3ec504576b10ab396d619dc9b') 
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
  );
};
