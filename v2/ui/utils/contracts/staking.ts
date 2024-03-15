// FeePool
import {
  name as FeePoolMainnet,
  address as FeePoolAddressMainnet,
  abi as FeePoolAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/FeePool';
import {
  name as FeePoolMainnetOvm,
  address as FeePoolAddressMainnetOvm,
  abi as FeePoolAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/FeePool';

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

// Synthetix
import {
  name as SynthetixMainnet,
  address as SynthetixAddressMainnet,
  abi as SynthetixAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/Synthetix';
import {
  name as SynthetixMainnetOvm,
  address as SynthetixAddressMainnetOvm,
  abi as SynthetixAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/Synthetix';

// SynthetixState
import {
  name as SynthetixStateMainnet,
  address as SynthetixStateAddressMainnet,
  abi as SynthetixStateAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthetixState';
import {
  name as SynthetixStateMainnetOvm,
  address as SynthetixStateAddressMainnetOvm,
  abi as SynthetixStateAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthetixState';

// Issuer
import {
  name as IssuerMainnet,
  address as IssuerAddressMainnet,
  abi as IssuerAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/Issuer';
import {
  name as IssuerMainnetOvm,
  address as IssuerAddressMainnetOvm,
  abi as IssuerAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/Issuer';

// SystemSettings
import {
  name as SystemSettingsMainnet,
  address as SystemSettingsAddressMainnet,
  abi as SystemSettingsAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SystemSettings';
import {
  name as SystemSettingsMainnetOvm,
  address as SystemSettingsAddressMainnetOvm,
  abi as SystemSettingsAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SystemSettings';

// StakingRewardsSNXWETHUniswapV3
import {
  name as StakingRewardsSNXWETHUniswapV3MainnetOvm,
  address as StakingRewardsSNXWETHUniswapV3AddressMainnetOvm,
  abi as StakingRewardsSNXWETHUniswapV3AbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/StakingRewardsSNXWETHUniswapV3';

export const contracts = {
  FeePool: {
    mainnet: {
      name: FeePoolMainnet,
      address: FeePoolAddressMainnet,
      abi: FeePoolAbiMainnet,
    },
    'mainnet-ovm': {
      name: FeePoolMainnetOvm,
      address: FeePoolAddressMainnetOvm,
      abi: FeePoolAbiMainnetOvm,
    },
  },
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
  Synthetix: {
    mainnet: {
      name: SynthetixMainnet,
      address: SynthetixAddressMainnet,
      abi: SynthetixAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthetixMainnetOvm,
      address: SynthetixAddressMainnetOvm,
      abi: SynthetixAbiMainnetOvm,
    },
  },
  SynthetixState: {
    mainnet: {
      name: SynthetixStateMainnet,
      address: SynthetixStateAddressMainnet,
      abi: SynthetixStateAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthetixStateMainnetOvm,
      address: SynthetixStateAddressMainnetOvm,
      abi: SynthetixStateAbiMainnetOvm,
    },
  },
  Issuer: {
    mainnet: {
      name: IssuerMainnet,
      address: IssuerAddressMainnet,
      abi: IssuerAbiMainnet,
    },
    'mainnet-ovm': {
      name: IssuerMainnetOvm,
      address: IssuerAddressMainnetOvm,
      abi: IssuerAbiMainnetOvm,
    },
  },
  SystemState: {
    mainnet: {
      name: SystemSettingsMainnet,
      address: SystemSettingsAddressMainnet,
      abi: SystemSettingsAbiMainnet,
    },
    'mainnet-ovm': {
      name: SystemSettingsMainnetOvm,
      address: SystemSettingsAddressMainnetOvm,
      abi: SystemSettingsAbiMainnetOvm,
    },
  },
  StakingRewardsSNXWETHUniswapV3: {
    'mainnet-ovm': {
      name: StakingRewardsSNXWETHUniswapV3MainnetOvm,
      address: StakingRewardsSNXWETHUniswapV3AddressMainnetOvm,
      abi: StakingRewardsSNXWETHUniswapV3AbiMainnetOvm,
    },
  },
};
