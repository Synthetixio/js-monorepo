import { bootstrap } from './bootstrap';
bootstrap();
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    // do nothing
  });
}
