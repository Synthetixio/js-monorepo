export interface Node {
  type: OracleNodeTypes;
  id: string;
  parents: string[];
  parameters: any[];
  position: { x: number; y: number };
  data: { label: string };
}

export type OracleNodeTypes = 'chainLink' | 'pyth' | 'reducer';
