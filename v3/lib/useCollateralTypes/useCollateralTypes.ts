/* eslint-disable no-console */
import { BigNumber, ethers } from 'ethers';
import { erc20ABI, useProvider } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useCoreProxy, CoreProxyContractType } from '@snx-v3/useCoreProxy';

async function loadCollateralTypes({
  CoreProxyContract,
  provider,
}: {
  CoreProxyContract: CoreProxyContractType;
  provider: ReturnType<typeof useProvider>;
}) {
  // typeschain messes up the type for when an array is returned from a method
  const tokenConfigs = (await CoreProxyContract.getCollateralConfigurations(true)) as {
    depositingEnabled: boolean;
    issuanceRatioD18: BigNumber;
    liquidationRatioD18: BigNumber;
    liquidationRewardD18: BigNumber;
    oracleNodeId: string;
    tokenAddress: `0x${string}`;
    minDelegationD18: BigNumber;
  }[];
  // TODO convert to multicall
  const [symbols, prices] = await Promise.all([
    Promise.all(
      tokenConfigs.map(async ({ tokenAddress }) => {
        try {
          const TokenContract = new ethers.Contract(tokenAddress, erc20ABI, provider);
          return await TokenContract.symbol();
        } catch (e) {
          console.error(e);
          throw Error('We expect symbol to be defined');
        }
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
        return undefined;
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
    // TODO, we should look this up incase a collateral with different decimals get added
    decimals: 18,
    // TODO: map symbol to icon
    logo: 'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
  }));

  return tokens;
}

export function useCollateralTypes() {
  const provider = useProvider();
  const { data: CoreProxyContract } = useCoreProxy();
  return useQuery({
    queryKey: [provider.network.name, 'collateralTypes'],
    queryFn: async () => {
      if (!CoreProxyContract) {
        throw Error('Query should not be enabled when CoreProxyContract missing');
      }
      return loadCollateralTypes({ CoreProxyContract, provider });
    },
    placeholderData: [],
    enabled: Boolean(CoreProxyContract && provider.network.name),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export function useEthCollateralType() {
  const { data } = useCollateralTypes();
  return data?.find((collateral) => collateral.symbol === 'WETH');
}
