import {
  address,
  abi,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketSettings';
import { Contract, providers } from 'ethers';

const L2BatchProvider = new providers.JsonRpcBatchProvider(
  `https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`
);

export const perpsV2Contract = new Contract(address, abi, L2BatchProvider);
