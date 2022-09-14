const path = require('path');
const fs = require('fs/promises');
const ethers = require('ethers');
const prettier = require('prettier');
const { runTypeChain } = require('typechain');

function prepareContracts(network) {
  const deployment = require(`synthetix/publish/deployed/${network}/deployment.json`);
  const { targets, sources } = deployment;

  return Object.values(targets).map((target) => {
    if (target.name === 'Synthetix') {
      target.address = targets.ProxySynthetix.address;
    } else if (target.name === 'FeePool') {
      target.address = targets.ProxyFeePool.address;
    } else if (target.name.match(/Synth(s|i)[a-zA-Z]+$/)) {
      const newTarget = target.name.replace('Synth', 'Proxy');
      target.address = targets[newTarget].address;
    }
    const iface = new ethers.utils.Interface(sources[target.source].abi);
    target.jsonAbi = sources[target.source].abi;
    target.abi = iface.format(ethers.utils.FormatTypes.full);
    return target;
  });
}

async function generateContracts({ network, contracts, prettierOptions }) {
  await fs
    .cp(`src/${network}/types/common.ts`, `src/${network}/deployment/common.ts`)
    .catch(() => null);
  for await (const contract of contracts) {
    const types = await fs
      .readFile(`src/${network}/types/${contract.name}.ts`, 'utf8')
      .catch(() => ''); // for empty abi or skipped types for any other reason
    const content =
      '// !!! DO NOT EDIT !!! Automatically generated file\n\n' +
      Object.entries(contract)
        .filter(([name]) => ['name', 'source', 'address', 'abi'].includes(name))
        .map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`)
        .concat([types])
        .join('\n');
    const pretty = prettier.format(content, { parser: 'typescript', ...prettierOptions });
    await fs.writeFile(`src/${network}/deployment/${contract.name}.ts`, pretty, 'utf8');
  }
}

async function generateTypes({ network, contracts, prettierOptions }) {
  const files = [];
  for await (const contract of contracts) {
    if (!Array.isArray(contract.jsonAbi) || contract.jsonAbi.length < 1) {
      continue;
    }
    const json = path.resolve(`src/${network}/types/${contract.name}.json`);
    await fs.writeFile(json, JSON.stringify(contract.jsonAbi));
    files.push(json);
  }
  //
  if (files.length > 0) {
    // This will create a ts file with types named <targetName>.ts (ie. Synthetix.ts)
    await runTypeChain({
      cwd: process.cwd(),
      filesToProcess: files,
      allFiles: files,
      prettier: prettierOptions,
      outDir: `src/${network}/types`,
      target: require.resolve('@typechain/ethers-v5'),
    });
  }

  // We only care about the types so let's remove the factories
  //  await fs.rm(`src/${network}/types/factories`, { recursive: true, force: true });
  //  await fs.rm(`src/${network}/types/index.ts`, { recursive: true, force: true });
  //  for await (const file of files) {
  //    const basename = path.basename(file, '.json');
  //    // Looks like typechain misses prettyfying a few files, so we need to clean up after them
  //    const content = await fs.readFile(`src/${network}/types/${basename}.ts`, 'utf8');
  //    const pretty = prettier.format(content, { parser: 'typescript', ...prettierOptions });
  //    if (pretty !== content) {
  //      await fs.writeFile(`src/${network}/types/${basename}.ts`, pretty, 'utf8');
  //    }
  //    await fs.rm(file, { force: true });
  //  }
}

async function generateSynths({ network, prettierOptions }) {
  const synths = JSON.parse(
    await fs.readFile(require.resolve(`synthetix/publish/deployed/${network}/synths.json`), 'utf8')
  );
  const assets = JSON.parse(
    await fs.readFile(require.resolve('synthetix/publish/assets.json'), 'utf8')
  );
  const synthsWithAssetData = synths.map((synth) => Object.assign({}, assets[synth.asset], synth));
  const synthsByName = synthsWithAssetData.reduce((acc, val) => {
    acc[val.name] = val;
    return acc;
  }, {});
  /**
   * If we're not adding a type assertion to the SynthsByName
   * the ts inference will generate a giant weird looking union type that is hard to work with.
   *  */
  const synthByNameType = `Partial<
  Record<
    string,
    {
      asset: string;
      category: string;
      sign: string;
      description: string;
      name: string;
      subclass?: string;
    }
  >
>`;
  await fs.writeFile(
    `src/${network}/synths.ts`,
    prettier.format(
      '// !!! DO NOT EDIT !!! Automatically generated file\n\n' +
        `export const SynthsByName : ${synthByNameType} = ${JSON.stringify(synthsByName, null, 2)}`,
      {
        parser: 'typescript',
        ...prettierOptions,
      }
    ),
    'utf8'
  );
}

async function run() {
  const synthetixPath = path.dirname(require.resolve('synthetix'));
  const deployed = path.join(synthetixPath, 'publish/deployed');
  const networks = (await fs.readdir(deployed, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const prettierOptions = JSON.parse(await fs.readFile('../.prettierrc', 'utf8'));

  for await (const network of networks) {
    const contracts = prepareContracts(network);
    await fs.mkdir(`src/${network}/types`, { recursive: true });
    await generateTypes({ network, contracts, prettierOptions });
    await fs.mkdir(`src/${network}/deployment`, { recursive: true });
    await generateContracts({ network, contracts, prettierOptions });
    await fs.rm(`src/${network}/types`, { recursive: true, force: true });
    await generateSynths({ network, prettierOptions });
  }
}

run();
