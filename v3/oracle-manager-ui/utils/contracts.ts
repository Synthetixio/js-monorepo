import { Contract, utils } from 'ethers';
import ProxyAbi from '../deployments/Proxy.json';
import { Node } from './types';

function resolveNetworkIdToProxyAddress(networkId: number) {
  switch (networkId) {
    case 5:
      return ProxyAbi.address;
    case 420:
      return ProxyAbi.address;
    default:
      return ProxyAbi.address;
  }
}

export function encodeBytesByNodeType(id: number, parameters: any[]) {
  switch (id) {
    case 1:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    case 2:
      return utils.defaultAbiCoder.encode(['address'], parameters);
    case 3:
      return utils.defaultAbiCoder.encode(['address', 'uint'], parameters);
    case 4:
      return utils.defaultAbiCoder.encode(['address', 'address', 'address', 'uint'], parameters);
    case 5:
      return utils.defaultAbiCoder.encode(['address', 'string', 'bool'], parameters);
    case 6:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    case 7:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    default:
      return '';
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

export const getNodeModuleContract = (signerOrProvider: any, networkId: number) => {
  return new Contract(resolveNetworkIdToProxyAddress(networkId), ProxyAbi.abi, signerOrProvider);
};
