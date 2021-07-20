import { Component, createContext, ReactNode } from 'react';
import ethers from 'ethers';
import { QueryContext } from './context';

import { synthetix, NetworkId } from '@synthetixio/contracts-interface';
import synthetixData from '@synthetixio/data';

type QueryContextWithUpdate = {
	queryContext: QueryContext;
	updateQueryContext: ({
		networkId,
		provider,
		signer,
		useOvm,
	}: {
		networkId: NetworkId | undefined;
		provider: ethers.providers.Provider | undefined;
		signer: ethers.Signer | undefined;
		useOvm: boolean | undefined;
	}) => void;
} | null;

export const SynthetixQueryContext = createContext<QueryContextWithUpdate>(null);

const createContextObject = ({
	networkId,
	provider,
	signer,
	useOvm,
}: {
	networkId: NetworkId | undefined;
	provider: ethers.providers.Provider | undefined;
	signer: ethers.Signer | undefined;
	useOvm: boolean | undefined;
}): QueryContext => {
	const snxjs = synthetix({ networkId, provider, signer, useOvm });
	return {
		networkId: snxjs.network.id,
		provider: snxjs.contracts.Synthetix.provider,
		signer: snxjs.contracts.Synthetix.signer,
		snxData: synthetixData({ networkId: snxjs.network.id }),
		snxjs,
	};
};

type SynthetixQueryWrapperProps = {
	networkId: NetworkId | undefined;
	provider: ethers.providers.Provider | undefined;
	signer: ethers.Signer | undefined;
	useOvm: boolean | undefined;
	children: ReactNode;
};

type SynthetixQueryWrapperState = {
	queryContext: QueryContext;
};

class SynthetixQueryWrapper extends Component<
	SynthetixQueryWrapperProps,
	SynthetixQueryWrapperState
> {
	state: SynthetixQueryWrapperState = {
		queryContext: createContextObject({
			networkId: this.props.networkId,
			provider: this.props.provider,
			signer: this.props.signer,
			useOvm: this.props.useOvm,
		}),
	};

	updateQueryContext({
		networkId,
		provider,
		signer,
		useOvm,
	}: {
		networkId: NetworkId | undefined;
		provider: ethers.providers.Provider | undefined;
		signer: ethers.Signer | undefined;
		useOvm: boolean | undefined;
	}): void {
		const updatedQueryContext = createContextObject({
			networkId,
			provider,
			signer,
			useOvm,
		});
		this.setState({ queryContext: updatedQueryContext });
	}

	render(): ReactNode {
		return SynthetixQueryContext.Provider({
			value: {
				queryContext: this.state.queryContext,
				updateQueryContext: this.updateQueryContext,
			},
			children: this.props.children,
		});
	}
}

export default SynthetixQueryWrapper;
