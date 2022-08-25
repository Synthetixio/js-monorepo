import { ethers } from 'ethers';

import synthetix, { SynthetixJS } from '.';
import { NetworkNameById, NetworkIdByName } from './types';
import { ERRORS } from './constants';

describe('@synthetixio/js tests', () => {
  let snxjs: SynthetixJS;

  beforeAll(() => {
    snxjs = synthetix({ network: NetworkNameById[5] });
  });

  test('should return contracts', () => {
    expect(Object.keys(snxjs.targets).length).toBeGreaterThan(0);
  });

  test('should return different contracts for the OVM', () => {
    const snxjsGoerli = synthetix({ network: NetworkNameById[5] });
    const snxjsGoerliOvm = synthetix({ network: NetworkNameById[420] });
    const synthetixContractGoerli = snxjsGoerli.contracts['Synthetix'];
    const synthetixContractGoerliOvm = snxjsGoerliOvm.contracts['Synthetix'];
    expect(synthetixContractGoerli.address).not.toEqual(synthetixContractGoerliOvm.address);
  });

  test('should have the right mapping with the contracts', () => {
    const synthetixContract = snxjs.contracts['Synthetix'];
    const sUSDContract = snxjs.contracts['SynthsUSD'];
    const sETHContract = snxjs.contracts['SynthsETH'];
    expect(synthetixContract.address).toEqual(snxjs.targets.ProxySynthetix.address);
    expect(sUSDContract.address).toEqual(snxjs.targets.ProxysUSD.address);
    expect(sETHContract.address).toEqual(snxjs.targets.ProxysETH.address);
  });

  test('should have the right mapping with the contracts for the OVM', () => {
    const snxjsGoerliOvm = synthetix({ network: NetworkNameById[5], useOvm: true });
    const synthetixContractGoerliOvm = snxjsGoerliOvm.contracts['Synthetix'];
    const sUSDContractGoerliOvm = snxjsGoerliOvm.contracts['SynthsUSD'];
    expect(synthetixContractGoerliOvm.address).toEqual(
      snxjsGoerliOvm.targets.ProxySynthetix.address
    );
    expect(sUSDContractGoerliOvm.address).toEqual(snxjsGoerliOvm.targets.ProxysUSD.address);
  });

  test('should return the ethers object', () => {
    expect(typeof snxjs.utils).toBe(typeof ethers.utils);
  });

  test('should include the supported networks', () => {
    expect(snxjs.networkToChainId[NetworkNameById[1]]).toBe(NetworkIdByName.mainnet.toString());
    expect(snxjs.networkToChainId[NetworkNameById[10]]).toBe(
      NetworkIdByName['mainnet-ovm'].toString()
    );

    expect(snxjs.networkToChainId[NetworkNameById[420]]).toBe(
      NetworkIdByName['goerli-ovm'].toString()
    );
    expect(snxjs.networkToChainId[NetworkNameById[5]]).toBe(NetworkIdByName.goerli.toString());
  });

  test('should include the current network', () => {
    expect(snxjs.network.name).toBe(NetworkNameById[5]);
    expect(snxjs.network.id).toBe(NetworkIdByName.goerli.toString());
  });

  test('should return users', () => {
    expect(snxjs.users.length).toBeGreaterThan(0);
  });

  test('should return valid contracts', () => {
    const validContract = snxjs.contracts['Synthetix'];
    expect(validContract).not.toBe(undefined);
  });

  test('should not return an invalid contract', () => {
    const invalidContract = snxjs.contracts['RandomContract1234'];
    expect(invalidContract).toBe(undefined);
  });

  test('should get the right sources data', () => {
    const validSource = snxjs.sources['Synthetix'];
    expect(validSource.bytecode).not.toBe(undefined);
    expect(validSource.abi).not.toBe(undefined);
  });

  test('should not include invalid sources data', () => {
    const invalidSource = snxjs.sources['RandomContract1234'];
    expect(invalidSource).toBe(undefined);
  });

  test('should get the right synths data', () => {
    const validSynthIndex = snxjs.synths.findIndex(({ name }) => name === 'sETH');
    expect(validSynthIndex).not.toBe(-1);
  });

  test('should not include invalid synths data', () => {
    // @ts-ignore
    const invalidSynthIndex = snxjs.synths.findIndex(({ name }) => name === 'mETH1234');
    expect(invalidSynthIndex).toBe(-1);
  });

  test('should have a list of staking rewards', () => {
    const mainnetSnxjs = synthetix({ network: NetworkNameById[1] });
    expect(mainnetSnxjs.stakingRewards[0].name).toBeTruthy();
  });

  test('should return several versions', () => {
    expect(Object.keys(snxjs.versions).length).toBeGreaterThan(0);
  });

  test('should return suspension reasons', () => {
    expect(Object.keys(snxjs.suspensionReasons).length).toBeGreaterThan(0);
  });

  test('toBytes32 is working properly', () => {
    expect(snxjs.toBytes32('SNX')).toBe(
      '0x534e580000000000000000000000000000000000000000000000000000000000'
    );
  });

  test('the right defaults are available', () => {
    expect(Number(snxjs.defaults.WAITING_PERIOD_SECS)).toBeGreaterThan(0);
    expect(snxjs.defaults.SOME_RANDOM_NAME).toBe(undefined);
  });

  test('the correct tokens are returned', () => {
    expect(Object.keys(snxjs.tokens).length).toBeGreaterThan(0);
  });

  test('the right feeds are returned', () => {
    expect(snxjs.feeds.SNX.asset).toBe('SNX');
    expect(snxjs.feeds.SOME_RANDOM_FEED).toBe(undefined);
  });

  test('the decode method is defined', () => {
    expect(snxjs.decode).toBeTruthy();
    expect(typeof snxjs.decode).toBe('function');
  });

  test('should throw error with wrong network', () => {
    try {
      // @ts-ignore
      synthetix({ network: 'wrongnetwork' });
    } catch (e) {
      // @ts-ignore
      expect(e.message).toEqual(ERRORS.badNetworkArg);
    }
  });
});
