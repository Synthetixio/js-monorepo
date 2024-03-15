// ExchangeRates
import {
  name as ExchangeRatesMainnet,
  address as ExchangeRatesAddressMainnet,
  abi as ExchangeRatesAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/ExchangeRates';
import {
  name as ExchangeRatesMainnetOvm,
  address as ExchangeRatesAddressMainnetOvm,
  abi as ExchangeRatesAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/ExchangeRates';

// ExchangeRates
import {
  name as CollateralManagerMainnet,
  address as CollateralManagerAddressMainnet,
  abi as CollateralManagerAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/CollateralManager';
import {
  name as CollateralManagerMainnetOvm,
  address as CollateralManagerAddressMainnetOvm,
  abi as CollateralManagerAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/CollateralManager';

import {
  name as ShortingRewardsBTCMainnet,
  address as ShortingRewardsBTCAddressMainnet,
  abi as ShortingRewardsBTCAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/ShortingRewardssBTC';

import {
  name as ShortingRewardsETHMainnet,
  address as ShortingRewardsETHAddressMainnet,
  abi as ShortingRewardsETHAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/ShortingRewardssETH';

export const contracts = {
  ExchangeRates: {
    mainnet: {
      name: ExchangeRatesMainnet,
      address: ExchangeRatesAddressMainnet,
      abi: ExchangeRatesAbiMainnet,
    },
    'mainnet-ovm': {
      name: ExchangeRatesMainnetOvm,
      address: ExchangeRatesAddressMainnetOvm,
      abi: ExchangeRatesAbiMainnetOvm,
    },
  },
  CollateralManager: {
    mainnet: {
      name: CollateralManagerMainnet,
      address: CollateralManagerAddressMainnet,
      abi: CollateralManagerAbiMainnet,
    },
    'mainnet-ovm': {
      name: CollateralManagerMainnetOvm,
      address: CollateralManagerAddressMainnetOvm,
      abi: CollateralManagerAbiMainnetOvm,
    },
  },
  ShortingRewardsBTC: {
    mainnet: {
      name: ShortingRewardsBTCMainnet,
      address: ShortingRewardsBTCAddressMainnet,
      abi: ShortingRewardsBTCAbiMainnet,
    },
  },
  ShortingRewardsETH: {
    mainnet: {
      name: ShortingRewardsETHMainnet,
      address: ShortingRewardsETHAddressMainnet,
      abi: ShortingRewardsETHAbiMainnet,
    },
  },
};
