const path = require('path');
const fs = require('fs');
const ethers = require('ethers');
const prettier = require('prettier');
const { runTypeChain, glob } = require('typechain');
const { execSync } = require('child_process');

const prettierOptions = JSON.parse(fs.readFileSync('../.prettierrc', 'utf8'));

const synthetixPath = path.dirname(require.resolve('synthetix'));

const deployed = path.join(synthetixPath, 'publish/deployed');
const networks = fs
  .readdirSync(deployed, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

async function createTypesFromAbi(targetName, network, abi) {
  if (!abi || abi === '[]') return;

  const cwd = process.cwd();
  const JSON_ABI_PATH = path.join(cwd, `src/${network}/deployment`, targetName + 'AbiTypes.json');
  await fs.promises.writeFile(JSON_ABI_PATH, abi);
  const allFiles = glob(cwd, [JSON_ABI_PATH]);
  // This will create a ts file with types named <targetName>AbiTypes.ts (ie. SynthetixAbiTypes.ts)
  await runTypeChain({
    cwd,
    filesToProcess: allFiles,
    allFiles,
    outDir: `src/${network}/deployment`,
    target: require.resolve('@typechain/ethers-v5'),
  });

  // We only care about the types so lets remove the factories
  return Promise.all([
    fs.promises.rm(`src/${network}/deployment/factories`, { recursive: true, force: true }),
    // Same thing here, only care about the types
    fs.promises.rm(`src/${network}/deployment/index.ts`, { force: true }),
    // No need to keep the abi, it arleady exists in the string format in the main ts file
    fs.promises.rm(JSON_ABI_PATH),
  ]);
}

async function generateTargets(network) {
  const deployment = require(`synthetix/publish/deployed/${network}/deployment.json`);
  fs.mkdirSync(`src/${network}/deployment/targets`, { recursive: true });
  const { targets, sources } = deployment;

  if (!targets || !sources) {
    return;
  }

  console.log('run target');

  await Promise.all(
    Object.values(targets).map(async (target) => {
      if (target.name === 'Synthetix') {
        target.address = targets.ProxySynthetix.address;
      } else if (target.name === 'FeePool') {
        target.address = targets.ProxyFeePool.address;
      } else if (target.name.match(/Synth(s|i)[a-zA-Z]+$/)) {
        const newTarget = target.name.replace('Synth', 'Proxy');
        target.address = targets[newTarget].address;
      }
      const iface = new ethers.utils.Interface(sources[target.source].abi);
      target.abi = iface.format(ethers.utils.FormatTypes.full);

      const typesPromise = createTypesFromAbi(
        target.name,
        network,
        iface.format(ethers.utils.FormatTypes.json)
      );

      const contractPromise = fs.promises.writeFile(
        `src/${network}/deployment/${target.name}.ts`,

        '// !!! DO NOT EDIT !!! Automatically generated file\n\n' +
          Object.entries(target)
            .filter(([name]) => ['name', 'source', 'address', 'abi'].includes(name))
            .map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`)
            .join('\n'),
        'utf8'
      );
      return Promise.all([typesPromise, contractPromise]);
    })
  );
  execSync(`yarn prettier src/${network}/deployment/*.ts --write`);
}

function generateSynths(network) {
  const synths = require(`synthetix/publish/deployed/${network}/synths.json`);
  const assets = require('synthetix/publish/assets.json');
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
  fs.mkdirSync(`src/${network}`, { recursive: true });
  fs.writeFileSync(
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

networks.forEach(async (network) => {
  generateSynths(network);
  await generateTargets(network);
});
