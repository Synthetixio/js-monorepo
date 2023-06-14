export const PERPS_V2_DASHBOARD_GRAPH_GOERLI_URL =
  'https://api.thegraph.com/subgraphs/name/synthetix-perps/perps-op-goerli';
export const PERPS_V2_DASHBOARD_GRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/synthetix-perps/perps';

export const KWENTA_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/kwenta/optimism-perps';
export const POLYNOMIAL_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/synthetix-perps/polynomial';

export const optimisticEthercanLink = (address: string) =>
  `https://optimistic.etherscan.io/address/${address}`;

export const optimisticEthercanTx = (txHash: string) =>
  `https://optimistic.etherscan.io/tx/${txHash}`;

export const infuraId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;

export enum FuturesMarketAsset {
  sBTC = 'sBTC',
  sETH = 'sETH',
  LINK = 'LINK',
  SOL = 'SOL',
  AVAX = 'AVAX',
  AAVE = 'AAVE',
  UNI = 'UNI',
  MATIC = 'MATIC',
  XAU = 'XAU',
  XAG = 'XAG',
  EUR = 'EUR',
  APE = 'APE',
  DYDX = 'DYDX',
  BNB = 'BNB',
  DOGE = 'DOGE',
  OP = 'OP',
  ATOM = 'ATOM',
  FTM = 'FTM',
  NEAR = 'NEAR',
  FLOW = 'FLOW',
  AXS = 'AXS',
  AUD = 'AUD',
  GBP = 'GBP',
  ARB = 'ARB',
  APT = 'APT',
  LDO = 'LDO',
  ADA = 'ADA',
  GMX = 'GMX',
  FIL = 'FIL',
  LTC = 'LTC',
  BCH = 'BCH',
  SHIB = 'SHIB',
  CRV = 'CRV',
  SUI = 'SUI',
  PEPE = 'PEPE',
  BLUR = 'BLUR',
  XRP = 'XRP',
  DOT = 'DOT',
  TRX = 'TRX',
  FLOKI = 'FLOKI',
  INJ = 'INJ',
  STETH = 'STETH',
}

export enum FuturesMarketKey {
  sBTCPERP = 'sBTCPERP',
  sETHPERP = 'sETHPERP',
  sLINKPERP = 'sLINKPERP',
  sSOLPERP = 'sSOLPERP',
  sAVAXPERP = 'sAVAXPERP',
  sAAVEPERP = 'sAAVEPERP',
  sUNIPERP = 'sUNIPERP',
  sMATICPERP = 'sMATICPERP',
  sXAUPERP = 'sXAUPERP',
  sXAGPERP = 'sXAGPERP',
  sEURPERP = 'sEURPERP',
  sAPEPERP = 'sAPEPERP',
  sDYDXPERP = 'sDYDXPERP',
  sBNBPERP = 'sBNBPERP',
  sDOGEPERP = 'sDOGEPERP',
  sOPPERP = 'sOPPERP',
  sATOMPERP = 'sATOMPERP',
  sFTMPERP = 'sFTMPERP',
  sNEARPERP = 'sNEARPERP',
  sFLOWPERP = 'sFLOWPERP',
  sAXSPERP = 'sAXSPERP',
  sAUDPERP = 'sAUDPERP',
  sGBPPERP = 'sGBPPERP',
  sARBPERP = 'sARBPERP',
  sAPTPERP = 'sAPTPERP',
  sLDOPERP = 'sLDOPERP',
  sADAPERP = 'sADAPERP',
  sGMXPERP = 'sGMXPERP',
  sFILPERP = 'sFILPERP',
  sLTCPERP = 'sLTCPERP',
  sBCHPERP = 'sBCHPERP',
  sSHIBPERP = 'sSHIBPERP',
  sCRVPERP = 'sCRVPERP',
  sSUIPERP = 'sSUIPERP',
  sPEPEPERP = 'sPEPEPERP',
  sBLURPERP = 'sBLURPERP',
  sXRPPERP = 'sXRPPERP',
  sDOTPERP = 'sDOTPERP',
  sTRXPERP = 'sTRXPERP',
  sFLOKIPERP = 'sFLOKIPERP',
  sINJPERP = 'sINJPERP',
  sSTETHPERP = 'sSTETHPERP',
}

