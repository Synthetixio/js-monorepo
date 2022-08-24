import { queryFunctionName } from './util';

describe('queryFunctionName()', () => {
  it('does correct capitalization', () => {
    expect(queryFunctionName({ name: 'HelloWorld', fields: [], inputFields: [] })).toEqual(
      'helloWorld'
    );
    expect(queryFunctionName({ name: 'HELLOWorld', fields: [], inputFields: [] })).toEqual(
      'helloworld'
    );
  });
});
