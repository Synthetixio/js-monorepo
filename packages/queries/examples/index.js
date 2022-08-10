/* global document */

import React, { createElement as e } from 'react';
import numbro from 'numbro';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ethers } from 'ethers';

import { useQuery } from 'react-query';

import { InfuraProvider } from '@ethersproject/providers';
import { parseBytes32String } from '@ethersproject/strings';
import { formatEther } from '@ethersproject/units';
import { wei } from '@synthetixio/wei';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 300_000,
			refetchOnWindowFocus: false,
		},
	},
});

const NETWORKS = {
	mainnet: 1,
	goerli: 5,
	'goerli-ovm': 420,
	'mainnet-ovm': 10,
	kovan: 42,
	'kovan-ovm': 69,
	'mainnet-fork': 31337,
};

const CONTRACTS = {
	SynthUtil: {
		sources: {
			mainnet: () =>
				import('@synthetixio/contracts/generated/mainnet/deployment/sources/SynthUtil'),
			'mainnet-ovm': () =>
				import('@synthetixio/contracts/generated/mainnet-ovm/deployment/sources/SynthUtil'),
			goerli: () => import('@synthetixio/contracts/generated/goerli/deployment/sources/SynthUtil'),
			'goerli-ovm': () =>
				import('@synthetixio/contracts/generated/goerli-ovm/deployment/sources/SynthUtil'),
		},
		targets: {
			mainnet: () =>
				import('@synthetixio/contracts/generated/mainnet/deployment/targets/SynthUtil'),
			'mainnet-ovm': () =>
				import('@synthetixio/contracts/generated/mainnet-ovm/deployment/targets/SynthUtil'),
			goerli: () => import('@synthetixio/contracts/generated/goerli/deployment/targets/SynthUtil'),
			'goerli-ovm': () =>
				import('@synthetixio/contracts/generated/goerli-ovm/deployment/targets/SynthUtil'),
		},
	},
};

function useContract({ name, networkName, networkId, infuraId }) {
	return useQuery(
		[name, networkName, networkId, infuraId],
		async () => {
			const [{ address }, { abi }] = await Promise.all([
				CONTRACTS[name].targets[networkName](),
				CONTRACTS[name].sources[networkName](),
			]);
			const provider = new InfuraProvider(networkId, infuraId);
			return new ethers.Contract(address, abi, provider);
		},
		{ enabled: Boolean(networkId && infuraId), staleTime: Infinity }
	);
}

function App() {
	const networkName = 'mainnet';
	const networkId = NETWORKS[networkName];
	const infuraId = '45e567b9a0944c5c8e030d1801965e00';

	const { data: SynthUtil } = useContract({ name: 'SynthUtil', networkName, networkId, infuraId });
	const { data: synthsTotalSupplies } = useQuery(
		['SynthUtil', 'synthsTotalSupplies', networkId],
		() => SynthUtil.synthsTotalSupplies(),
		{ enabled: Boolean(SynthUtil) }
	);

	const data = React.useMemo(() => {
		if (!synthsTotalSupplies) {
			return [];
		}
		const [names, supplies, values] = synthsTotalSupplies;
		return names.map((_, i) => {
			const value = wei(formatEther(values[i]));
			const name = parseBytes32String(names[i]);
			const supply = wei(formatEther(supplies[i]));
			return { name, value, supply };
		});
	}, [synthsTotalSupplies]);

	return e(
		'table',
		{ style: { textAlign: 'left' }, cellPadding: 5 },
		e('thead', {}, e('tr', {}, e('th', {}, 'name'), e('th', {}, 'supply'), e('th', {}, 'value'))),

		e(
			'tbody',
			{},
			data.map((item) =>
				e(
					'tr',
					{ key: item.name },
					e('td', {}, item.name),
					e('td', {}, numbro(item.supply).format({ average: true, mantissa: 2 })),
					e('td', {}, numbro(item.value).format({ average: true, mantissa: 2 }))
				)
			)
		)
	);

	//	const data1 = query?.data?.supplyData
	//		? Object.values(query.data.supplyData)
	//				.sort((a, b) => (a.value.lt(b.value) ? 1 : -1))
	//				.map((supply) => ({
	//					name: supply.name,
	//					poolProportion: supply.poolProportion.toNumber(),
	//					skewValue: supply.skewValue.toNumber(),
	//					totalSupply: supply.totalSupply.toNumber(),
	//					value: supply.value.toNumber(),
	//					supply,
	//				}))
	//		: [];
	//
	//	return e(
	//		'table',
	//		{ style: { width: '100%', textAlign: 'right' } },
	//		e(
	//			'thead',
	//			{},
	//			e(
	//				'tr',
	//				{},
	//				e('th', {}, 'name'),
	//				e('th', {}, 'poolProportion'),
	//				e('th', {}, 'totalSupply'),
	//				e('th', {}, 'skewValue'),
	//				e('th', {}, 'value')
	//			)
	//		),
	//
	//		e(
	//			'tbody',
	//			{},
	//			data.map((item) =>
	//				e(
	//					'tr',
	//					{ key: item.name },
	//					e('td', {}, item.name),
	//					e('td', {}, numbro(item.poolProportion).format({ output: 'percent', mantissa: 2 })),
	//					e('td', {}, numbro(item.totalSupply).format({ average: true, mantissa: 2 })),
	//					e('td', {}, numbro(item.skewValue).format({ average: true, mantissa: 2 })),
	//					e('td', {}, numbro(item.value).format({ average: true, mantissa: 2 }))
	//				)
	//			)
	//		)
	//	);
}

function Providers({ children }) {
	return e(QueryClientProvider, { client, contextSharing: true, children });
}

ReactDOM.render(e(Providers, {}, e(App)), app);