export interface FuturesMarketConfig {
  id: string;
  key: FuturesMarketKey;
  asset: FuturesMarketAsset;
  supports: 'mainnet' | 'testnet' | 'both';
  version: 1 | 2;
  pythIds?: {
    mainnet: string;
    testnet: string;
  };
  disabled?: boolean;
}

export const MARKETS: Record<FuturesMarketKey, FuturesMarketConfig> = {
  // perps v2
  [FuturesMarketKey.sETHPERP]: {
    id: '0x2b3bb4c683bfc5239b029131eef3b1d214478d93',
    key: FuturesMarketKey.sETHPERP,
    asset: FuturesMarketAsset.sETH,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
      testnet: '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
    },
  },
  [FuturesMarketKey.sBTCPERP]: {
    id: '0x59b007e9ea8f89b069c43f8f45834d30853e3699',
    key: FuturesMarketKey.sBTCPERP,
    asset: FuturesMarketAsset.sBTC,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
      testnet: '0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b',
    },
  },
  [FuturesMarketKey.sLINKPERP]: {
    id: '0x31a1659ca00f617e86dc765b6494afe70a5a9c1a',
    key: FuturesMarketKey.sLINKPERP,
    asset: FuturesMarketAsset.LINK,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221',
      testnet: '0x83be4ed61dd8a3518d198098ce37240c494710a7b9d85e35d9fceac21df08994',
    },
  },
  [FuturesMarketKey.sSOLPERP]: {
    id: '0x0ea09d97b4084d859328ec4bf8ebcf9ecca26f1d',
    key: FuturesMarketKey.sSOLPERP,
    asset: FuturesMarketAsset.SOL,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
      testnet: '0xfe650f0367d4a7ef9815a593ea15d36593f0643aaaf0149bb04be67ab851decd',
    },
  },
  [FuturesMarketKey.sAVAXPERP]: {
    id: '0xc203a12f298ce73e44f7d45a4f59a43dbffe204d',
    key: FuturesMarketKey.sAVAXPERP,
    asset: FuturesMarketAsset.AVAX,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7',
      testnet: '0xd7566a3ba7f7286ed54f4ae7e983f4420ae0b1e0f3892e11f9c4ab107bbad7b9',
    },
  },
  [FuturesMarketKey.sAAVEPERP]: {
    id: '0x5374761526175b59f1e583246e20639909e189ce',
    key: FuturesMarketKey.sAAVEPERP,
    asset: FuturesMarketAsset.AAVE,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x2b9ab1e972a281585084148ba1389800799bd4be63b957507db1349314e47445',
      testnet: '0xd6b3bc030a8bbb7dd9de46fb564c34bb7f860dead8985eb16a49cdc62f8ab3a5',
    },
  },
  [FuturesMarketKey.sUNIPERP]: {
    id: '0x4308427c463caeaab50fff98a9dec569c31e4e87',
    key: FuturesMarketKey.sUNIPERP,
    asset: FuturesMarketAsset.UNI,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x78d185a741d07edb3412b09008b7c5cfb9bbbd7d568bf00ba737b456ba171501',
      testnet: '0x64ae1fc7ceacf2cd59bee541382ff3770d847e63c40eb6cf2413e7de5e93078a',
    },
  },
  [FuturesMarketKey.sMATICPERP]: {
    id: '0x074b8f19fc91d6b2eb51143e1f186ca0ddb88042',
    key: FuturesMarketKey.sMATICPERP,
    asset: FuturesMarketAsset.MATIC,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52',
      testnet: '0xd2c2c1f2bba8e0964f9589e060c2ee97f5e19057267ac3284caef3bd50bd2cb5',
    },
  },
  [FuturesMarketKey.sXAUPERP]: {
    id: '0x549dbdffbd47bd5639f9348ebe82e63e2f9f777a',
    key: FuturesMarketKey.sXAUPERP,
    asset: FuturesMarketAsset.XAU,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2',
      testnet: '0x30a19158f5a54c0adf8fb7560627343f22a1bc852b89d56be1accdc5dbf96d0e',
    },
  },
  [FuturesMarketKey.sXAGPERP]: {
    id: '0xdcb8438c979fa030581314e5a5df42bbfed744a0',
    key: FuturesMarketKey.sXAGPERP,
    asset: FuturesMarketAsset.XAG,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xf2fb02c32b055c805e7238d628e5e9dadef274376114eb1f012337cabe93871e',
      testnet: '0x321ba4d608fa75ba76d6d73daa715abcbdeb9dba02257f05a1b59178b49f599b',
    },
  },
  [FuturesMarketKey.sEURPERP]: {
    id: '0x87ae62c5720dab812bdacba66cc24839440048d1',
    key: FuturesMarketKey.sEURPERP,
    asset: FuturesMarketAsset.EUR,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b',
      testnet: '0xc1b12769f6633798d45adfd62bfc70114839232e2949b01fb3d3f927d2606154',
    },
  },
  [FuturesMarketKey.sAPEPERP]: {
    id: '0x5b6beb79e959aac2659bee60fe0d0885468bf886',
    key: FuturesMarketKey.sAPEPERP,
    asset: FuturesMarketAsset.APE,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x15add95022ae13563a11992e727c91bdb6b55bc183d9d747436c80a483d8c864',
      testnet: '0xcb1743d0e3e3eace7e84b8230dc082829813e3ab04e91b503c08e9a441c0ea8b',
    },
  },
  [FuturesMarketKey.sDYDXPERP]: {
    id: '0x139f94e4f0e1101c1464a321cba815c34d58b5d9',
    key: FuturesMarketKey.sDYDXPERP,
    asset: FuturesMarketAsset.DYDX,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x6489800bb8974169adfe35937bf6736507097d13c190d760c557108c7e93a81b',
      testnet: '0x05a934cb3bbadef93b525978ab5bd3d5ce3b8fc6717b9ea182a688c5d8ee8e02',
    },
  },
  [FuturesMarketKey.sBNBPERP]: {
    id: '0x0940b0a96c5e1ba33aee331a9f950bb2a6f2fb25',
    key: FuturesMarketKey.sBNBPERP,
    asset: FuturesMarketAsset.BNB,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f',
      testnet: '0xecf553770d9b10965f8fb64771e93f5690a182edc32be4a3236e0caaa6e0581a',
    },
  },
  [FuturesMarketKey.sDOGEPERP]: {
    id: '0x98ccbc721cc05e28a125943d69039b39be6a21e9',
    key: FuturesMarketKey.sDOGEPERP,
    asset: FuturesMarketAsset.DOGE,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c',
      testnet: '0x31775e1d6897129e8a84eeba975778fb50015b88039e9bc140bbd839694ac0ae',
    },
  },
  [FuturesMarketKey.sOPPERP]: {
    id: '0x442b69937a0daf9d46439a71567fabe6cb69fbaf',
    key: FuturesMarketKey.sOPPERP,
    asset: FuturesMarketAsset.OP,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf',
      testnet: '0x71334dcd37620ce3c33e3bafef04cc80dec083042e49b734315b36d1aad7991f',
    },
  },
  [FuturesMarketKey.sATOMPERP]: {
    id: '0xbb16c7b3244dfa1a6bf83fcce3ee4560837763cd',
    key: FuturesMarketKey.sATOMPERP,
    asset: FuturesMarketAsset.ATOM,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xb00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819',
      testnet: '0x61226d39beea19d334f17c2febce27e12646d84675924ebb02b9cdaea68727e3',
    },
  },
  [FuturesMarketKey.sFTMPERP]: {
    id: '0xc18f85a6dd3bcd0516a1ca08d3b1f0a4e191a2c4',
    key: FuturesMarketKey.sFTMPERP,
    asset: FuturesMarketAsset.FTM,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x5c6c0d2386e3352356c3ab84434fafb5ea067ac2678a38a338c4a69ddc4bdb0c',
      testnet: '0x9b7bfd7654cbb80099d5edc0a29159afc9e9b4636c811cf8c3b95bd11dd8e3dd',
    },
  },
  [FuturesMarketKey.sNEARPERP]: {
    id: '0xc8fcd6fb4d15dd7c455373297def375a08942ece',
    key: FuturesMarketKey.sNEARPERP,
    asset: FuturesMarketAsset.NEAR,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xc415de8d2eba7db216527dff4b60e8f3a5311c740dadb233e13e12547e226750',
      testnet: '0x27e867f0f4f61076456d1a73b14c7edc1cf5cef4f4d6193a33424288f11bd0f4',
    },
  },
  [FuturesMarketKey.sFLOWPERP]: {
    id: '0x27665271210acff4fab08ad9bb657e91866471f0',
    key: FuturesMarketKey.sFLOWPERP,
    asset: FuturesMarketAsset.FLOW,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x2fb245b9a84554a0f15aa123cbb5f64cd263b59e9a87d80148cbffab50c69f30',
      testnet: '0xaa67a6594d0e1578faa3bba80bec5b31e461b945e4fbab59eeab38ece09335fb',
    },
  },
  [FuturesMarketKey.sAXSPERP]: {
    id: '0x3a52b21816168dfe35be99b7c5fc209f17a0adb1',
    key: FuturesMarketKey.sAXSPERP,
    asset: FuturesMarketAsset.AXS,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xb7e3904c08ddd9c0c10c6d207d390fd19e87eb6aab96304f571ed94caebdefa0',
      testnet: '0xb327d9cf0ecd793a175fa70ac8d2dc109d4462758e556962c4a87b02ec4f3f15',
    },
  },
  [FuturesMarketKey.sAUDPERP]: {
    id: '0x9de146b5663b82f44e5052dede2aa3fd4cbcdc99',
    key: FuturesMarketKey.sAUDPERP,
    asset: FuturesMarketAsset.AUD,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x67a6f93030420c1c9e3fe37c1ab6b77966af82f995944a9fefce357a22854a80',
      testnet: '0x2646ca1e1186fd2bb48b2ab3effa841d233b7e904b2caebb19c8030784a89c97',
    },
  },
  [FuturesMarketKey.sGBPPERP]: {
    id: '0x1dad8808d8ac58a0df912adc4b215ca3b93d6c49',
    key: FuturesMarketKey.sGBPPERP,
    asset: FuturesMarketAsset.GBP,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x84c2dde9633d93d1bcad84e7dc41c9d56578b7ec52fabedc1f335d673df0a7c1',
      testnet: '0xbcbdc2755bd74a2065f9d3283c2b8acbd898e473bdb90a6764b3dbd467c56ecd',
    },
  },
  [FuturesMarketKey.sARBPERP]: {
    id: '0x509072a5ae4a87ac89fc8d64d94adcb44bd4b88e',
    key: FuturesMarketKey.sARBPERP,
    asset: FuturesMarketAsset.ARB,
    supports: 'mainnet',
    version: 2,
    pythIds: {
      mainnet: '0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5',
      testnet: '0x37f40d2898159e8f2e52b93cb78f47cc3829a31e525ab975c49cc5c5d9176378',
    },
  },
  [FuturesMarketKey.sAPTPERP]: {
    id: '0x9615b6bfff240c44d3e33d0cd9a11f563a2e8d8b',
    key: FuturesMarketKey.sAPTPERP,
    asset: FuturesMarketAsset.APT,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5',
      testnet: '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
    },
  },
  [FuturesMarketKey.sLDOPERP]: {
    id: '0xaa94c874b91ef16c8b56a1c5b2f34e39366bd484',
    key: FuturesMarketKey.sLDOPERP,
    asset: FuturesMarketAsset.LDO,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xc63e2a7f37a04e5e614c07238bedb25dcc38927fba8fe890597a593c0b2fa4ad',
      testnet: '0x69b9ca2e7159fe570844c22bac849c490e0ddfd0349626c19fd7d65509e192a3',
    },
  },
  [FuturesMarketKey.sADAPERP]: {
    id: '0xf9dd29d2fd9b38cd90e390c797f1b7e0523f43a9',
    key: FuturesMarketKey.sADAPERP,
    asset: FuturesMarketAsset.ADA,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x2a01deaec9e51a579277b34b122399984d0bbf57e2458a7e42fecd2829867a0d',
      testnet: '0x73dc009953c83c944690037ea477df627657f45c14f16ad3a61089c5a3f9f4f2',
    },
  },
  [FuturesMarketKey.sGMXPERP]: {
    id: '0x33d4613639603c845e61a02cd3d2a78be7d513dc',
    key: FuturesMarketKey.sGMXPERP,
    asset: FuturesMarketAsset.GMX,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xb962539d0fcb272a494d65ea56f94851c2bcf8823935da05bd628916e2e9edbf',
      testnet: '0x4b57c2471f6ab9250d26b7e0ff8807bfd620a609503f52b0b67645f69eb2d5c5',
    },
  },
  [FuturesMarketKey.sFILPERP]: {
    id: '0x2c5e2148bf3409659967fe3684fd999a76171235',
    key: FuturesMarketKey.sFILPERP,
    asset: FuturesMarketAsset.FIL,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x150ac9b959aee0051e4091f0ef5216d941f590e1c5e7f91cf7635b5c11628c0e',
      testnet: '0xb5622d32f36dc820af288aab779133ef1205d3123bbe256603849b820de48b87',
    },
  },
  [FuturesMarketKey.sLTCPERP]: {
    id: '0xb25529266d9677e9171beaf333a0dea506c5f99a',
    key: FuturesMarketKey.sLTCPERP,
    asset: FuturesMarketAsset.LTC,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x6e3f3fa8253588df9326580180233eb791e03b443a3ba7a1d892e73874e19a54',
      testnet: '0x997e0bf451cb36b4aea096e6b5c254d700922211dd933d9d17c467f0d6f34321',
    },
  },
  [FuturesMarketKey.sBCHPERP]: {
    id: '0x96690aae7cb7c4a9b5be5695e94d72827decc33f',
    key: FuturesMarketKey.sBCHPERP,
    asset: FuturesMarketAsset.BCH,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x3dd2b63686a450ec7290df3a1e0b583c0481f651351edfa7636f39aed55cf8a3',
      testnet: '0x30029479598797290e3638a1712c29bde2367d0eca794f778b25b5a472f192de',
    },
  },
  [FuturesMarketKey.sSHIBPERP]: {
    id: '0x69f5f465a46f324fb7bf3fd7c0d5c00f7165c7ea',
    key: FuturesMarketKey.sSHIBPERP,
    asset: FuturesMarketAsset.SHIB,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xf0d57deca57b3da2fe63a493f4c25925fdfd8edf834b20f93e1f84dbd1504d4a',
      testnet: '0x672fbb7d9ec665cfbe8c2ffa643ba321a047b7a72d7b6d7c3d8fb120fc40954b',
    },
  },
  [FuturesMarketKey.sCRVPERP]: {
    id: '0xd5fbf7136b86021ef9d0be5d798f948dce9c0dea',
    key: FuturesMarketKey.sCRVPERP,
    asset: FuturesMarketAsset.CRV,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xa19d04ac696c7a6616d291c7e5d1377cc8be437c327b75adb5dc1bad745fcae8',
      testnet: '0x94bce4aee88fdfa5b58d81090bd6b3784717fa6df85419d9f04433bb3d615d5c',
    },
  },
  [FuturesMarketKey.sSUIPERP]: {
    id: '0x09f9d7aaa6bef9598c3b676c0e19c9786aa566a8',
    key: FuturesMarketKey.sSUIPERP,
    asset: FuturesMarketAsset.SUI,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
      testnet: '0x50c67b3fd225db8912a424dd4baed60ffdde625ed2feaaf283724f9608fea266',
    },
  },
  [FuturesMarketKey.sPEPEPERP]: {
    id: '0x3d3f34416f60f77a0a6cc8e32abe45d32a7497cb',
    key: FuturesMarketKey.sPEPEPERP,
    asset: FuturesMarketAsset.PEPE,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xd69731a2e74ac1ce884fc3890f7ee324b6deb66147055249568869ed700882e4',
      testnet: '0xed82efbfade01083ffa8f64664c86af39282c9f084877066ae72b635e77718f0',
    },
  },
  [FuturesMarketKey.sBLURPERP]: {
    id: '0xa1ace9ce6862e865937939005b1a6c5ac938a11f',
    key: FuturesMarketKey.sBLURPERP,
    asset: FuturesMarketAsset.BLUR,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x856aac602516addee497edf6f50d39e8c95ae5fb0da1ed434a8c2ab9c3e877e9',
      testnet: '0xbe2dbc97659e92bf07462aeda414195246515e6b17abd6997f0ab2297cb03e1d',
    },
  },
  [FuturesMarketKey.sXRPPERP]: {
    id: '0x6110df298b411a46d6edce72f5caca9ad826c1de',
    key: FuturesMarketKey.sXRPPERP,
    asset: FuturesMarketAsset.XRP,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8',
      testnet: '0xbfaf7739cb6fe3e1c57a0ac08e1d931e9e6062d476fa57804e165ab572b5b621',
    },
  },
  [FuturesMarketKey.sDOTPERP]: {
    id: '0x8b9b5f94aac2316f048025b3cbe442386e85984b',
    key: FuturesMarketKey.sDOTPERP,
    asset: FuturesMarketAsset.DOT,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0xca3eed9b267293f6595901c734c7525ce8ef49adafe8284606ceb307afa2ca5b',
      testnet: '0x36032e522b810babd8e3148e9f0d588af9e95e93b97ffb58566b837fdbd31f7f',
    },
  },
  [FuturesMarketKey.sTRXPERP]: {
    id: '0x031a448f59111000b96f016c37e9c71e57845096',
    key: FuturesMarketKey.sTRXPERP,
    asset: FuturesMarketAsset.TRX,
    supports: 'testnet',
    version: 2,
    pythIds: {
      mainnet: '0x67aed5a24fdad045475e7195c98a98aea119c763f272d4523f5bac93a4f33c2b',
      testnet: '0x013317758a5b499650d72edcd7ba12bb5cc54ce9434196b607fa5e01e0f7797b',
    },
  },
  [FuturesMarketKey.sFLOKIPERP]: {
    id: '0x5ed8d0946b59d015f5a60039922b870537d43689',
    key: FuturesMarketKey.sFLOKIPERP,
    asset: FuturesMarketAsset.FLOKI,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x6b1381ce7e874dc5410b197ac8348162c0dd6c0d4c9cd6322672d6c2b1d58293',
      testnet: '0x57596fe1a697014b962ac9e693dee99c4bb01d6c5eca271a1a26ad475a92cdbd',
    },
  },
  [FuturesMarketKey.sINJPERP]: {
    id: '0x852210f0616ac226a486ad3387dbf990e690116a',
    key: FuturesMarketKey.sINJPERP,
    asset: FuturesMarketAsset.INJ,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x7a5bc1d2b56ad029048cd63964b3ad2776eadf812edc1a43a31406cb54bff592',
      testnet: '0x2d9315a88f3019f8efa88dfe9c0f0843712da0bac814461e27733f6b83eb51b3',
    },
  },
  [FuturesMarketKey.sSTETHPERP]: {
    id: '0xD91Db82733987513286B81e7115091d96730b62A',
    key: FuturesMarketKey.sSTETHPERP,
    asset: FuturesMarketAsset.STETH,
    supports: 'both',
    version: 2,
    pythIds: {
      mainnet: '0x846ae1bdb6300b817cee5fdee2a6da192775030db5615b94a465f53bd40850b5',
      testnet: '0xb7abd25a76ddaffdf847224f03198ccb92723f90b2429cf33f0eecb96e352a86',
    },
  },
};
