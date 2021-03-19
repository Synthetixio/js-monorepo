import synthetixData, { calculateTimestampForPeriod, PERIOD_IN_HOURS } from '../src';

describe('@synthetixio/data tests', () => {
	const randomLargeSNXStaker = '0x042ed37d32b88ab6b1c2e7b8a400dcdc728050bc';
	let snxData;
	let snxDataOvm;
	let oneDayTimestamp = calculateTimestampForPeriod(PERIOD_IN_HOURS['ONE_DAY']);

	beforeAll(() => {
		snxData = synthetixData({ useOvm: false });
		snxDataOvm = synthetixData({ useOvm: true });
	});

	test('should return exchanges from l1', async () => {
		const exchanges = await snxData.synthExchanges({
			minTimestamp: oneDayTimestamp,
		});
		expect(exchanges.length).toBeGreaterThan(0);
		expect(Number(exchanges[0].fromAmount)).toBeGreaterThan(0);
	});

	test('should return synthetix meta data from l1', async () => {
		const synthetixInfo = await snxData.synthetix();
		expect(synthetixInfo.id).toEqual('1');
		expect(Number(synthetixInfo.issuers)).toBeGreaterThan(0);
		expect(Number(synthetixInfo.snxHolders)).toBeGreaterThan(0);
	});

	test('should return issueds data from l1', async () => {
		const issuedInfo = await snxData.issued({ max: 1, account: randomLargeSNXStaker });
		console.log('issuedInfo', issuedInfo);
		expect(issuedInfo[0].account).toEqual(randomLargeSNXStaker);
	});
});
