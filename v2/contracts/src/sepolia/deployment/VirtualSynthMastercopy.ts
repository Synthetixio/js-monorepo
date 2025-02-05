// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'VirtualSynthMastercopy';
export const address = '0x1f6Eba1Ac6a62df62edC54159A05711636b33D4C';
export const source = 'VirtualSynthMastercopy';
export const abi = [
  'constructor()',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Settled(uint256 totalSupply, uint256 amountAfterSettled)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 value) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function balanceOfUnderlying(address account) view returns (uint256)',
  'function currencyKey() view returns (bytes32)',
  'function decimals() view returns (uint8)',
  'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)',
  'function increaseAllowance(address spender, uint256 addedValue) returns (bool)',
  'function initialSupply() view returns (uint256)',
  'function initialize(address _synth, address _resolver, address _recipient, uint256 _amount, bytes32 _currencyKey)',
  'function initialized() view returns (bool)',
  'function name() view returns (string)',
  'function rate() view returns (uint256)',
  'function readyToSettle() view returns (bool)',
  'function resolver() view returns (address)',
  'function secsLeftInWaitingPeriod() view returns (uint256)',
  'function settle(address account)',
  'function settled() view returns (bool)',
  'function settledAmount() view returns (uint256)',
  'function symbol() view returns (string)',
  'function synth() view returns (address)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
];
