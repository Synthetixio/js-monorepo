import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import { config as dotenvConfig } from 'dotenv';
import 'hardhat-cannon';
import 'hardhat-gas-reporter';
import 'hardhat-interact';
import { HardhatUserConfig } from 'hardhat/config';
import { NetworkUserConfig } from 'hardhat/types';
import { resolve } from 'path';

// todo: below module seems to be legacy broken
//import "solidity-coverage";

dotenvConfig({ path: resolve(__dirname, './.env') });

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
const infuraIpfsId: string | undefined = process.env.INFURA_IPFS_ID;
const infuraIpfsSecret: string | undefined = process.env.INFURA_IPFS_SECRET;

const chainIds = {
	'arbitrum-mainnet': 42161,
	avalanche: 43114,
	bsc: 56,
	hardhat: 31337,
	mainnet: 1,
	'optimism-mainnet': 10,
	'polygon-mainnet': 137,
	'polygon-mumbai': 80001,
	rinkeby: 4,
	goerli: 5,
};

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
	let jsonRpcUrl: string;
	switch (chain) {
		case 'avalanche':
			jsonRpcUrl = 'https://api.avax.network/ext/bc/C/rpc';
			break;
		case 'bsc':
			jsonRpcUrl = 'https://bsc-dataseed1.binance.org';
			break;
		default:
			jsonRpcUrl = 'https://' + chain + '.infura.io/v3/' + infuraApiKey;
	}
	return {
		chainId: chainIds[chain],
		url: process.env.PROVIDER_URL || jsonRpcUrl,
		accounts: [process.env.PRIVATE_KEY || ''],
	};
}

const config: HardhatUserConfig = {
	defaultNetwork: 'hardhat',
	gasReporter: {
		currency: 'USD',
		enabled: process.env.REPORT_GAS ? true : false,
		excludeContracts: [],
		src: './contracts',
	},
	networks: {
		hardhat: {
			chainId: chainIds.hardhat,
		},
		arbitrum: getChainConfig('arbitrum-mainnet'),
		avalanche: getChainConfig('avalanche'),
		bsc: getChainConfig('bsc'),
		mainnet: getChainConfig('mainnet'),
		optimism: getChainConfig('optimism-mainnet'),
		'polygon-mainnet': getChainConfig('polygon-mainnet'),
		'polygon-mumbai': getChainConfig('polygon-mumbai'),
		rinkeby: getChainConfig('rinkeby'),
		goerli: getChainConfig('goerli'),
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
	cannon: {
		registryEndpoint: 'https://rinkeby.infura.io/v3/' + infuraApiKey,
		registryAddress: '0x79E25D87432920FC5C187e14676FA6a8A8a00418',
		ipfsConnection: {
			protocol: 'https',
			host: 'ipfs.infura.io',
			port: 5001,
			headers: {
				authorization: `Basic ${Buffer.from(infuraIpfsId + ':' + infuraIpfsSecret).toString(
					'base64'
				)}`,
			},
		},
	},
};

export default config;
