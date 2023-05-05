import ReactDOM from 'react-dom/client';
import { App } from './App';
import { preserveConnectedWallets, autoConnect } from '@snx-v3/useBlockchain';

const container = document.querySelector('#app');
async function run() {
  if (!container) {
    throw new Error('Container #app does not exist');
  }

  preserveConnectedWallets();
  await autoConnect();

  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
run();
