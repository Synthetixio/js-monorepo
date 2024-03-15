// SynthetixBridgeToOptimism
import {
  name as SynthetixBridgeToOptimismMainnet,
  address as SynthetixBridgeToOptimismAddressMainnet,
  abi as SynthetixBridgeToOptimismAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthetixBridgeToOptimism';

// SynthetixBridgeToBase
import {
  name as SynthetixBridgeToBaseMainnetOvm,
  address as SynthetixBridgeToBaseAddressMainnetOvm,
  abi as SynthetixBridgeToBaseAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthetixBridgeToBase';

export const contracts = {
  SynthetixBridgeToOptimism: {
    mainnet: {
      name: SynthetixBridgeToOptimismMainnet,
      address: SynthetixBridgeToOptimismAddressMainnet,
      abi: SynthetixBridgeToOptimismAbiMainnet,
    },
  },
  SynthetixBridgeToBase: {
    'mainnet-ovm': {
      name: SynthetixBridgeToBaseMainnetOvm,
      address: SynthetixBridgeToBaseAddressMainnetOvm,
      abi: SynthetixBridgeToBaseAbiMainnetOvm,
    },
  },
};
