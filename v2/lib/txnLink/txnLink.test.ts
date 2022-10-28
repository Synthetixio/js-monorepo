import { getEtherscanBaseUrl } from './txnLink';
describe('getEtherscanBaseUrl', () => {
  it('handles mainnet', () => {
    expect(getEtherscanBaseUrl(1)).toBe('https://etherscan.io');
  });
  it('handles goerli', () => {
    expect(getEtherscanBaseUrl(5)).toBe('https://goerli.etherscan.io');
  });
  it('handles optimism', () => {
    expect(getEtherscanBaseUrl(10)).toBe('https://optimistic.etherscan.io');
  });
  it('handles optimism-goerli', () => {
    expect(getEtherscanBaseUrl(420)).toBe('https://goerli-optimism.etherscan.io');
  });
  it('returns mainnet when unkown', () => {
    expect(getEtherscanBaseUrl(123456)).toBe('https://etherscan.io');
  });
});
