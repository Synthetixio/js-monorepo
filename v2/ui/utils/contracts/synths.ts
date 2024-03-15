// Exchanger
import {
  name as ExchangerMainnet,
  address as ExchangerAddressMainnet,
  abi as ExchangerAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/Exchanger';
import {
  name as ExchangerMainnetOvm,
  address as ExchangerAddressMainnetOvm,
  abi as ExchangerAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/Exchanger';

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

// SystemStatus
import {
  name as SystemStatusMainnet,
  address as SystemStatusAddressMainnet,
  abi as SystemStatusAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SystemStatus';
import {
  name as SystemStatusMainnetOvm,
  address as SystemStatusAddressMainnetOvm,
  abi as SystemStatusAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SystemStatus';

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

// Synth Redeemer
import {
  name as RedeemerMainnet,
  address as RedeemerAddressMainnet,
  abi as RedeemerAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthRedeemer';
import {
  name as RedeemerMainnetOvm,
  address as RedeemerAddressMainnetOvm,
  abi as RedeemerAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthRedeemer';

// Ether wrapper
import {
  name as EtherWrapperMainnet,
  address as EtherWrapperAddressMainnet,
  abi as EtherWrapperAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/EtherWrapper';
import {
  name as EtherWrapperMainnetOvm,
  address as EtherWrapperAddressMainnetOvm,
  abi as EtherWrapperAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/EtherWrapper';

// Collateral Manager State
import {
  name as CollateralManagerStateMainnet,
  address as CollateralManagerStateAddressMainnet,
  abi as CollateralManagerStateAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/CollateralManagerState';
import {
  name as CollateralManagerStateMainnetOvm,
  address as CollateralManagerStateAddressMainnetOvm,
  abi as CollateralManagerStateAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/CollateralManagerState';

export const contracts = {
  Exchanger: {
    mainnet: {
      name: ExchangerMainnet,
      address: ExchangerAddressMainnet,
      abi: ExchangerAbiMainnet,
    },
    'mainnet-ovm': {
      name: ExchangerMainnetOvm,
      address: ExchangerAddressMainnetOvm,
      abi: ExchangerAbiMainnetOvm,
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
  SynthUtil: {
    mainnet: {
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
  },
  SynthRedeemer: {
    mainnet: {
      name: RedeemerMainnet,
      address: RedeemerAddressMainnet,
      abi: RedeemerAbiMainnet,
    },
    'mainnet-ovm': {
      name: RedeemerMainnetOvm,
      address: RedeemerAddressMainnetOvm,
      abi: RedeemerAbiMainnetOvm,
    },
  },
  EtherWrapper: {
    mainnet: {
      name: EtherWrapperMainnet,
      address: EtherWrapperAddressMainnet,
      abi: EtherWrapperAbiMainnet,
    },
    'mainnet-ovm': {
      name: EtherWrapperMainnetOvm,
      address: EtherWrapperAddressMainnetOvm,
      abi: EtherWrapperAbiMainnetOvm,
    },
  },
  SystemStatus: {
    mainnet: {
      name: SystemStatusMainnet,
      address: SystemStatusAddressMainnet,
      abi: SystemStatusAbiMainnet,
    },
    'mainnet-ovm': {
      name: SystemStatusMainnetOvm,
      address: SystemStatusAddressMainnetOvm,
      abi: SystemStatusAbiMainnetOvm,
    },
  },
  CollateralManagerState: {
    mainnet: {
      name: CollateralManagerStateMainnet,
      address: CollateralManagerStateAddressMainnet,
      abi: CollateralManagerStateAbiMainnet,
    },
    'mainnet-ovm': {
      name: CollateralManagerStateMainnetOvm,
      address: CollateralManagerStateAddressMainnetOvm,
      abi: CollateralManagerStateAbiMainnetOvm,
    },
  },
};
