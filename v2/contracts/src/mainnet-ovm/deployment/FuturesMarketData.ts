// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'FuturesMarketData';
export const address = '0xC51aeDBEC3aCD26650a7E85B6909E8AEc4d0F19e';
export const source = 'FuturesMarketData';
export const abi = [
  'constructor(address _resolverProxy)',
  'function allMarketSummaries() view returns (tuple(address market, bytes32 asset, bytes32 key, uint256 maxLeverage, uint256 price, uint256 marketSize, int256 marketSkew, uint256 marketDebt, int256 currentFundingRate, tuple(uint256 takerFee, uint256 makerFee, uint256 takerFeeNextPrice, uint256 makerFeeNextPrice) feeRates)[])',
  'function globals() view returns (tuple(uint256 minInitialMargin, uint256 liquidationFeeRatio, uint256 liquidationBufferRatio, uint256 minKeeperFee))',
  'function marketDetails(address market) view returns (tuple(address market, bytes32 baseAsset, bytes32 marketKey, tuple(uint256 takerFee, uint256 makerFee, uint256 takerFeeNextPrice, uint256 makerFeeNextPrice) feeRates, tuple(uint256 maxLeverage, uint256 maxMarketValueUSD) limits, tuple(uint256 maxFundingRate, uint256 skewScaleUSD) fundingParameters, tuple(uint256 marketSize, tuple(uint256 long, uint256 short) sides, uint256 marketDebt, int256 marketSkew) marketSizeDetails, tuple(uint256 price, bool invalid) priceDetails))',
  'function marketDetailsForKey(bytes32 marketKey) view returns (tuple(address market, bytes32 baseAsset, bytes32 marketKey, tuple(uint256 takerFee, uint256 makerFee, uint256 takerFeeNextPrice, uint256 makerFeeNextPrice) feeRates, tuple(uint256 maxLeverage, uint256 maxMarketValueUSD) limits, tuple(uint256 maxFundingRate, uint256 skewScaleUSD) fundingParameters, tuple(uint256 marketSize, tuple(uint256 long, uint256 short) sides, uint256 marketDebt, int256 marketSkew) marketSizeDetails, tuple(uint256 price, bool invalid) priceDetails))',
  'function marketSummaries(address[] markets) view returns (tuple(address market, bytes32 asset, bytes32 key, uint256 maxLeverage, uint256 price, uint256 marketSize, int256 marketSkew, uint256 marketDebt, int256 currentFundingRate, tuple(uint256 takerFee, uint256 makerFee, uint256 takerFeeNextPrice, uint256 makerFeeNextPrice) feeRates)[])',
  'function marketSummariesForKeys(bytes32[] marketKeys) view returns (tuple(address market, bytes32 asset, bytes32 key, uint256 maxLeverage, uint256 price, uint256 marketSize, int256 marketSkew, uint256 marketDebt, int256 currentFundingRate, tuple(uint256 takerFee, uint256 makerFee, uint256 takerFeeNextPrice, uint256 makerFeeNextPrice) feeRates)[])',
  'function parameters(bytes32 marketKey) view returns (tuple(uint256 takerFee, uint256 makerFee, uint256 takerFeeNextPrice, uint256 makerFeeNextPrice, uint256 nextPriceConfirmWindow, uint256 maxLeverage, uint256 maxMarketValueUSD, uint256 maxFundingRate, uint256 skewScaleUSD))',
  'function positionDetails(address market, address account) view returns (tuple(tuple(uint64 id, uint64 lastFundingIndex, uint128 margin, uint128 lastPrice, int128 size) position, int256 notionalValue, int256 profitLoss, int256 accruedFunding, uint256 remainingMargin, uint256 accessibleMargin, uint256 liquidationPrice, bool canLiquidatePosition))',
  'function positionDetailsForMarketKey(bytes32 marketKey, address account) view returns (tuple(tuple(uint64 id, uint64 lastFundingIndex, uint128 margin, uint128 lastPrice, int128 size) position, int256 notionalValue, int256 profitLoss, int256 accruedFunding, uint256 remainingMargin, uint256 accessibleMargin, uint256 liquidationPrice, bool canLiquidatePosition))',
  'function resolverProxy() view returns (address)',
];
