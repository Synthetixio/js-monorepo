import { isObjKey } from './utils';
describe('isObjKey', () => {
  test('false when key does no exists', () => {
    expect(isObjKey('doesNotExists', { props: 1 }));
  });
  test('true when key does  exists', () => {
    expect(isObjKey('props', { props: 1 }));
  });
});
