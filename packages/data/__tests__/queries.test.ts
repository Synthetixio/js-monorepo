import synthetixData, { calculateTimestampForPeriod, PERIOD_IN_HOURS } from '../src';

describe('@synthetixio/data tests', () => {
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
			fromAddress: '0x49bfb3ddc37128179eba7b5f50bbd1fa5075e4e6',
			maxBlock: 12065128,
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
});
