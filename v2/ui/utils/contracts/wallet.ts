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

export const contracts = {
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
