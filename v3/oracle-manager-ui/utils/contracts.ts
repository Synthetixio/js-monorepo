import { Contract, providers, utils } from 'ethers';
import ProxyAbiOPGorli from '@synthetixio/v3-contracts/deployments/optimism-goerli/oracle_manager/Proxy.json';
import ProxyAbiOP from '@synthetixio/v3-contracts/deployments/optimism-mainnet/oracle_manager/Proxy.json';
import ProxyAbiMainnet from '@synthetixio/v3-contracts/deployments/mainnet/oracle_manager/Proxy.json';
import ProxyAbiGoerli from '@synthetixio/v3-contracts/deployments/goerli/oracle_manager/Proxy.json';
import { Node } from './types';
import { ORACLE_NODE_TYPES } from './constants';

function resolveNetworkIdToProxyAddress(networkId: number) {
  switch (networkId) {
    case 1:
      return ProxyAbiMainnet.address;
    case 5:
      return ProxyAbiGoerli.address;
    case 10:
      return ProxyAbiOP.address;
    case 420:
      return ProxyAbiOPGorli.address;
    default:
      return ProxyAbiMainnet.address;
  }
}

export function encodeBytesByNodeType(id: number, parameters: any[]) {
  switch (id) {
    case 1:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    case 2:
      return utils.defaultAbiCoder.encode(['address'], parameters);
    case 3:
      return utils.defaultAbiCoder.encode(['address', 'uint', 'uint8'], parameters);
    case 4:
      return utils.defaultAbiCoder.encode(
        ['address', 'address', 'uint', 'uint', 'address', 'uint'],
        parameters
      );
    case 5:
      return utils.defaultAbiCoder.encode(['address', 'bytes32', 'bool'], parameters);
    case 6:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    case 7:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    default:
      return '';
  }
}

export function decodeBytesByNodeType(id: number, parameters: any[]) {
  switch (id) {
    case 1:
      return utils.defaultAbiCoder.decode(['uint'], parameters).map((operation) => {
        const option = ORACLE_NODE_TYPES[4].parameters[0].options!.find(
          (option) => option.value === Number(operation.toString())
        );
        if (option) return option.value;
        return operation;
      });
    case 2:
      return utils.defaultAbiCoder.decode(['address'], parameters);
    case 3:
      return utils.defaultAbiCoder
        .decode(['address', 'uint', 'uint8'], parameters)
        .map((param, index) => {
          if (index === 1) {
            return Number(param.toString());
          }
          return param;
        });
    case 4:
      return utils.defaultAbiCoder.decode(['address', 'address', 'address', 'uint'], parameters);
    case 5:
      return utils.defaultAbiCoder.decode(['address', 'bytes32', 'bool'], parameters);
    case 6:
      return utils.defaultAbiCoder.decode(['uint'], parameters);
    case 7:
      return utils.defaultAbiCoder.decode(['uint'], parameters);
    default:
      return '';
  }
}

export function nodeInformationByNodeIds(id: number) {
  switch (id) {
    case 1:
      return { label: 'Reducer', slug: 'reducer' };
    case 2:
      return { label: 'External Node', slug: 'externalNode' };
    case 3:
      return { label: 'ChainLink', slug: 'chainLink' };
    case 4:
      return { label: 'Uniswap', slug: 'uniswap' };
    case 5:
      return { label: 'Pyth', slug: 'pyth' };
    case 6:
      return { label: 'Price Deviation Circuit Breaker', slug: 'priceDeviationCircuitBreaker' };
    case 7:
      return { label: 'Staleness Circuit Breaker', slug: 'stalenessCircuitBreaker' };
    default:
      return { label: '', slug: '' };
  }
}

export function hashId(node: Node, parents: string[]) {
  return utils.keccak256(
    utils.defaultAbiCoder.encode(
      ['uint256', 'bytes', 'bytes32[]'],
      [node.typeId, encodeBytesByNodeType(node.typeId, node.parameters), parents]
    )
  );
}

export const getNodeModuleContract = (
  signerOrProvider: providers.JsonRpcSigner,
  networkId: number
) => {
  return new Contract(
    resolveNetworkIdToProxyAddress(networkId),
    ProxyAbiGoerli.abi,
    signerOrProvider
  );
};

export const getMultiCallContract = (signerOrProvider: providers.JsonRpcSigner) => {
  return new Contract(
    '0xcA11bde05977b3631167028862bE2a173976CA11',
    [
      {
        inputs: [
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Call[]',
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'aggregate',
        outputs: [
          { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
          { internalType: 'bytes[]', name: 'returnData', type: 'bytes[]' },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bool', name: 'allowFailure', type: 'bool' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Call3[]',
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'aggregate3',
        outputs: [
          {
            components: [
              { internalType: 'bool', name: 'success', type: 'bool' },
              { internalType: 'bytes', name: 'returnData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Result[]',
            name: 'returnData',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bool', name: 'allowFailure', type: 'bool' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Call3Value[]',
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'aggregate3Value',
        outputs: [
          {
            components: [
              { internalType: 'bool', name: 'success', type: 'bool' },
              { internalType: 'bytes', name: 'returnData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Result[]',
            name: 'returnData',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Call[]',
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'blockAndAggregate',
        outputs: [
          { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
          { internalType: 'bytes32', name: 'blockHash', type: 'bytes32' },
          {
            components: [
              { internalType: 'bool', name: 'success', type: 'bool' },
              { internalType: 'bytes', name: 'returnData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Result[]',
            name: 'returnData',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBasefee',
        outputs: [{ internalType: 'uint256', name: 'basefee', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' }],
        name: 'getBlockHash',
        outputs: [{ internalType: 'bytes32', name: 'blockHash', type: 'bytes32' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBlockNumber',
        outputs: [{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getChainId',
        outputs: [{ internalType: 'uint256', name: 'chainid', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getCurrentBlockCoinbase',
        outputs: [{ internalType: 'address', name: 'coinbase', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getCurrentBlockDifficulty',
        outputs: [{ internalType: 'uint256', name: 'difficulty', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getCurrentBlockGasLimit',
        outputs: [{ internalType: 'uint256', name: 'gaslimit', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getCurrentBlockTimestamp',
        outputs: [{ internalType: 'uint256', name: 'timestamp', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
        name: 'getEthBalance',
        outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getLastBlockHash',
        outputs: [{ internalType: 'bytes32', name: 'blockHash', type: 'bytes32' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Call[]',
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'tryAggregate',
        outputs: [
          {
            components: [
              { internalType: 'bool', name: 'success', type: 'bool' },
              { internalType: 'bytes', name: 'returnData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Result[]',
            name: 'returnData',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Call[]',
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'tryBlockAndAggregate',
        outputs: [
          { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
          { internalType: 'bytes32', name: 'blockHash', type: 'bytes32' },
          {
            components: [
              { internalType: 'bool', name: 'success', type: 'bool' },
              { internalType: 'bytes', name: 'returnData', type: 'bytes' },
            ],
            internalType: 'struct Multicall3.Result[]',
            name: 'returnData',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    signerOrProvider
  );
};
