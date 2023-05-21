import { Contract, providers, utils } from 'ethers';
import {
  address as OracleManagerProxyOPGoerliAddress,
  abi as OracleManagerProxyOPGoerliAbi,
} from '@synthetixio/v3-contracts/build/optimism-goerli/OracleManagerProxy';
import { address as OracleManagerProxyOPAddress } from '@synthetixio/v3-contracts/build/optimism-mainnet/OracleManagerProxy';
import { address as OracleManagerProxyMainnetAddress } from '@synthetixio/v3-contracts/build/mainnet/OracleManagerProxy';
import { address as OracleManagerProxyGoerliAddress } from '@synthetixio/v3-contracts/build/goerli/OracleManagerProxy';
import { Node } from './types';
import { ORACLE_NODE_TYPES } from './constants';

function resolveNetworkIdToProxyAddress(networkId: number) {
  switch (networkId) {
    case 1:
      return OracleManagerProxyMainnetAddress;
    case 5:
      return OracleManagerProxyGoerliAddress;
    case 10:
      return OracleManagerProxyOPAddress;
    case 420:
      return OracleManagerProxyOPGoerliAddress;
    default:
      return OracleManagerProxyMainnetAddress;
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
    OracleManagerProxyOPGoerliAbi,
    signerOrProvider
  );
};
