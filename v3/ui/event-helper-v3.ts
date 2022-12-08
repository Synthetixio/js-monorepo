import { Contract, ethers, providers } from 'ethers';
import { address, abi } from '@synthetixio/v3-contracts/build/goerli/synthetix.CoreProxy';
const provider = new providers.InfuraProvider(5, '8b1cbf82d4004d63acd4aa9829bc6d15');
const contract = new Contract(address, abi, provider);
const filter = contract.filters['PoolCreated']();
console.log(filter);
contract.queryFilter(filter).then(console.log);

const jb = {
  _format: 'hh-sol-artifact-1',
  contractName: 'OracleManagerModule',
  sourceName: 'contracts/modules/OracleManagerModule.sol',
  abi: [
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'nodeId',
          type: 'bytes32',
        },
      ],
      name: 'NodeNotRegistered',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeType',
          type: 'uint256',
        },
      ],
      name: 'UnsupportedNodeType',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'operation',
          type: 'uint256',
        },
      ],
      name: 'UnsupportedOperation',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'bytes32',
          name: 'nodeId',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'bytes32[]',
          name: 'parents',
          type: 'bytes32[]',
        },
        {
          indexed: false,
          internalType: 'enum NodeDefinition.NodeType',
          name: 'nodeType',
          type: 'uint8',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'parameters',
          type: 'bytes',
        },
      ],
      name: 'NodeRegistered',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'nodeId',
          type: 'bytes32',
        },
      ],
      name: 'getNode',
      outputs: [
        {
          components: [
            {
              internalType: 'bytes32[]',
              name: 'parents',
              type: 'bytes32[]',
            },
            {
              internalType: 'enum NodeDefinition.NodeType',
              name: 'nodeType',
              type: 'uint8',
            },
            {
              internalType: 'bytes',
              name: 'parameters',
              type: 'bytes',
            },
          ],
          internalType: 'struct NodeDefinition.Data',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32[]',
          name: 'parents',
          type: 'bytes32[]',
        },
        {
          internalType: 'enum NodeDefinition.NodeType',
          name: 'nodeType',
          type: 'uint8',
        },
        {
          internalType: 'bytes',
          name: 'parameters',
          type: 'bytes',
        },
      ],
      name: 'getNodeId',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'nodeId',
          type: 'bytes32',
        },
      ],
      name: 'process',
      outputs: [
        {
          components: [
            {
              internalType: 'int256',
              name: 'price',
              type: 'int256',
            },
            {
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'volatilityScore',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'liquidityScore',
              type: 'uint256',
            },
          ],
          internalType: 'struct Node.Data',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32[]',
          name: 'parents',
          type: 'bytes32[]',
        },
        {
          internalType: 'enum NodeDefinition.NodeType',
          name: 'nodeType',
          type: 'uint8',
        },
        {
          internalType: 'bytes',
          name: 'parameters',
          type: 'bytes',
        },
      ],
      name: 'registerNode',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};
const iface = new ethers.utils.Interface(jb.abi);

console.log(iface.format(ethers.utils.FormatTypes.full));
