import { getOptimismNetwork } from '.';

describe('@synthetixio/optimism-networks', () => {
  it('gets network information', () => {
    const response = {
      chainId: '0xA',
      chainName: 'Optimism Mainnet',
    };
    expect(getOptimismNetwork({ layerOneNetworkId: 1 })).toMatchObject(response);
  });
});
