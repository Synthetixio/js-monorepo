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

// SynthUtil
import {
  name as SynthUtilMainnet,
  address as SynthUtilAddressMainnet,
  abi as SynthUtilAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthUtil';
import {
  name as SynthUtilMainnetOvm,
  address as SynthUtilAddressMainnetOvm,
  abi as SynthUtilAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthUtil';

// Synths
import { contracts as SynthsCurrencies } from './synthsCurrencies';

export const contracts = {
  ...SynthsCurrencies,
  ExchangeRates: {
    mainnet: {
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
  },
  SynthUtil: {
    mainnet: {
      name: SynthUtilMainnet,
      address: SynthUtilAddressMainnet,
      abi: SynthUtilAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthUtilMainnetOvm,
      address: SynthUtilAddressMainnetOvm,
      abi: SynthUtilAbiMainnetOvm,
    },
  },
};
