import PerpsMarketProxy from "../../deployments/perpsMarket/PerpsMarketProxy.json";
import AccountProxy from "../../deployments/perpsMarket/AccountProxy.json";
import PerpsMarketFactoryProxy from "../../deployments/perpsMarket/PerpsMarketFactoryModule.json";
import SpotMarketProxy from "../../deployments/spotMarket/SpotMarketProxy.json";
import SynthTokenModule from "../../deployments/spotMarket/SynthTokenModule.json";

export const contracts = {
  PERPS_MARKET: PerpsMarketProxy,
  SPOT_MARKET: SpotMarketProxy,
  ACCOUNT_PROXY: AccountProxy,
  PERPS_MARKET_FACTORY: PerpsMarketFactoryProxy,
  SYNTH_TOKEN_MODULE: SynthTokenModule,
};
