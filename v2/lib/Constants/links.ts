export const PROD_HOSTNAME = 'staking.synthetix.eth.limo';

export const EXTERNAL_LINKS = {
  Synthetix: {
    Docs: 'https://docs.synthetix.io/',
    Litepaper: 'https://docs.synthetix.io/litepaper/',
    Incentives: 'https://docs.synthetix.io/incentives/',
    SIP60: 'https://sips.synthetix.io/sips/sip-60',
    StakingGuide: 'https://docs.synthetix.io/staking/staking-guide',
    SIP148Liquidations: 'https://blog.synthetix.io/new-liquidation-mechanism/',
    Governance: 'https://governance.synthetix.io',
    RewardsGuide: 'https://docs.synthetix.io/staking/staking-guide/steps-for-claiming-rewards',
    CRatioGuide: 'https://docs.synthetix.io/staking/staking-guide/collateralization-ratio',
    SIP255: 'https://sips.synthetix.io/sips/sip-255',
    HedgeStrategies: 'https://docs.synthetix.io/staking/staking-guide/debt-hedging-strategies',
    NativeBridge: 'https://blog.synthetix.io/susd-bridge-enabled',
    OptimismBridge: 'https://blog.oplabs.co/two-step-withdrawals/',
    MessageRelayer: 'https://optimistic.etherscan.io/messagerelayer',
  },
  Social: {
    Twitter: 'https://twitter.com/synthetix_io',
    Blog: 'https://blog.synthetix.io/',
    Discord: 'https://discord.com/invite/ptfNSByB8P',
    GitHub: 'https://github.com/synthetixio/staking',
  },
  TokenLists: {
    OneInch: 'https://gateway.ipfs.io/ipns/tokens.1inch.eth',
  },
  L2: {
    SynthetixDeposit: 'https://app.optimism.io/bridge',
    SynthetixWithdrawal: 'https://app.optimism.io/bridge/withdraw',
  },
  Toros: {
    dSNXPool: 'https://toros.finance/pool/0x59babc14dd73761e38e5bda171b2298dc14da92d',
    docs: 'https://docs.toros.finance/dynamic-vaults/synthetix-debt-hedge-index',
  },
} as const;
