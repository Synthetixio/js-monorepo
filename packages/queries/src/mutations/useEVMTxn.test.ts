describe('useEVMTxn', () => {
  let useEVMTxn;
  let react;
  let reactQuery;

  beforeEach(async () => {
    react = {
      useState: jest.fn(() => []),
      useEffect: jest.fn(),
    };
    reactQuery = {
      useMutation: jest.fn(() => ({ mutationResult: 'mutationResult' })),
      useQuery: jest.fn(() => 'useQuery'),
    };

    jest.doMock('react', () => react);
    jest.doMock('react-query', () => reactQuery);

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
});
