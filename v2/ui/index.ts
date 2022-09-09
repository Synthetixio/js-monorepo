import { safeImport } from '@synthetixio/safe-import/safeImport';

async function bootstrap() {
  const { bootstrap } = await safeImport(() => import(/* webpackChunkName: "app" */ './bootstrap'));
  bootstrap();
}

bootstrap();

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    // do nothing
  });
}
