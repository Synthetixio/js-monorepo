// !!! DO NOT EDIT !!! Automatically generated file

export const name = 'PerpsV2MarketStateETCPERP';
export const address = '0x04412b2aE241C602Be87Bc1114238d50d08398Fb';
export const source = 'PerpsV2MarketState';
export const abi = [
  'constructor(address _owner, address[] _associatedContracts, bytes32 _baseAsset, bytes32 _marketKey, address _legacyState)',
  'event AssociatedContractAdded(address associatedContract)',
  'event AssociatedContractRemoved(address associatedContract)',
  'event MarketStateInitialized(bytes32 indexed marketKey, bool legacyContractExists, address legacyState, uint256 legacyFundinSequenceOffset)',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function addAssociatedContracts(address[] associatedContracts)',
  'function associatedContracts() view returns (address[])',
  'function baseAsset() view returns (bytes32)',
  'function delayedOrders(address account) view returns (tuple(bool isOffchain, int128 sizeDelta, uint128 desiredFillPrice, uint128 targetRoundId, uint128 commitDeposit, uint128 keeperDeposit, uint256 executableAtTime, uint256 intentionTime, bytes32 trackingCode))',
  'function deleteDelayedOrder(address account)',
  'function deletePosition(address account)',
  'function entryDebtCorrection() view returns (int128)',
  'function flag(address account, address flagger)',
  'function fundingLastRecomputed() view returns (uint32)',
  'function fundingRateLastRecomputed() view returns (int128)',
  'function fundingSequence(uint256 index) view returns (int128)',
  'function fundingSequenceLength() view returns (uint256)',
  'function getDelayedOrderAddressesLength() view returns (uint256)',
  'function getDelayedOrderAddressesPage(uint256 index, uint256 pageSize) view returns (address[])',
  'function getFlaggedAddressesLength() view returns (uint256)',
  'function getFlaggedAddressesPage(uint256 index, uint256 pageSize) view returns (address[])',
  'function getPositionAddressesLength() view returns (uint256)',
  'function getPositionAddressesPage(uint256 index, uint256 pageSize) view returns (address[])',
  'function initialized() view returns (bool)',
  'function isFlagged(address account) view returns (bool)',
  'function legacyFundinSequenceOffset() view returns (uint256)',
  'function legacyState() view returns (address)',
  'function linkOrInitializeState()',
  'function marketKey() view returns (bytes32)',
  'function marketSize() view returns (uint128)',
  'function marketSkew() view returns (int128)',
  'function nextPositionId() view returns (uint64)',
  'function nominateNewOwner(address _owner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function positionFlagger(address) view returns (address)',
  'function positions(address account) view returns (tuple(uint64 id, uint64 lastFundingIndex, uint128 margin, uint128 lastPrice, int128 size))',
  'function pushFundingSequence(int128 fundingSequence)',
  'function removeAssociatedContracts(address[] associatedContracts)',
  'function setBaseAsset(bytes32 _baseAsset)',
  'function setEntryDebtCorrection(int128 entryDebtCorrection)',
  'function setFundingLastRecomputed(uint32 lastRecomputed)',
  'function setFundingRateLastRecomputed(int128 _fundingRateLastRecomputed)',
  'function setMarketKey(bytes32 _marketKey)',
  'function setMarketSize(uint128 _marketSize)',
  'function setMarketSkew(int128 _marketSkew)',
  'function setNextPositionId(uint64 nextPositionId)',
  'function unflag(address account)',
  'function updateDelayedOrder(address account, bool isOffchain, int128 sizeDelta, uint128 desiredFillPrice, uint128 targetRoundId, uint128 commitDeposit, uint128 keeperDeposit, uint256 executableAtTime, uint256 intentionTime, bytes32 trackingCode)',
  'function updatePosition(address account, uint64 id, uint64 lastFundingIndex, uint128 margin, uint128 lastPrice, int128 size)',
];
