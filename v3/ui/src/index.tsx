import ReactDOM from 'react-dom/client';
import { App } from './App';

const container = document.querySelector('#app');
async function run() {
  if (!container) {
    throw new Error('Container #app does not exist');
  }
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
run();
