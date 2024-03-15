import { getEtherscanBaseUrl } from './txnLink';
describe('getEtherscanBaseUrl', () => {
  it('handles mainnet', () => {
    expect(getEtherscanBaseUrl(1)).toBe('https://etherscan.io');
  });

  it('handles optimism', () => {
    expect(getEtherscanBaseUrl(10)).toBe('https://optimistic.etherscan.io');
  });

  it('returns mainnet when unkown', () => {
    expect(getEtherscanBaseUrl(123456)).toBe('https://etherscan.io');
  });
});
