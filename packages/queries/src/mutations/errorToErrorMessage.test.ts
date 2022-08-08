import errorToErrorMessage from './errorToErrorMessage';

describe('errorToErrorMessage', () => {
  test('uses reason if it exist', () => {
    const result = errorToErrorMessage({
      reason: 'Expected error',
      message: 'not expected',
      data: 'not expected',
    });
    expect(result).toBe('Expected error');
  });
  test('uses message from data if it exist', () => {
    const result = errorToErrorMessage({
      reason: undefined,
      message: 'not expected',
      data: { message: 'Expected error' },
    });
    expect(result).toBe('Expected error');
  });
  test('uses message if it exist', () => {
    const result = errorToErrorMessage({
      reason: undefined,
      message: 'Expected error',
      data: undefined,
    });
    expect(result).toBe('Expected error');
  });
  test('parses frame error from data.message ', () => {
    const result = errorToErrorMessage({
      reason: undefined,
      message: '(error={"message":"Not expected error" }',
      data: { message: '(error={"message":"Expected error" }' },
    });
    expect(result).toBe('Expected error');
  });
  test('parses frame error from message ', () => {
    const result = errorToErrorMessage({
      reason: undefined,
      message: '(error={"message":"Expected error" }',
      data: undefined,
    });
    expect(result).toBe('Expected error');
  });
  test('parses frame error from message ', () => {
    const result = errorToErrorMessage({
      reason: undefined,
      message: undefined,
      data: undefined,
    });
    expect(result).toBe('Unknown error');
  });
});
