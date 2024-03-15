// Liquidator
import {
  name as LiquidatorMainnet,
  address as LiquidatorAddressMainnet,
  abi as LiquidatorAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/Liquidator';
import {
  name as LiquidatorMainnetOvm,
  address as LiquidatorAddressMainnetOvm,
  abi as LiquidatorAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/Liquidator';

// LiquidatorRewards
import {
  name as LiquidatorRewardsMainnet,
  address as LiquidatorRewardsAddressMainnet,
  abi as LiquidatorRewardsAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/LiquidatorRewards';
import {
  name as LiquidatorRewardsMainnetOvm,
  address as LiquidatorRewardsAddressMainnetOvm,
  abi as LiquidatorRewardsAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/LiquidatorRewards';

export const contracts = {
  Liquidator: {
    mainnet: {
      name: LiquidatorMainnet,
      address: LiquidatorAddressMainnet,
      abi: LiquidatorAbiMainnet,
    },
    'mainnet-ovm': {
      name: LiquidatorMainnetOvm,
      address: LiquidatorAddressMainnetOvm,
      abi: LiquidatorAbiMainnetOvm,
    },
  },
  LiquidatorRewards: {
    mainnet: {
      name: LiquidatorRewardsMainnet,
      address: LiquidatorRewardsAddressMainnet,
      abi: LiquidatorRewardsAbiMainnet,
    },
    'mainnet-ovm': {
      name: LiquidatorRewardsMainnetOvm,
      address: LiquidatorRewardsAddressMainnetOvm,
      abi: LiquidatorRewardsAbiMainnetOvm,
    },
  },
};
