import { InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { isStaging } from './isStaging';
import {
  abi as perpsMarketDataAbiGoerli,
  address as perpsMarketDataAddressGoerli,
  PerpsV2MarketData as PerpsV2MarketDataGoerli,
} from '@synthetixio/contracts/build/goerli-ovm/deployment/PerpsV2MarketData';
import {
  abi as abiPerpsMarketData,
  address as addressPerpsMarketData,
  PerpsV2MarketData,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketData';
import {
  abi as multiCallAbi,
  address as multiCallAddressGoerli,
  Multicall3,
} from '../hooks/contracts/optimism-goerli/Multicall3';
import { address as multicallMainnetAddress } from '../hooks/contracts/optimism-mainnet/Multicall3';

export function initPerpsMarketData(provider: InfuraProvider | JsonRpcProvider | null) {
  if (!provider) throw new Error('Provider is not defined');
  return isStaging
    ? (new Contract(
        perpsMarketDataAddressGoerli,
        perpsMarketDataAbiGoerli,
        provider
      ) as PerpsV2MarketDataGoerli)
    : (new Contract(addressPerpsMarketData, abiPerpsMarketData, provider) as PerpsV2MarketData);
}

export function initMulticall(provider: InfuraProvider | JsonRpcProvider | null) {
  if (!provider) throw new Error('Provider is not defined');
  return isStaging
    ? (new Contract(multiCallAddressGoerli, multiCallAbi, provider) as Multicall3)
    : (new Contract(multicallMainnetAddress, multiCallAbi, provider) as Multicall3);
}
