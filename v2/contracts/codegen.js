const path = require('path');
const fs = require('fs/promises');
const ethers = require('ethers');
const prettier = require('prettier');

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
    const prettyJSON = prettier.format(JSON.stringify(contract.jsonAbi), {
      parser: 'json',
      ...prettierOptions,
    });
    await fs.writeFile(`src/${network}/deployment/json/${contract.name}.json`, prettyJSON, 'utf8');
    await fs.writeFile(`src/${network}/deployment/${contract.name}.ts`, pretty, 'utf8');
  }
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
      feed?: string
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
  const prettierOptions = JSON.parse(await fs.readFile('../../.prettierrc', 'utf8'));

  for await (const network of networks) {
    const contracts = prepareContracts(network);
    await fs.mkdir(`src/${network}/types`, { recursive: true });
    await fs.mkdir(`src/${network}/deployment`, { recursive: true });
    await fs.mkdir(`src/${network}/deployment/json`, { recursive: true });
    await generateContracts({ network, contracts, prettierOptions });
    await fs.rm(`src/${network}/types`, { recursive: true, force: true });
    await generateSynths({ network, prettierOptions });
  }
}

run();
