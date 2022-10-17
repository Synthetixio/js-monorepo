import hre from 'hardhat';
import { ChainBuilderContext } from '@usecannon/builder';
import { ethers } from 'ethers';

async function loadSystems(
  contracts: ChainBuilderContext['contracts'],
  provider: ethers.providers.Provider
) {
  // todo typechain
  const systems: { [name: string]: ethers.Contract } = {};

  const proxies = Object.keys(contracts);

  for (let proxyName of proxies) {
    const { address, abi } = contracts[proxyName];
    if (proxyName.endsWith('Proxy')) {
      proxyName = proxyName.slice(0, -5); // remove "Proxy" from the end
    }
    systems[proxyName] = new ethers.Contract(address, abi, provider);
  }

  return systems;
}

let provider: ethers.providers.JsonRpcProvider;

let signers: ethers.Signer[];

let systems: { [key: string]: ethers.Contract };

let baseSystemSnapshot: unknown;

before(async function () {
  // allow extra time to build the cannon deployment if required
  this.timeout(300000);

  const cmd = hre.network.name === 'cannon' ? 'build' : 'deploy';

  const cannonInfo = await hre.run(`cannon:${cmd}`);

  provider = cannonInfo.provider;
  signers = cannonInfo.signers;

  try {
    await provider.send('anvil_setBlockTimestampInterval', [1]);
  } catch (err) {
    console.warn('failed when setting block timestamp interval', err);
  }

  baseSystemSnapshot = await provider.send('evm_snapshot', []);

  systems = await loadSystems(
    {
      ...cannonInfo.outputs.contracts,
      ...cannonInfo.outputs.imports.synthetix.contracts,
      ...cannonInfo.outputs.imports.aggregator_weth.contracts,
    },
    provider
  );

  console.log('completed initial bootstrap');
});

export function bootstrap() {
  before(async () => {
    await provider.send('evm_revert', [baseSystemSnapshot]);
    baseSystemSnapshot = await provider.send('evm_snapshot', []);
  });

  return {
    provider: () => provider,
    signers: () => signers,
    owner: () => signers[0],
    systems: () => systems,
  };
}
