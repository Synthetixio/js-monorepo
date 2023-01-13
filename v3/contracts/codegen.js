#!/usr/bin/env node

const path = require('path');
const fs = require('fs/promises');
const ethers = require('ethers');
const prettier = require('prettier');
const { runTypeChain } = require('typechain');

// We don't want to expose internal modules and should only interact with Proxy contracts
const CONTRACTS_WHITELIST = ['AccountProxy', 'CoreProxy', 'USDProxy', 'oracle_manager.Proxy'];

async function prepareContracts(network) {
  const deployments = path.join(__dirname, 'deployments', network);
  const contracts = await Promise.all(
    (
      await fs.readdir(deployments, { withFileTypes: true })
    )
      .filter((dirent) => dirent.isFile())
      .map((dirent) => path.basename(dirent.name, '.json'))
      .filter(
        (item) =>
          CONTRACTS_WHITELIST.includes(item) ||
          // manually added contracts start with _
          item.startsWith('_')
      )
      .map(async (fileName) => {
        const json = JSON.parse(
          await fs.readFile(path.join(deployments, `${fileName}.json`), 'utf8')
        );
        return {
          fileName,
          ...json,
        };
      })
  );
  return contracts.map((contract) => {
    const iface = new ethers.utils.Interface(contract.abi);
    contract.name = contract.contractName;
    contract.source = contract.sourceName;
    contract.jsonAbi = contract.abi;
    contract.abi = iface.format(ethers.utils.FormatTypes.full);
    return contract;
  });
}

async function generateContracts({ network, contracts, prettierOptions }) {
  await fs.cp(`cache/${network}/types/common.ts`, `src/${network}/common.ts`).catch(() => null);
  for await (const contract of contracts) {
    const types = await fs
      .readFile(`cache/${network}/types/${contract.fileName}.ts`, 'utf8')
      .catch(() => ''); // for empty abi or skipped types for any other reason
    const content =
      '// !!! DO NOT EDIT !!! Automatically generated file\n\n' +
      Object.entries(contract)
        .filter(([name]) => ['name', 'source', 'address', 'abi'].includes(name))
        .map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`)
        .concat([types])
        .join('\n');
    const pretty = prettier.format(content, { parser: 'typescript', ...prettierOptions });
    await fs.writeFile(`src/${network}/${contract.fileName}.ts`, pretty, 'utf8');
  }
}

async function generateTypes({ network, contracts, prettierOptions }) {
  const files = [];
  for await (const contract of contracts) {
    if (!Array.isArray(contract.jsonAbi) || contract.jsonAbi.length < 1) {
      continue;
    }
    const json = path.resolve(`cache/${network}/types/${contract.fileName}.json`);
    await fs.writeFile(json, JSON.stringify(contract.jsonAbi));
    files.push(json);
  }

  if (files.length > 0) {
    // This will create a ts file with types named <targetName>.ts (ie. Synthetix.ts)
    await runTypeChain({
      cwd: process.cwd(),
      filesToProcess: files,
      allFiles: files,
      prettier: prettierOptions,
      outDir: `cache/${network}/types`,
      target: require.resolve('@typechain/ethers-v5'),
    });
  }
}

async function run() {
  const deployed = path.join(__dirname, 'deployments');
  const networks = (await fs.readdir(deployed, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .concat(['']);

  const prettierOptions = JSON.parse(await fs.readFile('../../.prettierrc', 'utf8'));

  for await (const network of networks) {
    const contracts = await prepareContracts(network);
    await fs.mkdir(`cache/${network}/types`, { recursive: true });
    await generateTypes({ network, contracts, prettierOptions });
    await fs.mkdir(`src/${network}`, { recursive: true });
    await generateContracts({ network, contracts, prettierOptions });
    await fs.rm(`cache/${network}/types`, { recursive: true, force: true });
  }
}

run();
