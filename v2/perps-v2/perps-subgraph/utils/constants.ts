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

export const PerpProxies = [
  new PerpMarkets(
    'AAVE',
    'sAAVEPERP',
    '0x5374761526175b59f1e583246e20639909e189ce'
  ),
  new PerpMarkets(
    'APE',
    'sAPEPERP',
    '0x5B6BeB79E959Aac2659bEE60fE0D0885468BF886'
  ),
  new PerpMarkets(
    'ATOM',
    'sATOMPERP',
    '0xbB16C7B3244DFA1a6BF83Fcce3EE4560837763CD'
  ),

  new PerpMarkets(
    'AUD',
    'sAUDPERP',
    '0x9De146b5663b82F44E5052dEDe2aA3Fd4CBcDC99'
  ),

  new PerpMarkets(
    'AVAX',
    'sAVAXPERP',
    '0xc203A12F298CE73E44F7d45A4f59a43DBfFe204D'
  ),

  new PerpMarkets(
    'AXS',
    'sAXSPERP',
    '0x3a52b21816168dfe35bE99b7C5fc209f17a0aDb1'
  ),

  new PerpMarkets(
    'BNB',
    'sBNBPERP',
    '0x0940B0A96C5e1ba33AEE331a9f950Bb2a6F2Fb25'
  ),

  new PerpMarkets(
    'BTC',
    'sBTCPERP',
    '0x59b007E9ea8F89b069c43F8f45834d30853e3699'
  ),

  new PerpMarkets(
    'DOGE',
    'sDODGEPERP',
    '0x98cCbC721cc05E28a125943D69039B39BE6A21e9'
  ),

  new PerpMarkets(
    'DYDX',
    'sDYDXPERP',
    '0x139F94E4f0e1101c1464a321CBA815c34d58B5D9'
  ),

  new PerpMarkets(
    'ETH',
    'sETHPERP',
    '0x2B3bb4c683BFc5239B029131EEf3B1d214478d93'
  ),

  new PerpMarkets(
    'EUR',
    'sEURPERP',
    '0x87AE62c5720DAB812BDacba66cc24839440048d1'
  ),

  new PerpMarkets(
    'FLOW',
    'sFLOWPERP',
    '0x27665271210aCff4Fab08AD9Bb657E91866471F0'
  ),

  new PerpMarkets(
    'FTM',
    'sFTMPERP',
    '0xC18f85A6DD3Bcd0516a1CA08d3B1f0A4E191A2C4'
  ),

  new PerpMarkets(
    'GBP',
    'sGBPPERP',
    '0x1dAd8808D8aC58a0df912aDC4b215ca3B93D6C49'
  ),

  new PerpMarkets(
    'LINK',
    'sLINKPERP',
    '0x31A1659Ca00F617E86Dc765B6494Afe70a5A9c1A'
  ),

  new PerpMarkets(
    'MATIC',
    'sMATICPERP',
    '0x074B8F19fc91d6B2eb51143E1f186Ca0DDB88042'
  ),

  new PerpMarkets(
    'NEAR',
    'sNEARPERP',
    '0xC8fCd6fB4D15dD7C455373297dEF375a08942eCe'
  ),

  new PerpMarkets(
    'OP',
    'sOPPERP',
    '0x442b69937a0daf9D46439a71567fABE6Cb69FBaf'
  ),

  new PerpMarkets(
    'SOL',
    'sSOLPERP',
    '0x0EA09D97b4084d859328ec4bF8eBCF9ecCA26F1D'
  ),

  new PerpMarkets(
    'UNI',
    'sUNIPERP',
    '0x4308427C463CAEAaB50FFf98a9deC569C31E4E87'
  ),

  new PerpMarkets(
    'XAG',
    'sXAGPERP',
    '0xdcB8438c979fA030581314e5A5Df42bbFEd744a0'
  ),

  new PerpMarkets(
    'XAU',
    'sXAUPERP',
    '0x549dbDFfbd47bD5639f9348eBE82E63e2f9F777A'
  ),
];

export const TrackingCodes = ['KWENTA', 'DECENTREX', 'POLYNOMIAL'];
