import type {
  ExternalProvider,
  FallbackProvider,
  InfuraProvider,
  Networkish,
  Web3Provider,
} from '@ethersproject/providers';

export type ProviderConfig = {
  networkId?: Networkish;
  infuraId?: string;
  alchemyId?: string;
  provider?: ExternalProvider;
};

export type SynthetixProvider = Web3Provider | InfuraProvider | FallbackProvider;
