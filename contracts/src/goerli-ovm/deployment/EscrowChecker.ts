export const name = 'EscrowChecker';
export const address = '0x69927Cda9Df863464afAC7DA506928BF3a3ec11f';
export const source = 'EscrowChecker';
export const abi = [
  'constructor(address _esc)',
  'function checkAccountSchedule(address account) view returns (uint256[16])',
  'function synthetix_escrow() view returns (address)',
];
