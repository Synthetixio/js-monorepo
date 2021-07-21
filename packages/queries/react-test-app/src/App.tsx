import React from 'react';
import { getDefaultProvider } from 'ethers';
import { NetworkId, Network } from '@synthetixio/contracts-interface';
import { SynthetixQueryWrapper } from '../../src';
import TestComponent from './TestComponent';

function App(): React.ReactElement {
	const provider = getDefaultProvider();
	const network = {
		id: NetworkId.Kovan,
		name: Network.Kovan,
		useOvm: false,
	};
	return (
		<SynthetixQueryWrapper
			provider={provider}
			networkId={network.id}
			useOvm={network.useOvm}
			signer={undefined}
		>
			<TestComponent />
			<div>Test</div>
		</SynthetixQueryWrapper>
	);
}

export default App;
