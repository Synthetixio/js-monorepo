import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { safeLazy } from '@synthetixio/safe-import';

import '@reach/dialog/styles.css';
import 'tippy.js/dist/tippy.css';
import './app.css';

import './i18n';

const App = safeLazy(() => import(/* webpackChunkName: "app" */ './App'));

export async function bootstrap() {
  const app = document.querySelector('#app');
  const root = ReactDOM.createRoot(app as Element);
  root.render(
    <Suspense>
      <App />
    </Suspense>
  );
}
