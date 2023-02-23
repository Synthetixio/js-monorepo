import { Contract, providers, utils } from 'ethers';
import ProxyAbiOPGoerli from '@synthetixio/v3-contracts/deployments/goerli/oracle_manager/Proxy.json';
import ProxyAbiGoerli from '@synthetixio/v3-contracts/deployments/optimism-goerli/oracle_manager/Proxy.json';
import { Node } from './types';
import { ORACLE_NODE_TYPES } from './constants';

function resolveNetworkIdToProxyAddress(networkId: number) {
  switch (networkId) {
    // TODO @MF when deployed, add it here
    case 5:
      return ProxyAbiGoerli.address;
    case 420:
      return ProxyAbiOPGoerli.address;
    default:
      return ProxyAbiGoerli.address;
  }
}

function resolveNetworkIdToMultiCallAddress(networkId: number) {
  switch (networkId) {
    case 1:
      return '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441';
    case 5:
      return '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e';
    case 10:
      return '0x2DC0E2aa608532Da689e89e237dF582B783E552C';
    case 420:
      // TODO @MF when deployed, add it here
      return ProxyAbiOPGoerli.address;
    default:
      return '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e';
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

export const getMultiCallContract = (
  signerOrProvider: providers.JsonRpcSigner,
  networkId: number
) => {
  return new Contract(
    resolveNetworkIdToMultiCallAddress(networkId),
    [
      {
        constant: false,
        inputs: [
          {
            components: [
              { name: 'target', type: 'address' },
              { name: 'callData', type: 'bytes' },
            ],
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'aggregate',
        outputs: [
          { name: 'blockNumber', type: 'uint256' },
          { name: 'returnData', type: 'bytes[]' },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    signerOrProvider
  );
};
