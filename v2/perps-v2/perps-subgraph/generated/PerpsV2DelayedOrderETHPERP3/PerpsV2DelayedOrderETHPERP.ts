// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from '@graphprotocol/graph-ts';

export class CacheUpdated extends ethereum.Event {
  get params(): CacheUpdated__Params {
    return new CacheUpdated__Params(this);
  }
}

export class CacheUpdated__Params {
  _event: CacheUpdated;

  constructor(event: CacheUpdated) {
    this._event = event;
  }

  get name(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get destination(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class DelayedOrderRemoved extends ethereum.Event {
  get params(): DelayedOrderRemoved__Params {
    return new DelayedOrderRemoved__Params(this);
  }
}

export class DelayedOrderRemoved__Params {
  _event: DelayedOrderRemoved;

  constructor(event: DelayedOrderRemoved) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get isOffchain(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }

  get currentRoundId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get sizeDelta(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get targetRoundId(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get commitDeposit(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get keeperDeposit(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get trackingCode(): Bytes {
    return this._event.parameters[7].value.toBytes();
  }
}

export class DelayedOrderSubmitted extends ethereum.Event {
  get params(): DelayedOrderSubmitted__Params {
    return new DelayedOrderSubmitted__Params(this);
  }
}

export class DelayedOrderSubmitted__Params {
  _event: DelayedOrderSubmitted;

  constructor(event: DelayedOrderSubmitted) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get isOffchain(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }

  get sizeDelta(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get targetRoundId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get intentionTime(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get executableAtTime(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get commitDeposit(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get keeperDeposit(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get trackingCode(): Bytes {
    return this._event.parameters[8].value.toBytes();
  }
}

export class FundingRecomputed extends ethereum.Event {
  get params(): FundingRecomputed__Params {
    return new FundingRecomputed__Params(this);
  }
}

export class FundingRecomputed__Params {
  _event: FundingRecomputed;

  constructor(event: FundingRecomputed) {
    this._event = event;
  }

  get funding(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get fundingRate(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get index(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class MarginTransferred extends ethereum.Event {
  get params(): MarginTransferred__Params {
    return new MarginTransferred__Params(this);
  }
}

export class MarginTransferred__Params {
  _event: MarginTransferred;

  constructor(event: MarginTransferred) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get marginDelta(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OwnerChanged extends ethereum.Event {
  get params(): OwnerChanged__Params {
    return new OwnerChanged__Params(this);
  }
}

export class OwnerChanged__Params {
  _event: OwnerChanged;

  constructor(event: OwnerChanged) {
    this._event = event;
  }

  get oldOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnerNominated extends ethereum.Event {
  get params(): OwnerNominated__Params {
    return new OwnerNominated__Params(this);
  }
}

export class OwnerNominated__Params {
  _event: OwnerNominated;

  constructor(event: OwnerNominated) {
    this._event = event;
  }

  get newOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class PerpsTracking extends ethereum.Event {
  get params(): PerpsTracking__Params {
    return new PerpsTracking__Params(this);
  }
}

export class PerpsTracking__Params {
  _event: PerpsTracking;

  constructor(event: PerpsTracking) {
    this._event = event;
  }

  get trackingCode(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get baseAsset(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get marketKey(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get sizeDelta(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get fee(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class PositionLiquidated extends ethereum.Event {
  get params(): PositionLiquidated__Params {
    return new PositionLiquidated__Params(this);
  }
}

export class PositionLiquidated__Params {
  _event: PositionLiquidated;

  constructor(event: PositionLiquidated) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get liquidator(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get size(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get fee(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class PositionModified extends ethereum.Event {
  get params(): PositionModified__Params {
    return new PositionModified__Params(this);
  }
}

export class PositionModified__Params {
  _event: PositionModified;

  constructor(event: PositionModified) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get margin(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get size(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get tradeSize(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get lastPrice(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get fundingIndex(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get fee(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class ProxyUpdated extends ethereum.Event {
  get params(): ProxyUpdated__Params {
    return new ProxyUpdated__Params(this);
  }
}

export class ProxyUpdated__Params {
  _event: ProxyUpdated;

  constructor(event: ProxyUpdated) {
    this._event = event;
  }

  get proxyAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class PerpsV2DelayedOrderETHPERP__delayedOrdersResultValue0Struct extends ethereum.Tuple {
  get isOffchain(): boolean {
    return this[0].toBoolean();
  }

  get sizeDelta(): BigInt {
    return this[1].toBigInt();
  }

  get priceImpactDelta(): BigInt {
    return this[2].toBigInt();
  }

  get targetRoundId(): BigInt {
    return this[3].toBigInt();
  }

  get commitDeposit(): BigInt {
    return this[4].toBigInt();
  }

  get keeperDeposit(): BigInt {
    return this[5].toBigInt();
  }

  get executableAtTime(): BigInt {
    return this[6].toBigInt();
  }

  get intentionTime(): BigInt {
    return this[7].toBigInt();
  }

  get trackingCode(): Bytes {
    return this[8].toBytes();
  }
}

export class PerpsV2DelayedOrderETHPERP extends ethereum.SmartContract {
  static bind(address: Address): PerpsV2DelayedOrderETHPERP {
    return new PerpsV2DelayedOrderETHPERP('PerpsV2DelayedOrderETHPERP', address);
  }

  delayedOrders(account: Address): PerpsV2DelayedOrderETHPERP__delayedOrdersResultValue0Struct {
    let result = super.call(
      'delayedOrders',
      'delayedOrders(address):((bool,int128,uint128,uint128,uint128,uint128,uint256,uint256,bytes32))',
      [ethereum.Value.fromAddress(account)]
    );

    return changetype<PerpsV2DelayedOrderETHPERP__delayedOrdersResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_delayedOrders(
    account: Address
  ): ethereum.CallResult<PerpsV2DelayedOrderETHPERP__delayedOrdersResultValue0Struct> {
    let result = super.tryCall(
      'delayedOrders',
      'delayedOrders(address):((bool,int128,uint128,uint128,uint128,uint128,uint256,uint256,bytes32))',
      [ethereum.Value.fromAddress(account)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<PerpsV2DelayedOrderETHPERP__delayedOrdersResultValue0Struct>(value[0].toTuple())
    );
  }

  isResolverCached(): boolean {
    let result = super.call('isResolverCached', 'isResolverCached():(bool)', []);

    return result[0].toBoolean();
  }

  try_isResolverCached(): ethereum.CallResult<boolean> {
    let result = super.tryCall('isResolverCached', 'isResolverCached():(bool)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  marketState(): Address {
    let result = super.call('marketState', 'marketState():(address)', []);

    return result[0].toAddress();
  }

  try_marketState(): ethereum.CallResult<Address> {
    let result = super.tryCall('marketState', 'marketState():(address)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  messageSender(): Address {
    let result = super.call('messageSender', 'messageSender():(address)', []);

    return result[0].toAddress();
  }

  try_messageSender(): ethereum.CallResult<Address> {
    let result = super.tryCall('messageSender', 'messageSender():(address)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  nominatedOwner(): Address {
    let result = super.call('nominatedOwner', 'nominatedOwner():(address)', []);

    return result[0].toAddress();
  }

  try_nominatedOwner(): ethereum.CallResult<Address> {
    let result = super.tryCall('nominatedOwner', 'nominatedOwner():(address)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call('owner', 'owner():(address)', []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall('owner', 'owner():(address)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proxy(): Address {
    let result = super.call('proxy', 'proxy():(address)', []);

    return result[0].toAddress();
  }

  try_proxy(): ethereum.CallResult<Address> {
    let result = super.tryCall('proxy', 'proxy():(address)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  resolver(): Address {
    let result = super.call('resolver', 'resolver():(address)', []);

    return result[0].toAddress();
  }

  try_resolver(): ethereum.CallResult<Address> {
    let result = super.tryCall('resolver', 'resolver():(address)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  resolverAddressesRequired(): Array<Bytes> {
    let result = super.call(
      'resolverAddressesRequired',
      'resolverAddressesRequired():(bytes32[])',
      []
    );

    return result[0].toBytesArray();
  }

  try_resolverAddressesRequired(): ethereum.CallResult<Array<Bytes>> {
    let result = super.tryCall(
      'resolverAddressesRequired',
      'resolverAddressesRequired():(bytes32[])',
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytesArray());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _proxy(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _marketState(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _owner(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _resolver(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall extends ethereum.Call {
  get inputs(): AcceptOwnershipCall__Inputs {
    return new AcceptOwnershipCall__Inputs(this);
  }

  get outputs(): AcceptOwnershipCall__Outputs {
    return new AcceptOwnershipCall__Outputs(this);
  }
}

export class AcceptOwnershipCall__Inputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall__Outputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class CancelDelayedOrderCall extends ethereum.Call {
  get inputs(): CancelDelayedOrderCall__Inputs {
    return new CancelDelayedOrderCall__Inputs(this);
  }

  get outputs(): CancelDelayedOrderCall__Outputs {
    return new CancelDelayedOrderCall__Outputs(this);
  }
}

export class CancelDelayedOrderCall__Inputs {
  _call: CancelDelayedOrderCall;

  constructor(call: CancelDelayedOrderCall) {
    this._call = call;
  }

  get account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class CancelDelayedOrderCall__Outputs {
  _call: CancelDelayedOrderCall;

  constructor(call: CancelDelayedOrderCall) {
    this._call = call;
  }
}

export class ExecuteDelayedOrderCall extends ethereum.Call {
  get inputs(): ExecuteDelayedOrderCall__Inputs {
    return new ExecuteDelayedOrderCall__Inputs(this);
  }

  get outputs(): ExecuteDelayedOrderCall__Outputs {
    return new ExecuteDelayedOrderCall__Outputs(this);
  }
}

export class ExecuteDelayedOrderCall__Inputs {
  _call: ExecuteDelayedOrderCall;

  constructor(call: ExecuteDelayedOrderCall) {
    this._call = call;
  }

  get account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ExecuteDelayedOrderCall__Outputs {
  _call: ExecuteDelayedOrderCall;

  constructor(call: ExecuteDelayedOrderCall) {
    this._call = call;
  }
}

export class NominateNewOwnerCall extends ethereum.Call {
  get inputs(): NominateNewOwnerCall__Inputs {
    return new NominateNewOwnerCall__Inputs(this);
  }

  get outputs(): NominateNewOwnerCall__Outputs {
    return new NominateNewOwnerCall__Outputs(this);
  }
}

export class NominateNewOwnerCall__Inputs {
  _call: NominateNewOwnerCall;

  constructor(call: NominateNewOwnerCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class NominateNewOwnerCall__Outputs {
  _call: NominateNewOwnerCall;

  constructor(call: NominateNewOwnerCall) {
    this._call = call;
  }
}

export class RebuildCacheCall extends ethereum.Call {
  get inputs(): RebuildCacheCall__Inputs {
    return new RebuildCacheCall__Inputs(this);
  }

  get outputs(): RebuildCacheCall__Outputs {
    return new RebuildCacheCall__Outputs(this);
  }
}

export class RebuildCacheCall__Inputs {
  _call: RebuildCacheCall;

  constructor(call: RebuildCacheCall) {
    this._call = call;
  }
}

export class RebuildCacheCall__Outputs {
  _call: RebuildCacheCall;

  constructor(call: RebuildCacheCall) {
    this._call = call;
  }
}

export class SetMessageSenderCall extends ethereum.Call {
  get inputs(): SetMessageSenderCall__Inputs {
    return new SetMessageSenderCall__Inputs(this);
  }

  get outputs(): SetMessageSenderCall__Outputs {
    return new SetMessageSenderCall__Outputs(this);
  }
}

export class SetMessageSenderCall__Inputs {
  _call: SetMessageSenderCall;

  constructor(call: SetMessageSenderCall) {
    this._call = call;
  }

  get sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMessageSenderCall__Outputs {
  _call: SetMessageSenderCall;

  constructor(call: SetMessageSenderCall) {
    this._call = call;
  }
}

export class SetProxyCall extends ethereum.Call {
  get inputs(): SetProxyCall__Inputs {
    return new SetProxyCall__Inputs(this);
  }

  get outputs(): SetProxyCall__Outputs {
    return new SetProxyCall__Outputs(this);
  }
}

export class SetProxyCall__Inputs {
  _call: SetProxyCall;

  constructor(call: SetProxyCall) {
    this._call = call;
  }

  get _proxy(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetProxyCall__Outputs {
  _call: SetProxyCall;

  constructor(call: SetProxyCall) {
    this._call = call;
  }
}

export class SubmitDelayedOrderCall extends ethereum.Call {
  get inputs(): SubmitDelayedOrderCall__Inputs {
    return new SubmitDelayedOrderCall__Inputs(this);
  }

  get outputs(): SubmitDelayedOrderCall__Outputs {
    return new SubmitDelayedOrderCall__Outputs(this);
  }
}

export class SubmitDelayedOrderCall__Inputs {
  _call: SubmitDelayedOrderCall;

  constructor(call: SubmitDelayedOrderCall) {
    this._call = call;
  }

  get sizeDelta(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get priceImpactDelta(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get desiredTimeDelta(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SubmitDelayedOrderCall__Outputs {
  _call: SubmitDelayedOrderCall;

  constructor(call: SubmitDelayedOrderCall) {
    this._call = call;
  }
}

export class SubmitDelayedOrderWithTrackingCall extends ethereum.Call {
  get inputs(): SubmitDelayedOrderWithTrackingCall__Inputs {
    return new SubmitDelayedOrderWithTrackingCall__Inputs(this);
  }

  get outputs(): SubmitDelayedOrderWithTrackingCall__Outputs {
    return new SubmitDelayedOrderWithTrackingCall__Outputs(this);
  }
}

export class SubmitDelayedOrderWithTrackingCall__Inputs {
  _call: SubmitDelayedOrderWithTrackingCall;

  constructor(call: SubmitDelayedOrderWithTrackingCall) {
    this._call = call;
  }

  get sizeDelta(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get priceImpactDelta(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get desiredTimeDelta(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get trackingCode(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SubmitDelayedOrderWithTrackingCall__Outputs {
  _call: SubmitDelayedOrderWithTrackingCall;

  constructor(call: SubmitDelayedOrderWithTrackingCall) {
    this._call = call;
  }
}
