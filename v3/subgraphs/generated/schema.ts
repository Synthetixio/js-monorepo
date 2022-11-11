// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Pool must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get created_at(): BigInt {
    let value = this.get("created_at");
    return value!.toBigInt();
  }

  set created_at(value: BigInt) {
    this.set("created_at", Value.fromBigInt(value));
  }

  get created_at_block(): BigInt {
    let value = this.get("created_at_block");
    return value!.toBigInt();
  }

  set created_at_block(value: BigInt) {
    this.set("created_at_block", Value.fromBigInt(value));
  }

  get updated_at(): BigInt | null {
    let value = this.get("updated_at");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at");
    } else {
      this.set("updated_at", Value.fromBigInt(<BigInt>value));
    }
  }

  get updated_at_block(): BigInt | null {
    let value = this.get("updated_at_block");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at_block(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at_block");
    } else {
      this.set("updated_at_block", Value.fromBigInt(<BigInt>value));
    }
  }

  get name(): string | null {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (!value) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(<string>value));
    }
  }
}

export class Market extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Market entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Market must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Market", id.toString(), this);
    }
  }

  static load(id: string): Market | null {
    return changetype<Market | null>(store.get("Market", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get created_at(): BigInt {
    let value = this.get("created_at");
    return value!.toBigInt();
  }

  set created_at(value: BigInt) {
    this.set("created_at", Value.fromBigInt(value));
  }

  get created_at_block(): BigInt {
    let value = this.get("created_at_block");
    return value!.toBigInt();
  }

  set created_at_block(value: BigInt) {
    this.set("created_at_block", Value.fromBigInt(value));
  }

  get updated_at(): BigInt | null {
    let value = this.get("updated_at");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at");
    } else {
      this.set("updated_at", Value.fromBigInt(<BigInt>value));
    }
  }

  get updated_at_block(): BigInt | null {
    let value = this.get("updated_at_block");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at_block(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at_block");
    } else {
      this.set("updated_at_block", Value.fromBigInt(<BigInt>value));
    }
  }

  get weight(): BigDecimal | null {
    let value = this.get("weight");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set weight(value: BigDecimal | null) {
    if (!value) {
      this.unset("weight");
    } else {
      this.set("weight", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get usd_deposited(): BigDecimal | null {
    let value = this.get("usd_deposited");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set usd_deposited(value: BigDecimal | null) {
    if (!value) {
      this.unset("usd_deposited");
    } else {
      this.set("usd_deposited", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get usd_withdrawn(): BigDecimal | null {
    let value = this.get("usd_withdrawn");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set usd_withdrawn(value: BigDecimal | null) {
    if (!value) {
      this.unset("usd_withdrawn");
    } else {
      this.set("usd_withdrawn", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get net_issuance(): BigDecimal | null {
    let value = this.get("net_issuance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set net_issuance(value: BigDecimal | null) {
    if (!value) {
      this.unset("net_issuance");
    } else {
      this.set("net_issuance", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get reported_debt(): BigDecimal | null {
    let value = this.get("reported_debt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set reported_debt(value: BigDecimal | null) {
    if (!value) {
      this.unset("reported_debt");
    } else {
      this.set("reported_debt", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get name(): string | null {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (!value) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(<string>value));
    }
  }
}

export class PoolAndMarket extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PoolAndMarket entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PoolAndMarket must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PoolAndMarket", id.toString(), this);
    }
  }

  static load(id: string): PoolAndMarket | null {
    return changetype<PoolAndMarket | null>(store.get("PoolAndMarket", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get market(): string {
    let value = this.get("market");
    return value!.toString();
  }

  set market(value: string) {
    this.set("market", Value.fromString(value));
  }

  get max_debt_share_value(): BigDecimal | null {
    let value = this.get("max_debt_share_value");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set max_debt_share_value(value: BigDecimal | null) {
    if (!value) {
      this.unset("max_debt_share_value");
    } else {
      this.set("max_debt_share_value", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get updated_at(): BigInt | null {
    let value = this.get("updated_at");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at");
    } else {
      this.set("updated_at", Value.fromBigInt(<BigInt>value));
    }
  }

  get updated_at_block(): BigInt | null {
    let value = this.get("updated_at_block");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at_block(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at_block");
    } else {
      this.set("updated_at_block", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class CollateralType extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CollateralType entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CollateralType must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CollateralType", id.toString(), this);
    }
  }

  static load(id: string): CollateralType | null {
    return changetype<CollateralType | null>(store.get("CollateralType", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get depositing_enabled(): boolean {
    let value = this.get("depositing_enabled");
    return value!.toBoolean();
  }

  set depositing_enabled(value: boolean) {
    this.set("depositing_enabled", Value.fromBoolean(value));
  }

  get target_c_ratio(): BigInt {
    let value = this.get("target_c_ratio");
    return value!.toBigInt();
  }

  set target_c_ratio(value: BigInt) {
    this.set("target_c_ratio", Value.fromBigInt(value));
  }

  get minimum_c_ratio(): BigInt {
    let value = this.get("minimum_c_ratio");
    return value!.toBigInt();
  }

  set minimum_c_ratio(value: BigInt) {
    this.set("minimum_c_ratio", Value.fromBigInt(value));
  }

  get liquidation_reward(): BigDecimal {
    let value = this.get("liquidation_reward");
    return value!.toBigDecimal();
  }

  set liquidation_reward(value: BigDecimal) {
    this.set("liquidation_reward", Value.fromBigDecimal(value));
  }

  get created_at(): BigInt {
    let value = this.get("created_at");
    return value!.toBigInt();
  }

  set created_at(value: BigInt) {
    this.set("created_at", Value.fromBigInt(value));
  }

  get created_at_block(): BigInt {
    let value = this.get("created_at_block");
    return value!.toBigInt();
  }

  set created_at_block(value: BigInt) {
    this.set("created_at_block", Value.fromBigInt(value));
  }

  get total_amount_deposited(): BigInt | null {
    let value = this.get("total_amount_deposited");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set total_amount_deposited(value: BigInt | null) {
    if (!value) {
      this.unset("total_amount_deposited");
    } else {
      this.set("total_amount_deposited", Value.fromBigInt(<BigInt>value));
    }
  }

  get updated_at(): BigInt | null {
    let value = this.get("updated_at");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at");
    } else {
      this.set("updated_at", Value.fromBigInt(<BigInt>value));
    }
  }

  get updated_at_block(): BigInt | null {
    let value = this.get("updated_at_block");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at_block(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at_block");
    } else {
      this.set("updated_at_block", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get created_at(): BigInt {
    let value = this.get("created_at");
    return value!.toBigInt();
  }

  set created_at(value: BigInt) {
    this.set("created_at", Value.fromBigInt(value));
  }

  get created_at_block(): BigInt {
    let value = this.get("created_at_block");
    return value!.toBigInt();
  }

  set created_at_block(value: BigInt) {
    this.set("created_at_block", Value.fromBigInt(value));
  }

  get updated_at(): BigInt | null {
    let value = this.get("updated_at");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at");
    } else {
      this.set("updated_at", Value.fromBigInt(<BigInt>value));
    }
  }

  get updated_at_block(): BigInt | null {
    let value = this.get("updated_at_block");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updated_at_block(value: BigInt | null) {
    if (!value) {
      this.unset("updated_at_block");
    } else {
      this.set("updated_at_block", Value.fromBigInt(<BigInt>value));
    }
  }

  get permissions(): string | null {
    let value = this.get("permissions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set permissions(value: string | null) {
    if (!value) {
      this.unset("permissions");
    } else {
      this.set("permissions", Value.fromString(<string>value));
    }
  }
}

export class AccountPermissionUsers extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save AccountPermissionUsers entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type AccountPermissionUsers must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("AccountPermissionUsers", id.toString(), this);
    }
  }

  static load(id: string): AccountPermissionUsers | null {
    return changetype<AccountPermissionUsers | null>(
      store.get("AccountPermissionUsers", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get permissions(): Bytes {
    let value = this.get("permissions");
    return value!.toBytes();
  }

  set permissions(value: Bytes) {
    this.set("permissions", Value.fromBytes(value));
  }
}
