/* eslint-disable no-console */
const ethers = require('ethers');

const infuraKey = process.argv[2];
if (!infuraKey) {
  throw Error('Missing infura key, should be set like this: node assert-deployment <infura key>');
}

function importCoreProxy(chainName) {
  switch (chainName) {
    case 'goerli':
      return require('@synthetixio/v3-contracts/build/goerli/CoreProxy');
    case 'optimism-goerli':
      return require('@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${chainName}`);
  }
}

const loadCoreProxy = (chainName) => {
  const { abi, address } = importCoreProxy(chainName);
  const provider = new ethers.providers.InfuraProvider(chainName, infuraKey);
  return new ethers.Contract(address, abi, provider);
};

const runOrLogError = async (fn, name) => {
  try {
    const res = await fn();
    console.log('✅ ', name);
    return res;
  } catch (error) {
    console.log(name, 'name failed');
    throw error;
  }
};
const runNetwork = async (chainName) => {
  console.log('Running tests for ', chainName);
  const CoreProxy = loadCoreProxy('goerli');
  await runOrLogError(() => CoreProxy.getPreferredPool(), 'getPreferredPool');
  await runOrLogError(() => CoreProxy.getApprovedPools(), 'getApprovedPools');
  const collaterals = await runOrLogError(
    () => CoreProxy.getCollateralConfigurations(true),
    'getCollateralConfigurations'
  );
  await Promise.all([
    runOrLogError(
      () => CoreProxy.getCollateralPrice(collaterals[0].tokenAddress),
      `CoreProxy.getCollateralPrice ${collaterals[0].tokenAddress}`
    ),
    runOrLogError(
      () => CoreProxy.getCollateralPrice(collaterals[1].tokenAddress),
      `CoreProxy.getCollateralPrice ${collaterals[1].tokenAddress}`
    ),
    ,
  ]);
};

const run = async () => {
  await runNetwork('goerli');
  await runNetwork('optimism-goerli');
};

run();
