import {
	parseIssued,
	parseRates,
	parseSynthetix,
	parseSynthExchanges,
	parseBurned,
	parseFeesClaimed,
	parseSnxPrice,
	parseDebtSnapshot,
	parseSnxHolder,
} from '../queries';
import synthetixData, { calculateTimestampForPeriod, PERIOD_IN_HOURS } from '../src';
import { SynthetixData } from '../src/types';
import {
	issuedMock,
	burnedMock,
	snxPriceMock,
	ratesMock,
	feesClaimedMock,
	synthetixMock,
	synthExchangesMock,
	debtSnapshotMock,
	snxHolderMock,
} from '../__mocks__';

describe('@synthetixio/data tests', () => {
	const randomLargeSNXStaker = '0x042ed37d32b88ab6b1c2e7b8a400dcdc728050bc';
	const randomL2Staker = '0x000ad8f56d3408abe29466189612d1b7b19e4420';
	let snxData: SynthetixData;
	let snxDataOvm: SynthetixData;
	const oneDayTimestamp = calculateTimestampForPeriod(PERIOD_IN_HOURS['ONE_DAY']);

	beforeAll(() => {
		snxData = synthetixData({ useOvm: false });
		snxDataOvm = synthetixData({ useOvm: true });
	});

	describe('synthetix meta data query', () => {
		test('should parse the response correctly', () => {
			const parsedOutput = parseSynthetix(synthetixMock.response);
			expect(synthetixMock.formatted).toEqual(parsedOutput);
		});

		test('should return synthetix meta data from l1', async () => {
			const synthetixInfo = await snxData.synthetix();
			expect(synthetixInfo!.id).toEqual('1');
			expect(Number(synthetixInfo!.issuers)).toBeGreaterThan(0);
			expect(Number(synthetixInfo!.snxHolders)).toBeGreaterThan(0);
		});

		test('should return synthetix meta data from l2', async () => {
			const synthetixInfoL2 = await snxDataOvm.synthetix();
			expect(synthetixInfoL2!.id).toEqual('1');
			expect(Number(synthetixInfoL2!.issuers)).toBeGreaterThan(0);
			expect(Number(synthetixInfoL2!.snxHolders)).toBeGreaterThan(0);
		});
	});

	describe('exchanges query', () => {
		test('should parse the response correctly', () => {
			const parsedOutput = parseSynthExchanges(synthExchangesMock.response);
			expect(synthExchangesMock.formatted).toEqual(parsedOutput);
		});

		test('should return exchanges from l1', async () => {
			const exchanges = await snxData.synthExchanges({
				minTimestamp: oneDayTimestamp,
			});
			expect(exchanges!.length).toBeGreaterThan(0);
			expect(Number(exchanges![0].fromAmount)).toBeGreaterThan(0);
		});
		// TODO add L2 test once we have exchanges to verify
	});

	describe('issued query', () => {
		test('should parse the response correctly', () => {
			const parsedOutput = parseIssued(issuedMock.response);
			expect(issuedMock.formatted).toEqual(parsedOutput);
		});

		test('should return issueds data from l1', async () => {
			const issuedInfo = await snxData.issued({ max: 1, account: randomLargeSNXStaker });
			expect(issuedInfo![0].account).toEqual(randomLargeSNXStaker);
		});

		test('should return issueds data from l2', async () => {
			const issuedInfo = await snxDataOvm.issued({ max: 1, account: randomL2Staker });
			expect(issuedInfo![0].account).toEqual(randomL2Staker);
		});
	});

	describe('burned query', () => {
		test('should parse the response correctly', () => {
			const parsedOutput = parseBurned(burnedMock.response);
			expect(burnedMock.formatted).toEqual(parsedOutput);
		});

		test('should return burneds data from l1', async () => {
			const burnedInfo = await snxData.burned({ max: 1, account: randomLargeSNXStaker });
			expect(burnedInfo![0].account).toEqual(randomLargeSNXStaker);
		});

		test('should return burneds data from l2', async () => {
			const burnedInfo = await snxDataOvm.burned({ max: 1, account: randomL2Staker });
			expect(burnedInfo![0].account).toEqual(randomL2Staker);
		});
	});

	describe('feesClaimed query', () => {
		test('should parse the response correctly', () => {
			const parsedOutput = parseFeesClaimed(feesClaimedMock.response);
			expect(feesClaimedMock.formatted).toEqual(parsedOutput);
		});

		test('should return feesClaimeds data from l1', async () => {
			const feesClaimedInfo = await snxData.feesClaimed({ max: 1, account: randomLargeSNXStaker });
			expect(feesClaimedInfo![0].account).toEqual(randomLargeSNXStaker);
		});

		test('should return feesClaimeds data from l2', async () => {
			const feesClaimedInfo = await snxDataOvm.feesClaimed({ max: 1, account: randomL2Staker });
			expect(feesClaimedInfo![0].account).toEqual(randomL2Staker);
		});
	});

	describe('snxPrices query', () => {
		test('should parse the response correctly', () => {
			const parsedOutput = parseSnxPrice(snxPriceMock.response);
			expect(snxPriceMock.formatted).toEqual(parsedOutput);
		});

		test('should return snxPrices data from l1', async () => {
			const snxPricesInfo = await snxData.snxPrices({ max: 5, timeSeries: '1d' });
			expect(snxPricesInfo!.length).toEqual(5);
			expect(Number(snxPricesInfo![0].id)).toBeGreaterThan(0);
			expect(Number(snxPricesInfo![0].averagePrice)).toBeGreaterThan(0);
		});

		test('should return snxPrices data from l2', async () => {
			const snxPricesInfo = await snxDataOvm.snxPrices({ max: 5, timeSeries: '1d' });
			expect(snxPricesInfo!.length).toEqual(5);
			expect(Number(snxPricesInfo![0].id)).toBeGreaterThan(0);
			expect(Number(snxPricesInfo![0].averagePrice)).toBeGreaterThan(0);
		});
	});

	describe('rate updates query', () => {
		test('should parse the response correctly', () => {
			const parsedOutput = parseRates(ratesMock.response);
			expect(ratesMock.formatted).toEqual(parsedOutput);
		});

		test('should return rateUpdates data from l1', async () => {
			const l1RateUpdatesInfo = await snxData.rateUpdates({
				max: 5,
				synth: 'SNX',
				minTimestamp: oneDayTimestamp,
			});
			expect(l1RateUpdatesInfo![0].synth).toEqual('SNX');
			expect(l1RateUpdatesInfo!.length).toBeGreaterThan(0);
		});

		test('should return rateUpdates data from l2', async () => {
			const l2RateUpdatesInfo = await snxDataOvm.rateUpdates({
				max: 5,
				synth: 'SNX',
				minTimestamp: oneDayTimestamp,
			});
			expect(l2RateUpdatesInfo![0].synth).toEqual('SNX');
			expect(l2RateUpdatesInfo!.length).toBeGreaterThan(0);
		});
	});

	describe('debtSnapshots query', () => {
		test('should parse the response correctly', () => {
			const parsedOutput = parseDebtSnapshot(debtSnapshotMock.response);
			expect(debtSnapshotMock.formatted).toEqual(parsedOutput);
		});

		test('should return debtSnapshots data from l1', async () => {
			const debtSnapshotInfo = await snxData.debtSnapshots({
				max: 5,
				account: randomLargeSNXStaker,
			});
			expect(debtSnapshotInfo![0].account).toEqual(randomLargeSNXStaker);
			expect(Number(debtSnapshotInfo![0].collateral)).toBeGreaterThan(0);
			expect(debtSnapshotInfo!.length).toEqual(5);
		});

		test('should return debtSnapshots data from l2', async () => {
			const debtSnapshotInfo = await snxDataOvm.debtSnapshots({
				max: 5,
				account: randomL2Staker,
			});
			expect(debtSnapshotInfo![0].account).toEqual(randomL2Staker);
			expect(Number(debtSnapshotInfo![0].collateral)).toBeGreaterThan(0);
			expect(debtSnapshotInfo!.length).toEqual(5);
		});
	});

	describe('snxHolders query', () => {
		test('should parse the response correctly', () => {
			const parsedOutput = parseSnxHolder(snxHolderMock.response);
			expect(snxHolderMock.formatted).toEqual(parsedOutput);
		});

		test('should return snxHolders data from l1', async () => {
			const snxHoldersInfo = await snxData.snxHolders({
				max: 5,
			});
			expect(Number(snxHoldersInfo![0].collateral)).toBeGreaterThan(0);
			expect(Number(snxHoldersInfo![0].balanceOf)).toBeGreaterThan(0);
			expect(snxHoldersInfo!.length).toEqual(5);
		});

		test('should return snxHolders data from l2', async () => {
			const snxHoldersInfo = await snxDataOvm.snxHolders({
				max: 5,
			});
			expect(Number(snxHoldersInfo![0].collateral)).toBeGreaterThan(0);
			expect(Number(snxHoldersInfo![0].balanceOf)).toBeGreaterThan(0);
			expect(snxHoldersInfo!.length).toEqual(5);
		});
	});
});
