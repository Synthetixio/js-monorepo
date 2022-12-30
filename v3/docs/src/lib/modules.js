import metadata from '@synthetixio/v3-contracts/deployments/metadata.json';
function transformDeps(deps) {
  return deps
    .filter((d) => d !== 'contract.InitialModuleBundle')
    .map((d) => d.replace('contract.', ''));
}
export const modules = {
  goerli: {
    CoreProxy: transformDeps(metadata.deploys[5].main.def.run.core_generate_router.depends),
    AccountProxy: transformDeps(metadata.deploys[5].main.def.run.account_generate_router.depends),
    USDProxy: transformDeps(metadata.deploys[5].main.def.run.usd_generate_router.depends),
  },
  'optimism-goerli': {
    CoreProxy: transformDeps(metadata.deploys[420].main.def.run.core_generate_router.depends),
    AccountProxy: transformDeps(metadata.deploys[420].main.def.run.account_generate_router.depends),
    USDProxy: transformDeps(metadata.deploys[420].main.def.run.usd_generate_router.depends),
  },
};
