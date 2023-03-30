import { Contract, providers, utils } from 'ethers';
import ProxyAbiOPGorli from '@synthetixio/v3-contracts/deployments/optimism-goerli/oracle_manager/Proxy.json';
import ProxyAbiOP from '@synthetixio/v3-contracts/deployments/optimism-mainnet/oracle_manager/Proxy.json';
import ProxyAbiMainnet from '@synthetixio/v3-contracts/deployments/mainnet/oracle_manager/Proxy.json';
import ProxyAbiGoerli from '@synthetixio/v3-contracts/deployments/goerli/oracle_manager/Proxy.json';
import {
  address as multicallAddressMainnet,
  abi as multicallAbiMainnet,
} from '@synthetixio/v3-contracts/src/mainnet/Multicall3';
import {
  address as multicallAddressGoerli,
  abi as multicallAbiGoerli,
} from '@synthetixio/v3-contracts/src/goerli/Multicall3';
import {
  address as multicallAddressOPGoerli,
  abi as multicallAbiOPGoerli,
} from '@synthetixio/v3-contracts/src/optimism-goerli/Multicall3';
import {
  address as multicallAddressOP,
  abi as multicallAbiOP,
} from '@synthetixio/v3-contracts/src/optimism-mainnet/Multicall3';
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

export const getMultiCallContract = (
  network: number,
  signerOrProvider: providers.JsonRpcSigner
) => {
  switch (network) {
    case 1:
      return new Contract(multicallAddressMainnet, multicallAbiMainnet, signerOrProvider);
    case 5:
      return new Contract(multicallAddressGoerli, multicallAbiGoerli, signerOrProvider);
    case 10:
      return new Contract(multicallAddressOP, multicallAbiOP, signerOrProvider);
    case 420:
      return new Contract(multicallAddressOPGoerli, multicallAbiOPGoerli, signerOrProvider);
    default:
      return new Contract(multicallAddressMainnet, multicallAbiMainnet, signerOrProvider);
  }
};
