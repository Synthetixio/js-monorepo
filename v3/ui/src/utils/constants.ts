import { chain, chainId as chainMapping } from 'wagmi';
import { ChainName } from './types';

const hardhatMulticallConfig = {
  address: '0x2017758D5341a319410f8DdD0a034d0170EE0444',
  blockCreated: 10228837,
};

export const chains = {
  goerli: chain.goerli,
  hardhat: { ...chain.hardhat, ...hardhatMulticallConfig },
};

export const supportedChains = Object.keys(chains).map((chain) => chains[chain as ChainName]);

export const getChainById = (chainId: number) =>
  supportedChains.find((chain) => chain.id === chainId);

export const getChainNameById = (chainId: number) => {
  const chain = Object.entries(chainMapping).find((entry) => entry[1] === chainId);

  return chain ? chain[0] : '';
};

// TODO: Retrieve from on chain data
export const localCollateralTypes = (chainId: number) => {
  const chainName = getChainNameById(chainId);
  /*
  Consider injecting token list data here instead of useCollateralTypes.ts

  if (snxContract?.chainId !== LOCALHOST_CHAIN_ID) {
    // Convert addresses to the data from the token list
    const tokensForLocalChain = tokenList.tokens.filter(
      (token) => token.chainId === snxContract?.chainId
    );
    console.log(tokensForLocalChain);
    const enrichedCollateralTypes = data
      .map((collateralType) =>
        tokensForLocalChain.find(
          (token) => token.address === collateralType.address
        )
      )
      .filter(function (element) {
        return element !== undefined;
      }) as Array<CollateralType>;
    setSupportedCollateralTypes(enrichedCollateralTypes);
  }
  */
  return [
    {
      address: require(`../../ts-deployments/${chainName}/snx.token.ts`).address,
      symbol: 'SNX',
      logoURI:
        'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
      decimals: 18,
    },
    {
      address: require(`../../ts-deployments/${chainName}/lusd.token.ts`).address,
      symbol: 'LUSD',
      logoURI:
        'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png',
      decimals: 18,
    },
    {
      address: require(`../../ts-deployments/${chainName}/WETH.ts`).address,
      symbol: 'ETH',
      logoURI:
        'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
      decimals: 18,
    },
  ];
};

export const contracts = {
  SYNTHETIX_PROXY: 'synthetix.Proxy',
  ACCOUNT: 'synthetix.Account',
  ACCOUNT_MODULE: 'synthetix.AccountModule',
  MULTICALL: 'Multicall',
};

export const fundsData: Record<string, { name: string }> = {
  1: {
    name: 'Spartan Council',
  },
  0: {
    name: 'None',
  },
};
