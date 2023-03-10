import { Edge } from 'reactflow';

export type Node = CustomNode & Edge<any>;
interface CustomNode {
  typeId: number;
  type: OracleNodeTypes;
  id: string;
  parents: string[];
  parameters: any[];
  position: { x: number; y: number };
  data: { label: string };
  isRegistered: boolean;
}

export type OracleNodeTypes =
  | 'chainLink'
  | 'pyth'
  | 'reducer'
  | 'externalNode'
  | 'stalenessCircuitBreaker'
  | 'uniswap'
  | 'priceDeviationCircuitBreaker';
