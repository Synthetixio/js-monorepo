describe('useEVMTxn', () => {
  let useEVMTxn;
  let react;
  let reactQuery;
  let setState;

  beforeEach(async () => {
    setState = jest.fn();
    react = {
      useState: jest.fn((defaultValue) => [defaultValue, setState]),
      useEffect: jest.fn(),
    };
    reactQuery = {
      useMutation: jest.fn(() => ({ mutationResult: 'mutationResult' })),
      useQuery: jest.fn(() => 'useQuery'),
    };

    jest.doMock('react', () => react);
    jest.doMock('@tanstack/react-query', () => reactQuery);

    ({ default: useEVMTxn } = await import('./useEVMTxn'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Does not call estimateGas when txn is null', async () => {
    const estimateGas = jest.fn(() => Promise.resolve(10));
    const sendTransaction = jest.fn();

    const ctx = {
      signer: {
        estimateGas,
        sendTransaction,
      },
    };
    const txn = null;
    useEVMTxn(ctx, txn);

    expect(reactQuery.useMutation).toBeCalled();
    expect(estimateGas).not.toBeCalled();
  });

  test('refresh', async () => {
    const estimateGas = jest.fn(() => Promise.resolve(10));
    const sendTransaction = jest.fn();

    const ctx = {
      networkId: 666,
      signer: {
        estimateGas,
        sendTransaction,
      },
    };
    const txn = null;
    useEVMTxn(ctx, txn);

    const [effect, cacheKeys] = react.useEffect.mock.lastCall;
    expect(effect.toString()).toMatch('refresh()');
    expect(cacheKeys).toEqual([undefined, undefined, undefined, undefined, undefined, 666]);

    // run the effect / refresh()
    effect();

    expect(setState).toBeCalled();
  });
});
