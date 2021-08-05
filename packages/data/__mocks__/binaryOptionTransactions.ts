import { OptionTransactionType } from '../generated/graphql';

export const binaryOptionTransactionsMock = {
	response: {
		account: '0x37480ca37666bc8584f2ed92361bdc71b1f4aade',
		amount: '225188934499297650451',
		currencyKey: '0x7345544800000000000000000000000000000000000000000000000000000000',
		fee: null,
		id: '0x0018f10f068908f433e8f231c1a0367fb3750fd50be01eb356a1b6ca8949bc39-128',
		market: '0x4c7be4d2d4970cbbbf23bf86f7effe58327791b7',
		side: null,
		timestamp: '1607236226',
		type: OptionTransactionType.Exercise,
	},
	formatted: {
		account: '0x37480ca37666bc8584f2ed92361bdc71b1f4aade',
		amount: '225.188934499297650451',
		currencyKey: 'sETH',
		fee: null,
		hash: '0x0018f10f068908f433e8f231c1a0367fb3750fd50be01eb356a1b6ca8949bc39',
		market: '0x4c7be4d2d4970cbbbf23bf86f7effe58327791b7',
		side: 'short',
		timestamp: 1607236226000,
		type: 'exercise',
	},
};
