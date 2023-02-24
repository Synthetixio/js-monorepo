import {
  address,
  abi,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketSettings';
import { Contract, providers } from 'ethers';

export const perpsV2Contract = (provider: providers.InfuraProvider) =>
  new Contract(address, abi, provider);
