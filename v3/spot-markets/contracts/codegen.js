#!/usr/bin/env node

const path = require('path');
const fs = require('fs/promises');
const ethers = require('ethers');
const prettier = require('prettier');
const { runTypeChain } = require('typechain');

/*
async function normaliseAbi(source, fileName) {
  const json = await fs.readFile(path.join(source, `${fileName}.json`), 'utf8');
  json.abi.forEach((item) => {
    item.outputs?.forEach((output) => {
      if (!('name' in output)) {
        output.name = '';
      }
    });
  });
  await fs.writeFile(path.join(source, `${fileName}.json`), JSON.stringify(json, null, 2), 'utf8');
}
*/

function mapFileName(source, fileName) {
  if (source.includes('oracle_manager')) {
    if (fileName === 'Proxy') {
      return 'OracleManagerProxy';
    }
  }
  return fileName;
}

async function readContracts({ source, target }) {
  const files = await fs.readdir(source, { withFileTypes: true });
  return await Promise.all(
    files
      .filter((dirent) => dirent.isFile())
      .map((dirent) => path.basename(dirent.name, '.json'))
      .map(async (sourceFileName) => {
        const { address, abi, deployTxnHash } = JSON.parse(
          await fs.readFile(path.join(source, `${sourceFileName}.json`), 'utf8')
        );
        const fileName = mapFileName(source, sourceFileName);
        // Looks like outputs[].name exists by default, so no longer necessary
        // await normaliseAbi(source, fileName);
        return {
          filePath: path.join(target, `${fileName}.json`),
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

  const prettierOptions = JSON.parse(await fs.readFile('../../../.prettierrc', 'utf8'));

  for await (const network of networks) {
    await fs.rm(path.join(__dirname, 'cache', network), { recursive: true, force: true });
    await fs.rm(path.join(__dirname, 'build', network), { recursive: true, force: true });
    await fs.rm(path.join(__dirname, 'src', network), { recursive: true, force: true });

    await fs.mkdir(path.join(__dirname, 'tmp', network), { recursive: true });
    const v3Jsons = (
      await readContracts({
        source: path.join(__dirname, 'deployments', network),
        target: path.join(__dirname, 'tmp', network),
      })
    ).filter((json) =>
      [
        // Exported contracts only
        'SpotMarketProxy',
        'SynthTokenModule',
      ].includes(json.fileName)
    );

    const jsons = [...v3Jsons];
    const contracts = jsons.map(prepareContract);

    await fs.mkdir(`cache/${network}/types`, { recursive: true });
    await generateTypes({ network, contracts, prettierOptions });

    await fs.mkdir(`src/${network}`, { recursive: true });
    await generateContracts({ network, contracts, prettierOptions });
  }
}

run();
