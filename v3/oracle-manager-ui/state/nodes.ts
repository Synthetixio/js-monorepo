import { atom } from 'recoil';
import { Node } from '../utils/types';

const initState = localStorage.getItem('oracleManagerUI');

export const nodesState = atom({
  default: (initState ? JSON.parse(initState) : []) as Node[],
  key: 'nodes',
});
