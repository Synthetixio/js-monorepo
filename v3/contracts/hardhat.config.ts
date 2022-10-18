import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import { config as dotenvConfig } from 'dotenv';
import 'hardhat-cannon';
import 'hardhat-gas-reporter';
import 'hardhat-interact';
import { HardhatUserConfig } from 'hardhat/config';
import { resolve } from 'path';

// todo: below module seems to be legacy broken
//import "solidity-coverage";

dotenvConfig({ path: resolve(__dirname, './.env') });

// These are unused, uncomment if we plan to use
// const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
// const infuraIpfsId: string | undefined = process.env.INFURA_IPFS_ID;
// const infuraIpfsSecret: string | undefined = process.env.INFURA_IPFS_SECRET;

const config: HardhatUserConfig = {
  defaultNetwork: 'cannon',
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    local: {
      url: 'http://localhost:8545',
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      chainId: 4,
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    goerli: {
      chainId: 5,
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    'optimism-goerli': {
      chainId: 420,
      url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  solidity: {
    version: '0.8.13',
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: 'none',
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
  },
};

export default config;
