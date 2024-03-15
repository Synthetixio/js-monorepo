// CollateralEth
import {
  name as CollateralEthMainnet,
  address as CollateralEthAddressMainnet,
  abi as CollateralEthAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/CollateralEth';
import {
  name as CollateralEthMainnetOvm,
  address as CollateralEthAddressMainnetOvm,
  abi as CollateralEthAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/CollateralEth';

// CollateralManager
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

// CollateralStateEth
import {
  name as CollateralStateEthMainnet,
  address as CollateralStateEthAddressMainnet,
  abi as CollateralStateEthAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/CollateralStateEth';

export const contracts = {
  CollateralEth: {
    mainnet: {
      name: CollateralEthMainnet,
      address: CollateralEthAddressMainnet,
      abi: CollateralEthAbiMainnet,
    },
    'mainnet-ovm': {
      name: CollateralEthMainnetOvm,
      address: CollateralEthAddressMainnetOvm,
      abi: CollateralEthAbiMainnetOvm,
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
  CollateralStateEth: {
    mainnet: {
      name: CollateralStateEthMainnet,
      address: CollateralStateEthAddressMainnet,
      abi: CollateralStateEthAbiMainnet,
    },
  },
};
