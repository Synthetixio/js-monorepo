export const address = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
export const abi = [
  'event Approval(address indexed src, address indexed guy, uint256 wad)',
  'event Deposit(address indexed dst, uint256 wad)',
  'event Transfer(address indexed src, address indexed dst, uint256 wad)',
  'event Withdrawal(address indexed src, uint256 wad)',
  'function allowance(address, address) view returns (uint256)',
  'function approve(address guy, uint256 wad) returns (bool)',
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function deposit() payable',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address dst, uint256 wad) returns (bool)',
  'function transferFrom(address src, address dst, uint256 wad) returns (bool)',
  'function withdraw(uint256 wad)',
];
