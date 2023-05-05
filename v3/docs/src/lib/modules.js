import metadataMainnet from '@synthetixio/v3-contracts/metadata/mainnet/metadata.json';
import metadataGoerli from '@synthetixio/v3-contracts/metadata/goerli/metadata.json';
import metadataOptimismMainnet from '@synthetixio/v3-contracts/metadata/optimism-mainnet/metadata.json';
import metadataOptimismGoerli from '@synthetixio/v3-contracts/metadata/optimism-goerli/metadata.json';

function transformDeps(deps) {
  return deps.filter((d) => d !== 'InitialModuleBundle');
}

export const modules = {
  mainnet: {
    CoreProxy: transformDeps(metadataMainnet.def.router.CoreRouter.contracts),
    AccountProxy: transformDeps(metadataMainnet.def.router.AccountRouter.contracts),
    USDProxy: transformDeps(metadataMainnet.def.router.USDRouter.contracts),
  },
  goerli: {
    CoreProxy: transformDeps(metadataGoerli.def.router.CoreRouter.contracts),
    AccountProxy: transformDeps(metadataGoerli.def.router.AccountRouter.contracts),
    USDProxy: transformDeps(metadataGoerli.def.router.USDRouter.contracts),
  },
  'optimism-mainnet': {
    CoreProxy: transformDeps(metadataOptimismMainnet.def.router.CoreRouter.contracts),
    AccountProxy: transformDeps(metadataOptimismMainnet.def.router.AccountRouter.contracts),
    USDProxy: transformDeps(metadataOptimismMainnet.def.router.USDRouter.contracts),
  },
  'optimism-goerli': {
    CoreProxy: transformDeps(metadataOptimismGoerli.def.router.CoreRouter.contracts),
    AccountProxy: transformDeps(metadataOptimismGoerli.def.router.AccountRouter.contracts),
    USDProxy: transformDeps(metadataOptimismGoerli.def.router.USDRouter.contracts),
  },
};
