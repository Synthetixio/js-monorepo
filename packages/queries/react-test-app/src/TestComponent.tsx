import { ReactElement, useContext, useMemo } from 'react';
import { SynthetixQueryContext } from '../../src';
import { NetworkId } from '@synthetixio/contracts-interface';

function TestComponent(): ReactElement {
	const synthetixQueryContext = useContext(SynthetixQueryContext);

	const onClick = () => {
		if (synthetixQueryContext != null) {
			synthetixQueryContext.updateQueryContext({ networkId: NetworkId.Mainnet });
		}
	};

	const networkId = useMemo(
		() => synthetixQueryContext?.queryContext.networkId ?? null,
		[synthetixQueryContext?.queryContext.networkId]
	);

	return (
		<>
			<div>NetworkId is {networkId}</div>
			<button onClick={onClick}>Button</button>
		</>
	);
}

export default TestComponent;
