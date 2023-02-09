import { utils } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { useCoreProxy, CoreProxyContractType } from '@snx-v3/useCoreProxy';
import { z } from 'zod';
import { useMemo } from 'react';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';
import { useExternalMulticall, MulticallContractType } from '../useExternalMulticall';
import { useNetwork } from '@snx-v3/useBlockchain';

const CollateralConfigurationSchema = z.object({
  depositingEnabled: z.boolean(),
  issuanceRatioD18: ZodBigNumber.transform((x) => wei(x)),
  liquidationRatioD18: ZodBigNumber.transform((x) => wei(x)),
  liquidationRewardD18: ZodBigNumber.transform((x) => wei(x)),
  oracleNodeId: z.string(),
  tokenAddress: z.string().startsWith('0x'), // As of current version in zod this will be a string: https://github.com/colinhacks/zod/issues/1747
  minDelegationD18: ZodBigNumber.transform((x) => wei(x)),
});

const CollateralTypeSchema = CollateralConfigurationSchema.extend({
  symbol: z.string(),
  displaySymbol: z.string(),
  price: ZodBigNumber.transform((x) => wei(x)),
});

export type CollateralType = z.infer<typeof CollateralTypeSchema>;

const SymbolSchema = z.string();
const ERC20Interface = new utils.Interface(['function symbol() view returns (string)']);

async function loadSymbols({
  MulticallContract,
  tokenConfigs,
}: {
  MulticallContract: MulticallContractType;
  tokenConfigs: z.infer<typeof CollateralConfigurationSchema>[];
}) {
  const calls = tokenConfigs.map((tokenConfig) => ({
    target: tokenConfig.tokenAddress,
    callData: ERC20Interface.encodeFunctionData('symbol'),
  }));
  const multicallResult = await MulticallContract.callStatic.aggregate(calls);
  return multicallResult.returnData.map((bytes) =>
    SymbolSchema.parse(ERC20Interface.decodeFunctionResult('symbol', bytes)[0])
  );
}

const PriceSchema = ZodBigNumber.transform((x) => wei(x));

async function loadPrices({
  CoreProxyContract,
  tokenConfigs,
}: {
  CoreProxyContract: CoreProxyContractType;
  tokenConfigs: z.infer<typeof CollateralConfigurationSchema>[];
}) {
  const calls = tokenConfigs.map((x) =>
    CoreProxyContract.interface.encodeFunctionData('getCollateralPrice', [x.tokenAddress])
  );
  const multicallResult = await CoreProxyContract.callStatic.multicall(calls);
  return multicallResult.map((bytes) => {
    const decoded = CoreProxyContract.interface.decodeFunctionResult(
      'getCollateralPrice',
      bytes
    )[0];
    return PriceSchema.parse(decoded);
  });
}

async function loadCollateralTypes({
  CoreProxyContract,
  MulticallContract,
}: {
  CoreProxyContract: CoreProxyContractType;
  MulticallContract: MulticallContractType;
}): Promise<CollateralType[]> {
  const tokenConfigsRaw = (await CoreProxyContract.getCollateralConfigurations(true)) as object[];
  const tokenConfigs = tokenConfigsRaw
    .map((x) => CollateralConfigurationSchema.parse({ ...x }))
    .filter((x) => x.depositingEnabled);

  const [symbols, prices] = await Promise.all([
    loadSymbols({ MulticallContract, tokenConfigs }),
    loadPrices({ CoreProxyContract, tokenConfigs }),
  ]);

  return tokenConfigs.map((config, i) => ({
    depositingEnabled: config.depositingEnabled,
    issuanceRatioD18: config.issuanceRatioD18,
    liquidationRatioD18: config.liquidationRatioD18,
    liquidationRewardD18: config.liquidationRewardD18,
    minDelegationD18: config.minDelegationD18,
    oracleNodeId: config.oracleNodeId,
    tokenAddress: config.tokenAddress,
    price: prices[i],
    symbol: symbols[i],
    displaySymbol: symbols[i] === 'WETH' ? 'ETH' : symbols[i],
  }));
}

export function useCollateralTypes() {
  const network = useNetwork();
  const { data: CoreProxyContract } = useCoreProxy();
  const { data: MulticallContract } = useExternalMulticall();

  return useQuery({
    queryKey: [network.name, 'collateralTypes'],
    queryFn: async () => {
      if (!CoreProxyContract || !MulticallContract)
        throw Error('Query should not be enabled when contracts missing');
      return loadCollateralTypes({ CoreProxyContract, MulticallContract });
    },
    placeholderData: [],
    enabled: Boolean(CoreProxyContract && MulticallContract && network.isSupported),
  });
}

export function useCollateralType(collateralSymbol?: string) {
  const { data: collateralTypes } = useCollateralTypes();
  return useMemo(() => {
    if (!collateralTypes || !collateralTypes?.length) {
      return;
    }
    if (!collateralSymbol) {
      return collateralTypes[0];
    }
    return collateralTypes.find(
      (collateral) => `${collateral.symbol}`.toLowerCase() === `${collateralSymbol}`.toLowerCase()
    );
  }, [collateralTypes, collateralSymbol]);
}
