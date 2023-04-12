import Wei from '@synthetixio/wei';
import { z } from 'zod';

export interface SubgraphPositionData {
  market: string;
  asset: string;
  avgEntryPrice: Wei;
  leverage: Wei;
  fees: Wei;
  realizedPnlAtLastModification: Wei;
  unrealizedPnlAtLastModification: Wei;
  netFundingAtLastModification: Wei;
  fillPriceAtLastInteraction: Wei;
}

export interface ContractData {
  skew: Wei;
  skewScale: Wei;
  indexPrice: Wei;
  size: Wei;
  liquidationPrice: Wei;
  accessibleMargin: Wei;
  remainingMargin: Wei;
  accruedFundingSinceLastModification: Wei;
}

const ZodWei = z.custom<Wei>((x) => Wei.is(x));

export const PositionDataSchema = z.object({
  asset: z.string(),
  indexPrice: ZodWei,
  liquidationPrice: ZodWei,
  unrealizedPnl: ZodWei,
  realizedPnl: ZodWei,
  pnlPercentage: ZodWei,
  remainingMargin: ZodWei,
  size: ZodWei,
  long: z.boolean(),
  avgEntryPrice: ZodWei,
  leverage: ZodWei,
  fees: ZodWei,
  funding: ZodWei,
  marketPrice: ZodWei,
  notionalValue: ZodWei,
  address: z.string(),
});
export const PositionsDataSchema = z.array(PositionDataSchema);
