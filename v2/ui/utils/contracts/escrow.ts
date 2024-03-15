// RewardEscrowV2
import {
  name as RewardEscrowV2Mainnet,
  address as RewardEscrowV2AddressMainnet,
  abi as RewardEscrowV2AbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/RewardEscrowV2';
import {
  name as RewardEscrowV2MainnetOvm,
  address as RewardEscrowV2AddressMainnetOvm,
  abi as RewardEscrowV2AbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/RewardEscrowV2';

// Escrow Checker
import {
  name as EscrowCheckerMainnet,
  address as EscrowCheckerAddressMainnet,
  abi as EscrowCheckerAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/EscrowChecker';
import {
  name as EscrowCheckerMainnetOvm,
  address as EscrowCheckerAddressMainnetOvm,
  abi as EscrowCheckerAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/EscrowChecker';

// Synthetix Escrow
import {
  name as SynthetixEscrowMainnet,
  address as SynthetixEscrowAddressMainnet,
  abi as SynthetixEscrowAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthetixEscrow';
import {
  name as SynthetixEscrowMainnetOvm,
  address as SynthetixEscrowAddressMainnetOvm,
  abi as SynthetixEscrowAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthetixEscrow';

export const contracts = {
  RewardEscrowV2: {
    mainnet: {
      name: RewardEscrowV2Mainnet,
      address: RewardEscrowV2AddressMainnet,
      abi: RewardEscrowV2AbiMainnet,
    },
    'mainnet-ovm': {
      name: RewardEscrowV2MainnetOvm,
      address: RewardEscrowV2AddressMainnetOvm,
      abi: RewardEscrowV2AbiMainnetOvm,
    },
  },
  EscrowChecker: {
    mainnet: {
      name: EscrowCheckerMainnet,
      address: EscrowCheckerAddressMainnet,
      abi: EscrowCheckerAbiMainnet,
    },
    'mainnet-ovm': {
      name: EscrowCheckerMainnetOvm,
      address: EscrowCheckerAddressMainnetOvm,
      abi: EscrowCheckerAbiMainnetOvm,
    },
  },
  SynthetixEscrow: {
    mainnet: {
      name: SynthetixEscrowMainnet,
      address: SynthetixEscrowAddressMainnet,
      abi: SynthetixEscrowAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthetixEscrowMainnetOvm,
      address: SynthetixEscrowAddressMainnetOvm,
      abi: SynthetixEscrowAbiMainnetOvm,
    },
  },
};
