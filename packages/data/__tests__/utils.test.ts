import { hexToAscii } from '../src/utils';

describe('@synthetixio/data utils', () => {
	describe('hexToAscii', () => {
		test('should parse currencyKey', () => {
			expect(
				hexToAscii('0x7355534400000000000000000000000000000000000000000000000000000000')
			).toEqual('sUSD');
		});
	});
});
