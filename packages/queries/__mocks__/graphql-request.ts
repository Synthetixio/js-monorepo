const originalModule = jest.requireActual('graphql-request');

export const gql = originalModule.gql;

export default async function request(_: string, req: string) {
	if (req.match(/query LatestElections\(/)) {
		return {
			proposals: [
				{
					id: 'QmdXdj2Nm4A4Wq6eJu74gX7PUHYwQBZJiY12fpGekwDyew',
					snapshot: '12643795',
				},
				{
					id: 'QmXfikHsA5DjBwL5W4944wNiVbNBP4cVYckdpAYTQPRcY1',
					snapshot: '12643795',
				},
				{
					id: 'QmdVCTNvAZTJeDMb8AwU6eBp32nmV6ymsNZ2zMkJM9d93u',
					snapshot: '12643795',
				},
			],
		};
	} else if (req.match(/query Space\(/)) {
		return {
			space: {
				domain: null,
				about: '',
				members: [],
				name: 'Synthetix Spartan Council',
				network: '1',
				skin: 'synthetix',
				symbol: 'WD',
				strategies: [
					{
						name: 'synthetix',
						params: {
							symbol: 'WD',
						},
					},
					{
						name: 'delegation',
						params: {
							symbol: 'WD (delegated)',
							strategies: [
								{
									name: 'synthetix',
									params: {},
								},
							],
						},
					},
				],
				filters: {
					minScore: 0,
					onlyMembers: false,
				},
			},
		};
	} else if (req.match(/query VotesForElections\(/)) {
		return {
			votes: [
				{
					voter: '0x0000000000000000000000000000000000000000',
					created: 1624410000,
				},
				{
					voter: '0x0000000000000000000000000000000000000000',
					created: 1624410000,
				},
				{
					voter: '0x0000000000000000000000000000000000000000',
					created: 1624410000,
				},
			],
		};
	} else if (req.match(/query Votes\(/)) {
		return {
			votes: [
				{
					id: 'QmdVrJthnYvoS9JtZC3vGJeaQ1JqNHASCM5EVfLQvypA9L',
					voter: '0x1a207bEefC754735871CEEb4C506686F044B1c41',
					choice: 10,
				},
				{
					id: 'QmSKPcoRi9fVtPR2Q8yz1sKEQLcW3NDq5NUfsiHZmnKrtN',
					voter: '0x0000000000000000000000000000000000000000',
					choice: 9,
				},
				{
					id: 'QmV9iSwy2BdaUBxJBQFtpMYxBmqgWhXWJVtEVfV4Qypd9B',
					voter: '0xC0506F0b197899f168E751218f91E975DAdd9b37',
					choice: 7,
				},
			],
		};
	} else if (req.match(/query Proposal\(/)) {
		return {
			proposal: {
				id: 'QmdVCTNvAZTJeDMb8AwU6eBp32nmV6ymsNZ2zMkJM9d93u',
				title: 'Spartan Council Election 23/06/21',
				/* eslint-disable */
				body: '#### What is the Spartan Council Election?\n\n[SIP-93](https://sips.synthetix.io/sips/sip-93) explains the process and motives behind the Spartan Council. You can also read about it in the [blog post](https://blog.synthetix.io/the-spartan-council-election/). \n\n[SIP-104](https://sips.synthetix.io/sips/sip-104) explains the transition from liquid democracy to voter dilution which applies to this Spartan Council epoch. You can also read about it in the [blog post](https://blog.synthetix.io/spartan-council-updates-voting-live-for-next-epoch-integration-into-staking-dapp/)\n\nThe current council epoch is 3 months, successful Spartan Council members are paid a monthly stipend by the Synthetix Treasury.\n\n#### How are votes weighted?\nTo vote in the election, SNX holders will need to have staked within the last fee period snapshot before the start of the Election Period. \n\nEach staking wallet will be able to vote for one nominee, and a wallet\'s vote weighting takes their staking debt at the relevant snapshot and multiplies it quadratically, as outlined in [SIP-90](https://sips.synthetix.io/sips/sip-90).\n\n#### How to vote?\nChoose an option below.\n\nTo help match the wallet address with the nominee identity visit the spreadsheet [here](https://docs.google.com/spreadsheets/d/1nbAUAioVvxlhtBzUI0dwmedGC2R3AZL-mDws7BzvZDQ/edit?usp=sharing)\n',
				choices: [
					'0x9cFc4cfB2aa99bedc98d52E2DCc0Eb',
					'0x0bc3668d2AaFa53eD5E5134bA13ec7',
					'0x935D2fD458fdf41B6F7B62471f5937',
					'0x65DCD62932fEf5af25AdA91F0F2465',
					'0x4412bCaf3c6e37d0e6Fb14a00167B5',
					'0x0120666306F4D15bb125696f322BFD',
					'0x461783A831E6dB52D68Ba2f3194F6f',
					'0xb1346105fdF5eEEc401618fbA677d5',
					'0x5f024dBA3BCBbfE6DEce556dBb59C5',
					'0xbeBF7295A9Ddc37e33609790b12FBe',
					'0x2825396379c61308388f5edB183C32',
					'0x527A3ab8f1ff9172fD7d380863c54E',
					'0x3A136fAc784d455b2a961e32aE8BB6',
					'0xB0a5a05ac5791AD5a28905B57182CA',
					'0x93DF2Bea2e66d8c4fE547262Bb0797',
					'0x42f9134E9d3Bf7eEE1f8A5Ac2a4328',
				],
				start: 1624406400,
				end: 1625011200,
				snapshot: '12643795',
				state: 'closed',
				author: '0xAFe05574a3653cdE39c8Fb842f761F5326Aa424A',
				space: {
					id: 'spartancouncil.eth',
					name: 'Synthetix Spartan Council',
				},
			},
		};
	} else return null;
}
