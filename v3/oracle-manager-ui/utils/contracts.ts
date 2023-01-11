import { Contract, utils } from 'ethers';
import ProxyAbi from '../deployments/Proxy.json';

function resolveNetworkIdToProxyAddress(networkId: number) {
  switch (networkId) {
    case 5:
      return '0x0E9628026e53f4c805073d85554A87dBd2011268';
    case 420:
      return '0xbcE929b1f28E17133Ce7bD5f3477EfF34727E1b6';
    default:
      return '0x0E9628026e53f4c805073d85554A87dBd2011268';
  }
}

export function encodeBytesByNodeType(id: number, parameters: any[]) {
  switch (id) {
    case 1:
      return utils.defaultAbiCoder.encode(['string'], parameters);
    case 2:
      return utils.defaultAbiCoder.encode(['address'], parameters);
    case 3:
      return utils.defaultAbiCoder.encode(['tuple(address, uint)'], [parameters]);
    case 4:
      return utils.defaultAbiCoder.encode(['tuple(address, address, string, uint)'], [parameters]);
    case 5:
      return utils.defaultAbiCoder.encode(['tuple(address, string, bool)'], [parameters]);
    case 6:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    case 7:
      return utils.defaultAbiCoder.encode(['uint'], parameters);
    default:
      return '';
  }
}

export function hashId(nodeType: number, parameters: any[], parents: string[]) {
  return utils.keccak256(
    utils.defaultAbiCoder.encode(
      ['uint256', 'bytes', 'string[]'],
      [
        nodeType,
        encodeBytesByNodeType(nodeType, parameters),
        parents.map((parent) => utils.formatBytes32String(parent)),
      ]
    )
  );
}

export const getNodeModuleContract = (signerOrProvider: any, networkId: number) => {
  return new Contract(resolveNetworkIdToProxyAddress(networkId), ProxyAbi.abi, signerOrProvider);
};
