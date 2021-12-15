import { renderHook } from '@testing-library/react-hooks';
import useHasVotedForElectionsQuery from '../src/queries/gov/useHasVotedForElectionsQuery';
import useProposalQuery from '../src/queries/gov/useProposalQuery';
import useVotingWeightQuery from '../src/queries/gov/useVotingWeightQuery';
import { getFakeQueryContext, getWrapper } from '../testUtils';

import { SPACE_KEY } from '../src/queries/gov/constants';

describe('@synthetixio/queries gov', () => {
	jest.mock('graphql-request');
	jest.mock('@snapshot-labs/snapshot.js');

	const ctx = getFakeQueryContext();

	// test('useHasVotedForElectionsQuery', async () => {
	// 	const wrapper = getWrapper();

	// 	const { result, waitFor } = renderHook(
	// 		() => useHasVotedForElectionsQuery(ctx, '', '0x0000000000000000000000000000000000000000'),
	// 		{ wrapper }
	// 	);

	// 	await waitFor(() => result.current.isSuccess);

	// 	expect(result.current.data?.hasVoted).toEqual(true);
	// });

	test('useProposalQuery', async () => {
		const wrapper = getWrapper();

		const { result, waitFor } = renderHook(
			() =>
				useProposalQuery(
					ctx,
					'',
					SPACE_KEY.COUNCIL,
					'0x0',
					'0x0000000000000000000000000000000000000000'
				),
			{ wrapper }
		);

		await waitFor(() => result.current.isSuccess);

		// TODO: clean this up to make more sense
		expect(result.current.data?.totalBalances).toEqual([
			0, 0, 0, 0, 0, 0, 10, 0, 10, 10, 0, 0, 0, 0, 0, 0,
		]);
		expect(result.current.data?.totalVotes).toEqual([
			0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0,
		]);
		expect(result.current.data?.choices).toHaveLength(16);
		expect(result.current.data?.totalVotesBalances).toEqual(30);
	});

	// test('useVotingWeightQuery', async () => {
	// 	const wrapper = getWrapper();

	// 	const { result, waitFor } = renderHook(
	// 		() =>
	// 			useVotingWeightQuery(
	// 				ctx,
	// 				'',
	// 				SPACE_KEY.COUNCIL,
	// 				'0x0000000000000000000000000000000000000000'
	// 			),
	// 		{ wrapper }
	// 	);

	// 	await waitFor(() => result.current.isSuccess);

	// 	expect(result.current.data!).toEqual([15, 0]);
	// });
});
