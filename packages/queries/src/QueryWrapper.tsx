import React, { Component, createContext, ReactChildren } from 'react';
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
	}: {
		networkId: NetworkId | undefined;
		provider: ethers.providers.Provider | undefined;
		signer: ethers.Signer | undefined;
	}) => void;
} | null;

export const SynthetixQueryContext = createContext<QueryContextWithUpdate>(null);

const createContextObject = ({
	networkId,
	provider,
	signer,
}: {
	networkId: NetworkId | undefined;
	provider: ethers.providers.Provider | undefined;
	signer: ethers.Signer | undefined;
}): QueryContext => {
	const snxjs = synthetix({ networkId, provider, signer });
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
	children: ReactChildren;
};

type SynthetixQueryWrapperState = {
	queryContext: QueryContext;
};

class SynthetixQueryWrapper extends Component<
	SynthetixQueryWrapperProps,
	SynthetixQueryWrapperState
> {
	state: SynthetixQueryWrapperState = {
		// optional second annotation for better type inference
		queryContext: createContextObject({
			networkId: this.props.networkId,
			provider: this.props.provider,
			signer: this.props.signer,
		}),
	};

	updateQueryContext({
		networkId,
		provider,
		signer,
	}: {
		networkId: NetworkId | undefined;
		provider: ethers.providers.Provider | undefined;
		signer: ethers.Signer | undefined;
	}): void {
		const updatedQueryContext = createContextObject({
			networkId,
			provider,
			signer,
		});
		this.setState({ queryContext: updatedQueryContext });
	}

	render() {
		return (
			<SynthetixQueryContext.Provider
				value={{
					queryContext: this.state.queryContext,
					updateQueryContext: this.updateQueryContext,
				}}
			>
				{this.props.children}
			</SynthetixQueryContext.Provider>
		);
	}
}

export default SynthetixQueryWrapper;
