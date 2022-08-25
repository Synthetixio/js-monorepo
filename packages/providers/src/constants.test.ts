import { ERRORS } from './constants';

describe('@synthetixio/providers', () => {
  it('needs tests', () => {
    expect(ERRORS.noWeb3Provider).toEqual('Web3 provider missing');
  });
});
