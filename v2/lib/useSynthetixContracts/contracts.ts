export const contracts = {
  ExchangeRates: {
    mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/ExchangeRates'),
    'mainnet-ovm': () =>
      import('@synthetixio/contracts/build/mainnet-ovm/deployment/ExchangeRates'),
    goerli: () => import('@synthetixio/contracts/build/goerli/deployment/ExchangeRates'),
    'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/ExchangeRates'),
  },
  Synthetix: {
    mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/Synthetix'),
    'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/Synthetix'),
    goerli: () => import('@synthetixio/contracts/build/goerli/deployment/Synthetix'),
    'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/Synthetix'),
  },
  SystemSettings: {
    mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/SystemSettings'),
    'mainnet-ovm': () =>
      import('@synthetixio/contracts/build/mainnet-ovm/deployment/SystemSettings'),
    goerli: () => import('@synthetixio/contracts/build/goerli/deployment/SystemSettings'),
    'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/SystemSettings'),
  },
  Liquidator: {
    mainnet: () => import('@synthetixio/contracts/build/mainnet/deployment/Liquidator'),
    'mainnet-ovm': () => import('@synthetixio/contracts/build/mainnet-ovm/deployment/Liquidator'),
    goerli: () => import('@synthetixio/contracts/build/goerli/deployment/Liquidator'),
    'goerli-ovm': () => import('@synthetixio/contracts/build/goerli-ovm/deployment/Liquidator'),
  },
};
