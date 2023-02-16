import {
  address,
  abi,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketSettings';
import { Contract, providers } from 'ethers';

const L2BatchProvider = new providers.JsonRpcBatchProvider(
  'https://optimism-mainnet.infura.io/v3/23087ce9f88c44d1b1c54fd7c07c65fb'
);

export const perpsV2Contract = new Contract(address, abi, L2BatchProvider);
