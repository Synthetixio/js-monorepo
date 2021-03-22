import synthetixData, { calculateTimestampForPeriod, PERIOD_IN_HOURS } from '../src';

describe('@synthetixio/data tests', () => {
	const randomLargeSNXStaker = '0x042ed37d32b88ab6b1c2e7b8a400dcdc728050bc';
	const randomL2Staker = '0x000ad8f56d3408abe29466189612d1b7b19e4420';
	let snxData;
	let snxDataOvm;
	let oneDayTimestamp = calculateTimestampForPeriod(PERIOD_IN_HOURS['ONE_DAY']);

	beforeAll(() => {
		snxData = synthetixData({ useOvm: false });
		snxDataOvm = synthetixData({ useOvm: true });
	});

	describe('synthetix meta data query', () => {
		test('should return synthetix meta data from l1', async () => {
			const synthetixInfo = await snxData.synthetix();
			expect(synthetixInfo.id).toEqual('1');
			expect(Number(synthetixInfo.issuers)).toBeGreaterThan(0);
			expect(Number(synthetixInfo.snxHolders)).toBeGreaterThan(0);
		});

		test('should return synthetix meta data from l2', async () => {
			const synthetixInfoL2 = await snxDataOvm.synthetix();
			expect(synthetixInfoL2.id).toEqual('1');
			expect(Number(synthetixInfoL2.issuers)).toBeGreaterThan(0);
			expect(Number(synthetixInfoL2.snxHolders)).toBeGreaterThan(0);
		});
	});

	describe('exchanges query', () => {
		test('should return exchanges from l1', async () => {
			const exchanges = await snxData.synthExchanges({
				minTimestamp: oneDayTimestamp,
			});
			expect(exchanges.length).toBeGreaterThan(0);
			expect(Number(exchanges[0].fromAmount)).toBeGreaterThan(0);
		});

		// TODO add L2 test once we have exchanges to verify
	});

	describe('issued query', () => {
		test('should return issueds data from l1', async () => {
			const issuedInfo = await snxData.issued({ max: 1, account: randomLargeSNXStaker });
			expect(issuedInfo[0].account).toEqual(randomLargeSNXStaker);
		});

		test('should return issueds data from l2', async () => {
			const issuedInfo = await snxDataOvm.issued({ max: 1, account: randomL2Staker });
			expect(issuedInfo[0].account).toEqual(randomL2Staker);
		});
	});

	describe('rate updates query', () => {
		test('should return rateUpdates data from l1', async () => {
			const rateUpdatesInfo = await snxData.rateUpdates({
				max: 5,
				synth: 'SNX',
				minTimestamp: oneDayTimestamp,
			});
			expect(rateUpdatesInfo[0].synth).toEqual('SNX');
			expect(rateUpdatesInfo.length).toBeGreaterThan(0);
		});

		test('should return rateUpdates data from l2', async () => {
			const rateUpdatesInfo = await snxDataOvm.rateUpdates({
				max: 5,
				synth: 'SNX',
				minTimestamp: oneDayTimestamp,
			});
			expect(rateUpdatesInfo[0].synth).toEqual('SNX');
			expect(rateUpdatesInfo.length).toBeGreaterThan(0);
		});
	});
});
