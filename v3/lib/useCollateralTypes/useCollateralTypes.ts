import { ethers } from 'ethers';
import { useProvider } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import * as Erc20 from '@synthetixio/v3-contracts/build/_ERC20';
import { CoreProxy as CoreProxyGoerli } from '@synthetixio/v3-contracts/build/goerli/CoreProxy';
import type { CoreProxy as CoreProxyOptimismGoerli } from '@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy';

async function importCoreProxy(chainName) {
  switch (chainName) {
    case 'goerli':
      return import('@synthetixio/v3-contracts/build/goerli/CoreProxy');
    case 'optimism-goerli':
      return import('@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

async function loadCollateralTypes({ provider }) {
  const CoreProxy = await importCoreProxy(provider.network.name);
  const CoreProxyContract = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider) as
    | CoreProxyGoerli
    | CoreProxyOptimismGoerli;

  const tokenConfigs = await CoreProxyContract.getCollateralConfigurations(true);

  const [symbols, prices] = await Promise.all([
    Promise.all(
      tokenConfigs.map(async ({ tokenAddress }) => {
        try {
          const TokenContract = new ethers.Contract(
            tokenAddress,
            Erc20.abi,
            provider
          ) as Erc20._ERC20;
          return await TokenContract.symbol();
        } catch (e) {
          console.error(e);
        }
        return null;
      })
    ),
    Promise.all(
      tokenConfigs.map(async ({ tokenAddress }) => {
        try {
          return await CoreProxyContract.getCollateralPrice(tokenAddress);
        } catch (e) {
          console.error(e);
        }
        // Never fail, price can be null
        return null;
      })
    ),
  ]);

  const tokens = tokenConfigs.map((config, i) => ({
    depositingEnabled: config.depositingEnabled,
    issuanceRatioD18: config.issuanceRatioD18,
    liquidationRatioD18: config.liquidationRatioD18,
    liquidationRewardD18: config.liquidationRewardD18,
    minDelegationD18: config.minDelegationD18,
    oracleNodeId: config.oracleNodeId,
    tokenAddress: config.tokenAddress,
    price: prices[i],
    symbol: symbols[i],
    // Looks like we have 18 everywhere and decimals is no longer dynamic value
    decimals: 18,
    // TODO: map symbol to icon
    logo: 'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
  }));

  return tokens;
}

export function useCollateralTypes() {
  const provider = useProvider();
  return useQuery({
    queryKey: [provider.network.name, 'collateralTypes'],
    queryFn: async () => loadCollateralTypes({ provider }),
    placeholderData: [],
    enabled: Boolean(provider.network.name),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useEthCollateralType() {
  const { data } = useCollateralTypes();
  return data.find((collateral) => collateral.symbol === 'WETH');
}
