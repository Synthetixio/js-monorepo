#!/usr/bin/env node

const path = require('path');
const fs = require('fs/promises');
const ethers = require('ethers');
const prettier = require('prettier');
const { runTypeChain } = require('typechain');

// We don't want to expose internal modules and should only interact with Proxy contracts
const CONTRACTS_WHITELIST = ['AccountProxy', 'CoreProxy', 'USDProxy', 'oracle_manager.Proxy'];

async function readContracts(deploymentsDir) {
  const files = await fs.readdir(deploymentsDir, { withFileTypes: true });
  return await Promise.all(
    files
      .filter((dirent) => dirent.isFile())
      .map((dirent) => path.basename(dirent.name, '.json'))
      .map(async (fileName) => {
        const filePath = path.join(deploymentsDir, `${fileName}.json`);
        const { address, abi, deployTxnHash } = JSON.parse(await fs.readFile(filePath, 'utf8'));
        return {
          filePath,
          fileName,
          address,
          abi,
          deployTxnHash,
        };
      })
  );
}

function prepareContract({ filePath, fileName, address, abi }) {
  const iface = new ethers.utils.Interface(abi);
  return {
    filePath,
    fileName,
    address,
    abi: iface.format(ethers.utils.FormatTypes.full),
    jsonAbi: abi,
  };
}

async function regenerateJson(jsons) {
  await Promise.all(
    jsons.map(async ({ filePath, address, abi, deployTxnHash }) => {
      abi.forEach((item) => {
        item.outputs?.forEach((output) => {
          if (!('name' in output)) {
            output.name = '';
          }
        });
      });
      await fs.writeFile(
        filePath,
        JSON.stringify({ address, abi, deployTxnHash }, null, 2),
        'utf8'
      );
    })
  );
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
        .filter(([name]) => ['address', 'abi'].includes(name))
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
    .map((dirent) => dirent.name);

  const prettierOptions = JSON.parse(await fs.readFile('../../.prettierrc', 'utf8'));

  for await (const network of networks) {
    const jsons = await readContracts(path.join(__dirname, 'deployments', network));
    await fs.mkdir(`cache/${network}/types`, { recursive: true });
    await regenerateJson(jsons);
    const contractsV3 = jsons
      .filter((json) => CONTRACTS_WHITELIST.includes(json.fileName))
      .map(prepareContract);

    const manualJsons = await readContracts(path.join(__dirname, 'manual', network));
    await fs.mkdir(`cache/${network}/types`, { recursive: true });
    const contractsCustom = manualJsons.map(prepareContract);

    const contracts = [].concat(contractsV3, contractsCustom);

    await generateTypes({ network, contracts, prettierOptions });
    await fs.mkdir(`src/${network}`, { recursive: true });
    await generateContracts({ network, contracts, prettierOptions });
    await fs.rm(`cache/${network}/types`, { recursive: true, force: true });
  }
}

run();
