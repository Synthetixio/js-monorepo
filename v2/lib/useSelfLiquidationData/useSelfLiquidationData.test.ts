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
        walletAddress: 'vitalik.eth',
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

  test('Returns undefined values when useDebtData data is undefined', async () => {
    useDebtData.mockReturnValue({ data: undefined });
    useExchangeRatesData.mockReturnValue({ data: { SNX: wei(3) } });
    useLiquidationData.mockReturnValue({ data: { selfLiquidationPenalty: wei(0.2) } });
    useLiquidator.mockReturnValue({
      data: {
        liquidationAmounts: jest.fn().mockReturnValue({ data: [wei(100)] }),
      },
    });

    const result = useSelfLiquidationData();
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, 'vitalik.eth', false]);

    expect(result.data).toEqual(undefined);
    expect(options).toEqual({ enabled: false, staleTime: 10000 });
  });

  test('Returns undefined values when useExchangeRatesData data is undefined', async () => {
    useExchangeRatesData.mockReturnValue({ data: undefined });
    useDebtData.mockReturnValue({ data: { collateral: wei(50), debtBalance: wei(200) } });
    useLiquidationData.mockReturnValue({ data: { selfLiquidationPenalty: wei(0.2) } });
    useLiquidator.mockReturnValue({
      data: {
        liquidationAmounts: jest.fn().mockReturnValue({ data: [wei(100)] }),
      },
    });

    const result = useSelfLiquidationData();
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, 'vitalik.eth', false]);
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
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, 'vitalik.eth', false]);

    expect(result.data).toEqual(undefined);
    expect(options).toEqual({ enabled: false, staleTime: 10000 });
  });
  test('Returns undefined values when useLiquidationData data is undefined', async () => {
    useLiquidationData.mockReturnValue({ data: undefined });
    useDebtData.mockReturnValue({ data: { collateral: wei(50), debtBalance: wei(200) } });
    useExchangeRatesData.mockReturnValue({ data: { SNX: wei(3) } });
    useLiquidator.mockReturnValue({
      data: {
        liquidationAmounts: jest.fn().mockReturnValue({ data: [wei(100)] }),
      },
    });
    const result = useSelfLiquidationData();
    const [cacheKey, _query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, 'vitalik.eth', false]);

    expect(result.data).toEqual(undefined);
    expect(options).toEqual({ enabled: false, staleTime: 10000 });
  });

  test('Returns self liquidation data when dependent query have returned data', async () => {
    useDebtData.mockReturnValue({
      data: {
        collateral: wei(50),
        debtBalance: wei(200),
        targetCRatioPercentage: wei(350),
        currentCRatioPercentage: wei(200),
        liquidationRatioPercentage: wei(100),
      },
    });
    useExchangeRatesData.mockReturnValue({ data: { SNX: wei(2) } });
    useLiquidationData.mockReturnValue({ data: { selfLiquidationPenalty: wei(0.4) } });
    useLiquidator.mockReturnValue({
      data: {
        liquidationAmounts: jest.fn().mockReturnValue([wei(50)]),
      },
    });

    useSelfLiquidationData();

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, 'vitalik.eth', true]);
    expect(options).toEqual({ enabled: true, staleTime: 10000 });

    const queryResult = await query();

    expect(queryResult.selfLiquidationPenaltyPercent).toEqual(wei(0.4));
    expect(queryResult.totalAmountToLiquidateSNX).toEqual(wei(50));
    expect(queryResult.totalAmountToLiquidateUSD).toEqual(wei(100));
    expect(queryResult.amountToLiquidateToTargetSNX.toString(2)).toBe('35.71'); // 50 / 1.40
    expect(queryResult.amountToLiquidateToTargetUsd.toString(2)).toBe('71.43'); //35.71 * 2
    expect(queryResult.selfLiquidationPenaltySNX.toString(2)).toBe('14.29'); // 50 - 35.71
    expect(queryResult.selfLiquidationPenaltyUSD.toString(2)).toBe('28.57'); // 14.29 * 2
  });
  test('Handles calculateAmountToFixCollateral returning 0', async () => {
    useDebtData.mockReturnValue({ data: { collateral: wei(50), debtBalance: wei(200) } });
    useExchangeRatesData.mockReturnValue({ data: { SNX: wei(3) } });
    useLiquidationData.mockReturnValue({ data: { selfLiquidationPenalty: wei(0.2) } });
    useLiquidator.mockReturnValue({
      data: {
        liquidationAmounts: jest.fn().mockReturnValue([wei(0)]),
      },
    });

    useSelfLiquidationData();

    const [cacheKey, query, options] = reactQuery.useQuery.mock.lastCall;
    expect(cacheKey).toEqual(['useSelfLiquidationData', 1, 'vitalik.eth', true]);
    expect(options).toEqual({ enabled: true, staleTime: 10000 });

    const queryResult = await query();
    expect(queryResult).toEqual({
      selfLiquidationPenaltyPercent: wei(0.2),
      selfLiquidationPenaltyUSD: wei(0),
      selfLiquidationPenaltySNX: wei(0),
      totalAmountToLiquidateUSD: wei(0),
      totalAmountToLiquidateSNX: wei(0),
      amountToLiquidateToTargetUsd: wei(0),
      amountToLiquidateToTargetSNX: wei(0),
    });
  });
});
