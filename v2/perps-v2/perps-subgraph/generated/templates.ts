// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { Address, DataSourceTemplate, DataSourceContext } from '@graphprotocol/graph-ts';

export class AggregatorProxy extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create('AggregatorProxy', [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext('AggregatorProxy', [address.toHex()], context);
  }
}

export class Aggregator extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create('Aggregator', [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext('Aggregator', [address.toHex()], context);
  }
}

export class PerpetualFuturesMarket extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create('PerpetualFuturesMarket', [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext('PerpetualFuturesMarket', [address.toHex()], context);
  }
}
