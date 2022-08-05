/* global document */

import { createElement as e } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { synthetix } from '@synthetixio/contracts-interface';
import useSynthsTotalSupplyQuery from '../src/queries/synths/useSynthsTotalSupplyQuery';

console.log('synthetix', synthetix);

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

function App() {
	const snxjs = synthetix({ network: 'mainnet' });
	const query = useSynthsTotalSupplyQuery({ ctx: { snxjs } });

	console.log('query', query);

	return e('h1', {}, 'Hello');
}

function Providers({ children }) {
	return e(QueryClientProvider, { client, contextSharing: true, children });
}

ReactDOM.render(e(Providers, {}, e(App)), app);
