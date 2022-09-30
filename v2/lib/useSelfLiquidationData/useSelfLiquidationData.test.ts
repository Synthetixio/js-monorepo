import { wei } from '@synthetixio/wei';

describe('useSelfLiquidationData', () => {
  let useLiquidator;
  let useDebtData;
  let useExchangeRatesData;
  let useLiquidationData;
  let react;
  let reactQuery;
  let ContractContext;
  let useSelfLiquidationData;

  beforeEach(async () => {
    react = {
      useContext: jest.fn(() => ({
        networkId: 1,
        gasSpeed: 'average',
      })),
    };
    ContractContext = jest.fn();

    reactQuery = {
      useQuery: jest.fn(() => 'useQuery'),
    };
    useExchangeRatesData = jest.fn();
    useDebtData = jest.fn();
    useLiquidationData = jest.fn();
    useLiquidator = jest.fn();
    jest.doMock('react', () => react);
    jest.doMock('@tanstack/react-query', () => reactQuery);
    jest.doMock('@snx-v2/ContractContext', () => ContractContext);
    jest.doMock('@snx-v2/useSynthetixContracts', () => ({ useLiquidator }));
    jest.doMock('@snx-v2/useExchangeRatesData', () => ({ useExchangeRatesData }));
    jest.doMock('@snx-v2/useDebtData', () => ({ useDebtData }));
    jest.doMock('@snx-v2/useLiquidationData', () => ({ useLiquidationData }));

    ({ useSelfLiquidationData } = await import('./useSelfLiquidationData'));
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('Returns undefined values when exchangeRateData data is undefined', async () => {
    useDebtData.mockReturnValue({ data: undefined });
    useExchangeRatesData.mockReturnValue({ data: { SNX: wei(3) } });
    useLiquidationData.mockReturnValue({ data: { selfLiquidationPenalty: wei(0.2) } });
    useLiquidator.mockReturnValue({
      data: {
        calculateAmountToFixCollateral: jest.fn().mockReturnValue({ data: wei(100) }),
      },
    });

    const result = useSelfLiquidationData();
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, false]);

    expect(result.data).toEqual(undefined);
    expect(options).toEqual({ enabled: false, staleTime: 10000 });
  });

  test('Returns undefined values when useExchangeRatesData data is undefined', async () => {
    useExchangeRatesData.mockReturnValue({ data: undefined });
    useDebtData.mockReturnValue({ data: { collateral: wei(50), debtBalance: wei(200) } });
    useLiquidationData.mockReturnValue({ data: { selfLiquidationPenalty: wei(0.2) } });
    useLiquidator.mockReturnValue({
      data: {
        calculateAmountToFixCollateral: jest.fn().mockReturnValue({ data: wei(100) }),
      },
    });

    const result = useSelfLiquidationData();
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, false]);
    expect(result.data).toEqual(undefined);
    expect(options).toEqual({ enabled: false, staleTime: 10000 });
  });
  test('Returns undefined values when useLiquidator data is undefined', async () => {
    useLiquidator.mockReturnValue({ data: undefined });
    useLiquidationData.mockReturnValue({ data: { selfLiquidationPenalty: wei(0.2) } });
    useDebtData.mockReturnValue({ data: { collateral: wei(50), debtBalance: wei(200) } });
    useExchangeRatesData.mockReturnValue({ data: { SNX: wei(3) } });

    const result = useSelfLiquidationData();
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, false]);

    expect(result.data).toEqual(undefined);
    expect(options).toEqual({ enabled: false, staleTime: 10000 });
  });
  test('Returns undefined values when useLiquidationData data is undefined', async () => {
    useLiquidationData.mockReturnValue({ data: undefined });
    useDebtData.mockReturnValue({ data: { collateral: wei(50), debtBalance: wei(200) } });
    useExchangeRatesData.mockReturnValue({ data: { SNX: wei(3) } });
    useLiquidator.mockReturnValue({
      data: {
        calculateAmountToFixCollateral: jest.fn().mockReturnValue({ data: wei(100) }),
      },
    });
    const result = useSelfLiquidationData();
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, false]);

    expect(result.data).toEqual(undefined);
    expect(options).toEqual({ enabled: false, staleTime: 10000 });
  });

  test('Returns correct data when dependent query have returned data', async () => {
    useDebtData.mockReturnValue({ data: { collateral: wei(50), debtBalance: wei(200) } });
    useExchangeRatesData.mockReturnValue({ data: { SNX: wei(3) } });
    useLiquidationData.mockReturnValue({ data: { selfLiquidationPenalty: wei(0.2) } });
    useLiquidator.mockReturnValue({
      data: {
        calculateAmountToFixCollateral: jest
          .fn()
          .mockReturnValueOnce(wei(100))
          .mockReturnValueOnce(wei(80)),
      },
    });

    useSelfLiquidationData();

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, true]);
    expect(options).toEqual({ enabled: true, staleTime: 10000 });

    const queryResult = await query();
    expect(queryResult).toEqual({
      selfLiquidationPenalty: wei(0.2),
      selfLiquidationPenaltyDollar: wei(20),
      selfLiquidationPenaltySNX: wei(20).div(3),
      amountToLiquidate: wei(100),
      amountToLiquidateNoPenalty: wei(80),
    });
  });
  test('Handles calculateAmountToFixCollateral returning 0', async () => {
    useDebtData.mockReturnValue({ data: { collateral: wei(50), debtBalance: wei(200) } });
    useExchangeRatesData.mockReturnValue({ data: { SNX: wei(3) } });
    useLiquidationData.mockReturnValue({ data: { selfLiquidationPenalty: wei(0.2) } });
    useLiquidator.mockReturnValue({
      data: {
        calculateAmountToFixCollateral: jest
          .fn()
          .mockReturnValueOnce(wei(0))
          .mockReturnValueOnce(wei(0)),
      },
    });

    useSelfLiquidationData();

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, true]);
    expect(options).toEqual({ enabled: true, staleTime: 10000 });

    const queryResult = await query();
    expect(queryResult).toEqual({
      selfLiquidationPenalty: wei(0.2),
      selfLiquidationPenaltyDollar: wei(0),
      selfLiquidationPenaltySNX: wei(0),
      amountToLiquidate: wei(0),
      amountToLiquidateNoPenalty: wei(0),
    });
  });
});
