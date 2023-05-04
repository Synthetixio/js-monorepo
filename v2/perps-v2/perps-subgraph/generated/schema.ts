// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from '@graphprotocol/graph-ts';

export class PositionLiquidated extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save PositionLiquidated entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PositionLiquidated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('PositionLiquidated', id.toString(), this);
    }
  }

  static load(id: string): PositionLiquidated | null {
    return changetype<PositionLiquidated | null>(store.get('PositionLiquidated', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get trader(): string {
    let value = this.get('trader');
    return value!.toString();
  }

  set trader(value: string) {
    this.set('trader', Value.fromString(value));
  }

  get market(): string {
    let value = this.get('market');
    return value!.toString();
  }

  set market(value: string) {
    this.set('market', Value.fromString(value));
  }

  get liquidator(): Bytes {
    let value = this.get('liquidator');
    return value!.toBytes();
  }

  set liquidator(value: Bytes) {
    this.set('liquidator', Value.fromBytes(value));
  }

  get size(): BigInt {
    let value = this.get('size');
    return value!.toBigInt();
  }

  set size(value: BigInt) {
    this.set('size', Value.fromBigInt(value));
  }

  get price(): BigInt {
    let value = this.get('price');
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set('price', Value.fromBigInt(value));
  }

  get fee(): BigInt {
    let value = this.get('fee');
    return value!.toBigInt();
  }

  set fee(value: BigInt) {
    this.set('fee', Value.fromBigInt(value));
  }

  get futuresPosition(): string {
    let value = this.get('futuresPosition');
    return value!.toString();
  }

  set futuresPosition(value: string) {
    this.set('futuresPosition', Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get('timestamp');
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set('timestamp', Value.fromBigInt(value));
  }

  get txHash(): string {
    let value = this.get('txHash');
    return value!.toString();
  }

  set txHash(value: string) {
    this.set('txHash', Value.fromString(value));
  }
}

export class PositionFlagged extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save PositionFlagged entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PositionFlagged must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('PositionFlagged', id.toString(), this);
    }
  }

  static load(id: string): PositionFlagged | null {
    return changetype<PositionFlagged | null>(store.get('PositionFlagged', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get trader(): string {
    let value = this.get('trader');
    return value!.toString();
  }

  set trader(value: string) {
    this.set('trader', Value.fromString(value));
  }

  get flagger(): Bytes {
    let value = this.get('flagger');
    return value!.toBytes();
  }

  set flagger(value: Bytes) {
    this.set('flagger', Value.fromBytes(value));
  }

  get price(): BigInt | null {
    let value = this.get('price');
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set price(value: BigInt | null) {
    if (!value) {
      this.unset('price');
    } else {
      this.set('price', Value.fromBigInt(<BigInt>value));
    }
  }

  get timestamp(): BigInt {
    let value = this.get('timestamp');
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set('timestamp', Value.fromBigInt(value));
  }
}

export class Trader extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save Trader entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Trader must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('Trader', id.toString(), this);
    }
  }

  static load(id: string): Trader | null {
    return changetype<Trader | null>(store.get('Trader', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get createdAt(): BigInt {
    let value = this.get('createdAt');
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set('createdAt', Value.fromBigInt(value));
  }

  get lastTradeTimestamp(): BigInt | null {
    let value = this.get('lastTradeTimestamp');
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set lastTradeTimestamp(value: BigInt | null) {
    if (!value) {
      this.unset('lastTradeTimestamp');
    } else {
      this.set('lastTradeTimestamp', Value.fromBigInt(<BigInt>value));
    }
  }

  get margin(): BigInt {
    let value = this.get('margin');
    return value!.toBigInt();
  }

  set margin(value: BigInt) {
    this.set('margin', Value.fromBigInt(value));
  }

  get totalLiquidations(): BigInt {
    let value = this.get('totalLiquidations');
    return value!.toBigInt();
  }

  set totalLiquidations(value: BigInt) {
    this.set('totalLiquidations', Value.fromBigInt(value));
  }

  get totalMarginLiquidated(): BigInt {
    let value = this.get('totalMarginLiquidated');
    return value!.toBigInt();
  }

  set totalMarginLiquidated(value: BigInt) {
    this.set('totalMarginLiquidated', Value.fromBigInt(value));
  }

  get feesPaidToSynthetix(): BigInt {
    let value = this.get('feesPaidToSynthetix');
    return value!.toBigInt();
  }

  set feesPaidToSynthetix(value: BigInt) {
    this.set('feesPaidToSynthetix', Value.fromBigInt(value));
  }

  get totalVolume(): BigInt {
    let value = this.get('totalVolume');
    return value!.toBigInt();
  }

  set totalVolume(value: BigInt) {
    this.set('totalVolume', Value.fromBigInt(value));
  }

  get realizedPnl(): BigInt {
    let value = this.get('realizedPnl');
    return value!.toBigInt();
  }

  set realizedPnl(value: BigInt) {
    this.set('realizedPnl', Value.fromBigInt(value));
  }

  get trades(): Array<string> {
    let value = this.get('trades');
    return value!.toStringArray();
  }

  set trades(value: Array<string>) {
    this.set('trades', Value.fromStringArray(value));
  }
}

export class FuturesTrade extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save FuturesTrade entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FuturesTrade must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('FuturesTrade', id.toString(), this);
    }
  }

  static load(id: string): FuturesTrade | null {
    return changetype<FuturesTrade | null>(store.get('FuturesTrade', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get('timestamp');
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set('timestamp', Value.fromBigInt(value));
  }

  get trader(): string {
    let value = this.get('trader');
    return value!.toString();
  }

  set trader(value: string) {
    this.set('trader', Value.fromString(value));
  }

  get margin(): BigInt {
    let value = this.get('margin');
    return value!.toBigInt();
  }

  set margin(value: BigInt) {
    this.set('margin', Value.fromBigInt(value));
  }

  get futuresPosition(): string {
    let value = this.get('futuresPosition');
    return value!.toString();
  }

  set futuresPosition(value: string) {
    this.set('futuresPosition', Value.fromString(value));
  }

  get futuresOrder(): string | null {
    let value = this.get('futuresOrder');
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set futuresOrder(value: string | null) {
    if (!value) {
      this.unset('futuresOrder');
    } else {
      this.set('futuresOrder', Value.fromString(<string>value));
    }
  }

  get size(): BigInt {
    let value = this.get('size');
    return value!.toBigInt();
  }

  set size(value: BigInt) {
    this.set('size', Value.fromBigInt(value));
  }

  get market(): string {
    let value = this.get('market');
    return value!.toString();
  }

  set market(value: string) {
    this.set('market', Value.fromString(value));
  }

  get price(): BigInt {
    let value = this.get('price');
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set('price', Value.fromBigInt(value));
  }

  get positionSize(): BigInt {
    let value = this.get('positionSize');
    return value!.toBigInt();
  }

  set positionSize(value: BigInt) {
    this.set('positionSize', Value.fromBigInt(value));
  }

  get positionClosed(): boolean {
    let value = this.get('positionClosed');
    return value!.toBoolean();
  }

  set positionClosed(value: boolean) {
    this.set('positionClosed', Value.fromBoolean(value));
  }

  get realizedPnl(): BigInt {
    let value = this.get('realizedPnl');
    return value!.toBigInt();
  }

  set realizedPnl(value: BigInt) {
    this.set('realizedPnl', Value.fromBigInt(value));
  }

  get netFunding(): BigInt {
    let value = this.get('netFunding');
    return value!.toBigInt();
  }

  set netFunding(value: BigInt) {
    this.set('netFunding', Value.fromBigInt(value));
  }

  get feesPaidToSynthetix(): BigInt {
    let value = this.get('feesPaidToSynthetix');
    return value!.toBigInt();
  }

  set feesPaidToSynthetix(value: BigInt) {
    this.set('feesPaidToSynthetix', Value.fromBigInt(value));
  }

  get type(): string {
    let value = this.get('type');
    return value!.toString();
  }

  set type(value: string) {
    this.set('type', Value.fromString(value));
  }

  get txHash(): string {
    let value = this.get('txHash');
    return value!.toString();
  }

  set txHash(value: string) {
    this.set('txHash', Value.fromString(value));
  }
}

export class DailyMarketStat extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save DailyMarketStat entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DailyMarketStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('DailyMarketStat', id.toString(), this);
    }
  }

  static load(id: string): DailyMarketStat | null {
    return changetype<DailyMarketStat | null>(store.get('DailyMarketStat', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get market(): string {
    let value = this.get('market');
    return value!.toString();
  }

  set market(value: string) {
    this.set('market', Value.fromString(value));
  }

  get day(): string {
    let value = this.get('day');
    return value!.toString();
  }

  set day(value: string) {
    this.set('day', Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get('timestamp');
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set('timestamp', Value.fromBigInt(value));
  }

  get volume(): BigInt {
    let value = this.get('volume');
    return value!.toBigInt();
  }

  set volume(value: BigInt) {
    this.set('volume', Value.fromBigInt(value));
  }

  get cumulativeVolume(): BigInt {
    let value = this.get('cumulativeVolume');
    return value!.toBigInt();
  }

  set cumulativeVolume(value: BigInt) {
    this.set('cumulativeVolume', Value.fromBigInt(value));
  }

  get fees(): BigInt {
    let value = this.get('fees');
    return value!.toBigInt();
  }

  set fees(value: BigInt) {
    this.set('fees', Value.fromBigInt(value));
  }

  get cumulativeFees(): BigInt {
    let value = this.get('cumulativeFees');
    return value!.toBigInt();
  }

  set cumulativeFees(value: BigInt) {
    this.set('cumulativeFees', Value.fromBigInt(value));
  }

  get trades(): BigInt {
    let value = this.get('trades');
    return value!.toBigInt();
  }

  set trades(value: BigInt) {
    this.set('trades', Value.fromBigInt(value));
  }

  get cumulativeTrades(): BigInt {
    let value = this.get('cumulativeTrades');
    return value!.toBigInt();
  }

  set cumulativeTrades(value: BigInt) {
    this.set('cumulativeTrades', Value.fromBigInt(value));
  }
}

export class DailyStat extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save DailyStat entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DailyStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('DailyStat', id.toString(), this);
    }
  }

  static load(id: string): DailyStat | null {
    return changetype<DailyStat | null>(store.get('DailyStat', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get day(): string {
    let value = this.get('day');
    return value!.toString();
  }

  set day(value: string) {
    this.set('day', Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get('timestamp');
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set('timestamp', Value.fromBigInt(value));
  }

  get volume(): BigInt {
    let value = this.get('volume');
    return value!.toBigInt();
  }

  set volume(value: BigInt) {
    this.set('volume', Value.fromBigInt(value));
  }

  get cumulativeVolume(): BigInt {
    let value = this.get('cumulativeVolume');
    return value!.toBigInt();
  }

  set cumulativeVolume(value: BigInt) {
    this.set('cumulativeVolume', Value.fromBigInt(value));
  }

  get fees(): BigInt {
    let value = this.get('fees');
    return value!.toBigInt();
  }

  set fees(value: BigInt) {
    this.set('fees', Value.fromBigInt(value));
  }

  get cumulativeFees(): BigInt {
    let value = this.get('cumulativeFees');
    return value!.toBigInt();
  }

  set cumulativeFees(value: BigInt) {
    this.set('cumulativeFees', Value.fromBigInt(value));
  }

  get trades(): BigInt {
    let value = this.get('trades');
    return value!.toBigInt();
  }

  set trades(value: BigInt) {
    this.set('trades', Value.fromBigInt(value));
  }

  get cumulativeTrades(): BigInt {
    let value = this.get('cumulativeTrades');
    return value!.toBigInt();
  }

  set cumulativeTrades(value: BigInt) {
    this.set('cumulativeTrades', Value.fromBigInt(value));
  }

  get newTraders(): BigInt {
    let value = this.get('newTraders');
    return value!.toBigInt();
  }

  set newTraders(value: BigInt) {
    this.set('newTraders', Value.fromBigInt(value));
  }

  get existingTraders(): BigInt {
    let value = this.get('existingTraders');
    return value!.toBigInt();
  }

  set existingTraders(value: BigInt) {
    this.set('existingTraders', Value.fromBigInt(value));
  }

  get cumulativeTraders(): BigInt {
    let value = this.get('cumulativeTraders');
    return value!.toBigInt();
  }

  set cumulativeTraders(value: BigInt) {
    this.set('cumulativeTraders', Value.fromBigInt(value));
  }
}

export class CumulativeMarketStat extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save CumulativeMarketStat entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CumulativeMarketStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('CumulativeMarketStat', id.toString(), this);
    }
  }

  static load(id: string): CumulativeMarketStat | null {
    return changetype<CumulativeMarketStat | null>(store.get('CumulativeMarketStat', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get market(): string {
    let value = this.get('market');
    return value!.toString();
  }

  set market(value: string) {
    this.set('market', Value.fromString(value));
  }

  get cumulativeFees(): BigInt {
    let value = this.get('cumulativeFees');
    return value!.toBigInt();
  }

  set cumulativeFees(value: BigInt) {
    this.set('cumulativeFees', Value.fromBigInt(value));
  }

  get cumulativeVolume(): BigInt {
    let value = this.get('cumulativeVolume');
    return value!.toBigInt();
  }

  set cumulativeVolume(value: BigInt) {
    this.set('cumulativeVolume', Value.fromBigInt(value));
  }

  get cumulativeTrades(): BigInt {
    let value = this.get('cumulativeTrades');
    return value!.toBigInt();
  }

  set cumulativeTrades(value: BigInt) {
    this.set('cumulativeTrades', Value.fromBigInt(value));
  }
}

export class Synthetix extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save Synthetix entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Synthetix must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('Synthetix', id.toString(), this);
    }
  }

  static load(id: string): Synthetix | null {
    return changetype<Synthetix | null>(store.get('Synthetix', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get feesByLiquidations(): BigInt {
    let value = this.get('feesByLiquidations');
    return value!.toBigInt();
  }

  set feesByLiquidations(value: BigInt) {
    this.set('feesByLiquidations', Value.fromBigInt(value));
  }

  get feesByPositionModifications(): BigInt {
    let value = this.get('feesByPositionModifications');
    return value!.toBigInt();
  }

  set feesByPositionModifications(value: BigInt) {
    this.set('feesByPositionModifications', Value.fromBigInt(value));
  }

  get totalLiquidations(): BigInt {
    let value = this.get('totalLiquidations');
    return value!.toBigInt();
  }

  set totalLiquidations(value: BigInt) {
    this.set('totalLiquidations', Value.fromBigInt(value));
  }

  get totalVolume(): BigInt {
    let value = this.get('totalVolume');
    return value!.toBigInt();
  }

  set totalVolume(value: BigInt) {
    this.set('totalVolume', Value.fromBigInt(value));
  }

  get totalTraders(): BigInt {
    let value = this.get('totalTraders');
    return value!.toBigInt();
  }

  set totalTraders(value: BigInt) {
    this.set('totalTraders', Value.fromBigInt(value));
  }

  get totalTrades(): BigInt {
    let value = this.get('totalTrades');
    return value!.toBigInt();
  }

  set totalTrades(value: BigInt) {
    this.set('totalTrades', Value.fromBigInt(value));
  }
}

export class FuturesPosition extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save FuturesPosition entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FuturesPosition must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('FuturesPosition', id.toString(), this);
    }
  }

  static load(id: string): FuturesPosition | null {
    return changetype<FuturesPosition | null>(store.get('FuturesPosition', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get trader(): string {
    let value = this.get('trader');
    return value!.toString();
  }

  set trader(value: string) {
    this.set('trader', Value.fromString(value));
  }

  get openTimestamp(): BigInt {
    let value = this.get('openTimestamp');
    return value!.toBigInt();
  }

  set openTimestamp(value: BigInt) {
    this.set('openTimestamp', Value.fromBigInt(value));
  }

  get closeTimestamp(): BigInt | null {
    let value = this.get('closeTimestamp');
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set closeTimestamp(value: BigInt | null) {
    if (!value) {
      this.unset('closeTimestamp');
    } else {
      this.set('closeTimestamp', Value.fromBigInt(<BigInt>value));
    }
  }

  get long(): boolean {
    let value = this.get('long');
    return value!.toBoolean();
  }

  set long(value: boolean) {
    this.set('long', Value.fromBoolean(value));
  }

  get market(): string {
    let value = this.get('market');
    return value!.toString();
  }

  set market(value: string) {
    this.set('market', Value.fromString(value));
  }

  get isOpen(): boolean {
    let value = this.get('isOpen');
    return value!.toBoolean();
  }

  set isOpen(value: boolean) {
    this.set('isOpen', Value.fromBoolean(value));
  }

  get isLiquidated(): boolean {
    let value = this.get('isLiquidated');
    return value!.toBoolean();
  }

  set isLiquidated(value: boolean) {
    this.set('isLiquidated', Value.fromBoolean(value));
  }

  get trades(): BigInt {
    let value = this.get('trades');
    return value!.toBigInt();
  }

  set trades(value: BigInt) {
    this.set('trades', Value.fromBigInt(value));
  }

  get feesPaidToSynthetix(): BigInt {
    let value = this.get('feesPaidToSynthetix');
    return value!.toBigInt();
  }

  set feesPaidToSynthetix(value: BigInt) {
    this.set('feesPaidToSynthetix', Value.fromBigInt(value));
  }

  get size(): BigInt {
    let value = this.get('size');
    return value!.toBigInt();
  }

  set size(value: BigInt) {
    this.set('size', Value.fromBigInt(value));
  }

  get initialMargin(): BigInt {
    let value = this.get('initialMargin');
    return value!.toBigInt();
  }

  set initialMargin(value: BigInt) {
    this.set('initialMargin', Value.fromBigInt(value));
  }

  get leverage(): BigInt {
    let value = this.get('leverage');
    return value!.toBigInt();
  }

  set leverage(value: BigInt) {
    this.set('leverage', Value.fromBigInt(value));
  }

  get netFunding(): BigInt {
    let value = this.get('netFunding');
    return value!.toBigInt();
  }

  set netFunding(value: BigInt) {
    this.set('netFunding', Value.fromBigInt(value));
  }

  get margin(): BigInt {
    let value = this.get('margin');
    return value!.toBigInt();
  }

  set margin(value: BigInt) {
    this.set('margin', Value.fromBigInt(value));
  }

  get realizedPnl(): BigInt {
    let value = this.get('realizedPnl');
    return value!.toBigInt();
  }

  set realizedPnl(value: BigInt) {
    this.set('realizedPnl', Value.fromBigInt(value));
  }

  get unrealizedPnl(): BigInt {
    let value = this.get('unrealizedPnl');
    return value!.toBigInt();
  }

  set unrealizedPnl(value: BigInt) {
    this.set('unrealizedPnl', Value.fromBigInt(value));
  }

  get fundingIndex(): BigInt {
    let value = this.get('fundingIndex');
    return value!.toBigInt();
  }

  set fundingIndex(value: BigInt) {
    this.set('fundingIndex', Value.fromBigInt(value));
  }

  get totalVolume(): BigInt {
    let value = this.get('totalVolume');
    return value!.toBigInt();
  }

  set totalVolume(value: BigInt) {
    this.set('totalVolume', Value.fromBigInt(value));
  }

  get entryPrice(): BigInt {
    let value = this.get('entryPrice');
    return value!.toBigInt();
  }

  set entryPrice(value: BigInt) {
    this.set('entryPrice', Value.fromBigInt(value));
  }

  get netTransfers(): BigInt {
    let value = this.get('netTransfers');
    return value!.toBigInt();
  }

  set netTransfers(value: BigInt) {
    this.set('netTransfers', Value.fromBigInt(value));
  }

  get lastPrice(): BigInt {
    let value = this.get('lastPrice');
    return value!.toBigInt();
  }

  set lastPrice(value: BigInt) {
    this.set('lastPrice', Value.fromBigInt(value));
  }

  get avgEntryPrice(): BigInt {
    let value = this.get('avgEntryPrice');
    return value!.toBigInt();
  }

  set avgEntryPrice(value: BigInt) {
    this.set('avgEntryPrice', Value.fromBigInt(value));
  }

  get txHash(): string {
    let value = this.get('txHash');
    return value!.toString();
  }

  set txHash(value: string) {
    this.set('txHash', Value.fromString(value));
  }

  get exitPrice(): BigInt | null {
    let value = this.get('exitPrice');
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set exitPrice(value: BigInt | null) {
    if (!value) {
      this.unset('exitPrice');
    } else {
      this.set('exitPrice', Value.fromBigInt(<BigInt>value));
    }
  }

  get skew(): BigInt | null {
    let value = this.get('skew');
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set skew(value: BigInt | null) {
    if (!value) {
      this.unset('skew');
    } else {
      this.set('skew', Value.fromBigInt(<BigInt>value));
    }
  }
}

export class FuturesOrder extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save FuturesOrder entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FuturesOrder must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('FuturesOrder', id.toString(), this);
    }
  }

  static load(id: string): FuturesOrder | null {
    return changetype<FuturesOrder | null>(store.get('FuturesOrder', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get size(): BigInt {
    let value = this.get('size');
    return value!.toBigInt();
  }

  set size(value: BigInt) {
    this.set('size', Value.fromBigInt(value));
  }

  get market(): string {
    let value = this.get('market');
    return value!.toString();
  }

  set market(value: string) {
    this.set('market', Value.fromString(value));
  }

  get trader(): string {
    let value = this.get('trader');
    return value!.toString();
  }

  set trader(value: string) {
    this.set('trader', Value.fromString(value));
  }

  get orderId(): BigInt {
    let value = this.get('orderId');
    return value!.toBigInt();
  }

  set orderId(value: BigInt) {
    this.set('orderId', Value.fromBigInt(value));
  }

  get targetRoundId(): BigInt {
    let value = this.get('targetRoundId');
    return value!.toBigInt();
  }

  set targetRoundId(value: BigInt) {
    this.set('targetRoundId', Value.fromBigInt(value));
  }

  get targetPrice(): BigInt {
    let value = this.get('targetPrice');
    return value!.toBigInt();
  }

  set targetPrice(value: BigInt) {
    this.set('targetPrice', Value.fromBigInt(value));
  }

  get marginDelta(): BigInt {
    let value = this.get('marginDelta');
    return value!.toBigInt();
  }

  set marginDelta(value: BigInt) {
    this.set('marginDelta', Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get('timestamp');
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set('timestamp', Value.fromBigInt(value));
  }

  get orderType(): string {
    let value = this.get('orderType');
    return value!.toString();
  }

  set orderType(value: string) {
    this.set('orderType', Value.fromString(value));
  }

  get status(): string {
    let value = this.get('status');
    return value!.toString();
  }

  set status(value: string) {
    this.set('status', Value.fromString(value));
  }

  get fee(): BigInt {
    let value = this.get('fee');
    return value!.toBigInt();
  }

  set fee(value: BigInt) {
    this.set('fee', Value.fromBigInt(value));
  }

  get keeper(): Bytes {
    let value = this.get('keeper');
    return value!.toBytes();
  }

  set keeper(value: Bytes) {
    this.set('keeper', Value.fromBytes(value));
  }

  get futuresPosition(): string | null {
    let value = this.get('futuresPosition');
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set futuresPosition(value: string | null) {
    if (!value) {
      this.unset('futuresPosition');
    } else {
      this.set('futuresPosition', Value.fromString(<string>value));
    }
  }

  get txHash(): string {
    let value = this.get('txHash');
    return value!.toString();
  }

  set txHash(value: string) {
    this.set('txHash', Value.fromString(value));
  }
}

export class FundingRateUpdate extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save FundingRateUpdate entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FundingRateUpdate must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('FundingRateUpdate', id.toString(), this);
    }
  }

  static load(id: string): FundingRateUpdate | null {
    return changetype<FundingRateUpdate | null>(store.get('FundingRateUpdate', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get('timestamp');
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set('timestamp', Value.fromBigInt(value));
  }

  get market(): string {
    let value = this.get('market');
    return value!.toString();
  }

  set market(value: string) {
    this.set('market', Value.fromString(value));
  }

  get fundingRate(): BigInt {
    let value = this.get('fundingRate');
    return value!.toBigInt();
  }

  set fundingRate(value: BigInt) {
    this.set('fundingRate', Value.fromBigInt(value));
  }

  get funding(): BigInt {
    let value = this.get('funding');
    return value!.toBigInt();
  }

  set funding(value: BigInt) {
    this.set('funding', Value.fromBigInt(value));
  }

  get index(): BigInt {
    let value = this.get('index');
    return value!.toBigInt();
  }

  set index(value: BigInt) {
    this.set('index', Value.fromBigInt(value));
  }
}

export class FuturesMarginTransfer extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save FuturesMarginTransfer entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FuturesMarginTransfer must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('FuturesMarginTransfer', id.toString(), this);
    }
  }

  static load(id: string): FuturesMarginTransfer | null {
    return changetype<FuturesMarginTransfer | null>(store.get('FuturesMarginTransfer', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get('timestamp');
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set('timestamp', Value.fromBigInt(value));
  }

  get trader(): string {
    let value = this.get('trader');
    return value!.toString();
  }

  set trader(value: string) {
    this.set('trader', Value.fromString(value));
  }

  get market(): string {
    let value = this.get('market');
    return value!.toString();
  }

  set market(value: string) {
    this.set('market', Value.fromString(value));
  }

  get size(): BigInt {
    let value = this.get('size');
    return value!.toBigInt();
  }

  set size(value: BigInt) {
    this.set('size', Value.fromBigInt(value));
  }

  get txHash(): string {
    let value = this.get('txHash');
    return value!.toString();
  }

  set txHash(value: string) {
    this.set('txHash', Value.fromString(value));
  }
}

export class FuturesMarket extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save FuturesMarket entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FuturesMarket must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('FuturesMarket', id.toString(), this);
    }
  }

  static load(id: string): FuturesMarket | null {
    return changetype<FuturesMarket | null>(store.get('FuturesMarket', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get asset(): Bytes {
    let value = this.get('asset');
    return value!.toBytes();
  }

  set asset(value: Bytes) {
    this.set('asset', Value.fromBytes(value));
  }

  get marketKey(): Bytes {
    let value = this.get('marketKey');
    return value!.toBytes();
  }

  set marketKey(value: Bytes) {
    this.set('marketKey', Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get('timestamp');
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set('timestamp', Value.fromBigInt(value));
  }

  get isActive(): boolean {
    let value = this.get('isActive');
    return value!.toBoolean();
  }

  set isActive(value: boolean) {
    this.set('isActive', Value.fromBoolean(value));
  }
}

export class Frontend extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id != null, 'Cannot save Frontend entity without an ID');
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Frontend must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set('Frontend', id.toString(), this);
    }
  }

  static load(id: string): Frontend | null {
    return changetype<Frontend | null>(store.get('Frontend', id));
  }

  get id(): string {
    let value = this.get('id');
    return value!.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get markets(): Array<string> {
    let value = this.get('markets');
    return value!.toStringArray();
  }

  set markets(value: Array<string>) {
    this.set('markets', Value.fromStringArray(value));
  }

  get amount(): BigInt {
    let value = this.get('amount');
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set('amount', Value.fromBigInt(value));
  }

  get fees(): BigInt {
    let value = this.get('fees');
    return value!.toBigInt();
  }

  set fees(value: BigInt) {
    this.set('fees', Value.fromBigInt(value));
  }
}
