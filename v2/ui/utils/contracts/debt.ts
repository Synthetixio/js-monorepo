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

// DebtMigratorOnEthereum
import {
  name as DebtMigratorOnEthereumMainnet,
  address as DebtMigratorAddressOnEthereumMainnet,
  abi as DebtMigratorAbiOnEthereumMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/DebtMigratorOnEthereum';

// DebtMigratorOnOptimism
import {
  name as DebtMigratorOnOptimismMainnetOvm,
  address as DebtMigratorAddressOnOptimismMainnetOvm,
  abi as DebtMigratorAbiOnOptimismMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/DebtMigratorOnOptimism';

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
  DebtMigrator: {
    mainnet: {
      name: DebtMigratorOnEthereumMainnet,
      address: DebtMigratorAddressOnEthereumMainnet,
      abi: DebtMigratorAbiOnEthereumMainnet,
    },
    'mainnet-ovm': {
      name: DebtMigratorOnOptimismMainnetOvm,
      address: DebtMigratorAddressOnOptimismMainnetOvm,
      abi: DebtMigratorAbiOnOptimismMainnetOvm,
    },
  },
};
