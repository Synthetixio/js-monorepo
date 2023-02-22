import type { FuturesTrades } from './queries/futures-trades';
import type { PositionLiquidated } from './queries/liquidation';
import type { DelayedOrder } from './queries/delayed-orders';
export interface EventType extends FuturesTrades, DelayedOrder, PositionLiquidated {}
