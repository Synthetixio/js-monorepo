export interface Node {
  oracleNodeType: string;
  nodeType: 'input' | 'default' | 'output';
  id: string;
  parents: string[];
  parameters: unknown;
  position: { x: number; y: number };
  data: { label: string };
}
