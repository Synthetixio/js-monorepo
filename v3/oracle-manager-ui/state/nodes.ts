import { atom } from 'recoil';
import { Node } from '../utils/types';

export const nodesState = atom({
  default: [] as Node[],
  key: 'nodes',
});
