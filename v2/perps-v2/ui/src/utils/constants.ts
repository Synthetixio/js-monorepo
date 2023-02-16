export const OPTIMISM_GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/kwenta/optimism-perps';

export const PERPS_V2_DASHBOARD_GRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/fritzschoff/perps-dashboard';

export class PerpMarkets {
  private asset: string = '';
  private market: string = '';
  private address: string = '';
  constructor(asset: string, market: string, address: string) {
    asset = asset;
    market = market;
    address = address;
  }

  getAddress(): string {
    return this.address;
  }
  getMarket(): string {
    return this.market;
  }
  getAsset(): string {
    return this.asset;
  }
}
