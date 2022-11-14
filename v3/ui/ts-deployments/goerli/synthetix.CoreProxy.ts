export const address = '0x8589Cf382d82fdDa237eFd75CEb493C4fe79A5ED';
export const abi = [
  'error AlreadyInitialized()',
  'error NoChange()',
  'error NotNominated(address addr)',
  'error Unauthorized(address addr)',
  'error ZeroAddress()',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'function acceptOwnership()',
  'function initializeOwnerModule(address initialOwner)',
  'function isOwnerModuleInitialized() view returns (bool)',
  'function nominateNewOwner(address newNominatedOwner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function renounceNomination()',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event FeatureFlagAllowAllSet(bytes32 feature, bool value)',
  'event FeatureFlagAllowlistAdded(bytes32 feature, address account)',
  'event FeatureFlagAllowlistRemoved(bytes32 feature, address account)',
  'function addToFeatureFlagAllowlist(bytes32 feature, address permissioned)',
  'function getFeatureFlagAllowAll(bytes32 feature) view returns (bool)',
  'function getFeatureFlagAllowlist(bytes32 feature) view returns (address[])',
  'function isFeatureAllowed(bytes32 feature, address addressToCheck) view returns (bool)',
  'function removeFromFeatureFlagAllowlist(bytes32 feature, address permissioned)',
  'function setFeatureFlagAllowAll(bytes32 feature, bool allowAll)',
  'error ImplementationIsSterile(address implementation)',
  'error NotAContract(address contr)',
  'error UpgradeSimulationFailed()',
  'event Upgraded(address indexed self, address implementation)',
  'function getImplementation() view returns (address)',
  'function simulateUpgradeTo(address newImplementation)',
  'function upgradeTo(address newImplementation)',
  'error InvalidPermission(bytes32 permission)',
  'error InvalidPermission()',
  'error OnlyAccountTokenProxy(address origin)',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error PermissionNotGranted(uint128 accountId, bytes32 permission, address user)',
  'error PositionOutOfBounds()',
  'event AccountCreated(address indexed sender, uint128 indexed accountId)',
  'event PermissionGranted(uint128 indexed accountId, bytes32 indexed permission, address indexed user, address sender)',
  'event PermissionRevoked(uint128 indexed accountId, bytes32 indexed permission, address indexed user, address sender)',
  'function createAccount(uint128 requestedAccountId)',
  'function getAccountOwner(uint128 accountId) view returns (address)',
  'function getAccountPermissions(uint128 accountId) view returns (tuple(address user, bytes32[] permissions)[] permissions)',
  'function getAccountTokenAddress() view returns (address)',
  'function grantPermission(uint128 accountId, bytes32 permission, address user)',
  'function hasPermission(uint128 accountId, bytes32 permission, address user) view returns (bool)',
  'function isAuthorized(uint128 accountId, bytes32 permission, address user) view returns (bool)',
  'function notifyAccountTransfer(address to, uint128 accountId)',
  'function renouncePermission(uint128 accountId, bytes32 permission)',
  'function revokePermission(uint128 accountId, bytes32 permission, address user)',
  'error EmptyDistribution()',
  'error InconsistentDistribution()',
  'error InsufficientCollateralRatio(uint256 collateralValue, uint256 debt, uint256 ratio, uint256 minRatio)',
  'error MarketNotFound(uint128 marketId)',
  'error NotFundedByPool(uint256 marketId, uint256 poolId)',
  'error ZeroValuePerShare()',
  'function associateDebt(uint128 marketId, uint128 poolId, address collateralType, uint128 accountId, uint256 amount) returns (int256)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'function getAssociatedSystem(bytes32 id) view returns (address proxy, bytes32 kind)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficientAccountCollateral(uint256 amount)',
  'error InsufficientAllowance(uint256 required, uint256 existing)',
  'error InvalidCollateral(address collateralType)',
  'error InvalidCollateral(address collateralType)',
  'error OutOfBounds()',
  'event CollateralConfigured(address indexed collateralType, address indexed priceFeed, uint256 targetCollateralizationRatio, uint256 minimumCollateralizationRatio, uint256 liquidationReward, bool indexed depositingEnabled)',
  'event Deposited(uint128 indexed accountId, address indexed collateralType, uint256 amount, address indexed sender)',
  'event Withdrawn(uint128 indexed accountId, address indexed collateralType, uint256 amount, address indexed sender)',
  'function cleanExpiredLocks(uint128 accountId, address collateralType, uint256 offset, uint256 items)',
  'function configureCollateral(address collateralType, address priceFeed, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, bool depositingEnabled)',
  'function createLock(uint128 accountId, address collateralType, uint256 amount, uint64 expireTimestamp)',
  'function deposit(uint128 accountId, address collateralType, uint256 amount)',
  'function getAccountAvailableCollateral(uint128 accountId, address collateralType) view returns (uint256)',
  'function getAccountCollateral(uint128 accountId, address collateralType) view returns (uint256 totalDeposited, uint256 totalAssigned, uint256 totalLocked)',
  'function getCollateralConfiguration(address collateralType) view returns (tuple(bool depositingEnabled, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, address priceFeed, address tokenAddress))',
  'function getCollateralConfigurations(bool hideDisabled) view returns (tuple(bool depositingEnabled, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, address priceFeed, address tokenAddress)[])',
  'function getCollateralPrice(address collateralType) view returns (uint256)',
  'function withdraw(uint128 accountId, address collateralType, uint256 amount)',
  'error InsufficientDebt(int256 currentDebt)',
  'event UsdBurned(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'event UsdMinted(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'function burnUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'function mintUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'error IneligibleForLiquidation(uint256 collateralValue, uint256 debt, uint256 currentCRatio, uint256 cratio)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error MustBeVaultLiquidated()',
  'event Liquidation(uint128 indexed accountId, uint128 indexed poolId, address indexed collateralType, uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded)',
  'event VaultLiquidation(uint128 indexed poolId, address indexed collateralType, uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded)',
  'function isLiquidatable(uint128 accountId, uint128 poolId, address collateralType) returns (bool)',
  'function liquidate(uint128 accountId, uint128 poolId, address collateralType) returns (uint256 amountRewarded, uint256 debtLiquidated, uint256 collateralLiquidated)',
  'function liquidateVault(uint128 poolId, address collateralType, uint128 liquidateAsAccountId, uint256 maxUsd) returns (uint256 amountLiquidated, uint256 collateralRewarded)',
  'error InsufficientMarketCollateralDepositable(uint128 marketId, address collateralType, uint256 amountToDeposit)',
  'error InsufficientMarketCollateralWithdrawable(uint128 marketId, address collateralType, uint256 amountToWithdraw)',
  'event MarketCollateralDeposited(uint128 indexed marketId, address indexed collateralType, uint256 amount, address indexed sender)',
  'event MarketCollateralWithdrawn(uint128 indexed marketId, address indexed collateralType, uint256 amount, address indexed sender)',
  'event MaximumMarketCollateralConfigured(uint128 indexed marketId, address indexed collateralType, uint256 amount, address indexed sender)',
  'function configureMaximumMarketCollateral(uint128 marketId, address collateralType, uint256 amount)',
  'function depositMarketCollateral(uint128 marketId, address collateralType, uint256 amount)',
  'function getMarketCollateralAmount(uint128 marketId, address collateralType) view returns (uint256)',
  'function getMaximumMarketCollateral(uint128 marketId, address collateralType) view returns (uint256)',
  'function withdrawMarketCollateral(uint128 marketId, address collateralType, uint256 amount)',
  'error FeatureUnavailable()',
  'error MarketDepositNotApproved(address market, address from, uint256 requestedAmount, uint256 approvedAmount)',
  'error NotEnoughLiquidity(uint128 marketId, uint256 amount)',
  'event MarketRegistered(address indexed market, uint128 indexed marketId)',
  'event MarketUsdDeposited(uint128 indexed marketId, address indexed target, uint256 amount, address indexed sender)',
  'event MarketUsdWithdrawn(uint128 indexed marketId, address indexed target, uint256 amount, address indexed sender)',
  'function depositMarketUsd(uint128 marketId, address target, uint256 amount)',
  'function getMarketCollateral(uint128 marketId) view returns (uint256)',
  'function getMarketDebtPerShare(uint128 marketId) returns (int256)',
  'function getMarketIssuance(uint128 marketId) view returns (int128)',
  'function getMarketReportedDebt(uint128 marketId) view returns (uint256)',
  'function getMarketTotalBalance(uint128 marketId) view returns (int256)',
  'function getWithdrawableUsd(uint128 marketId) view returns (uint256)',
  'function isMarketCapacityLocked(uint128 marketId) view returns (bool)',
  'function registerMarket(address market) returns (uint128 marketId)',
  'function withdrawMarketUsd(uint128 marketId, address target, uint256 amount)',
  'function multicall(bytes[] data) payable returns (bytes[] results)',
  'error PoolNotFound(uint128 poolId)',
  'event PoolApprovedAdded(uint256 poolId)',
  'event PoolApprovedRemoved(uint256 poolId)',
  'event PreferredPoolSet(uint256 poolId)',
  'function addApprovedPool(uint128 poolId)',
  'function getApprovedPools() view returns (uint256[])',
  'function getPreferredPool() view returns (uint256)',
  'function removeApprovedPool(uint128 poolId)',
  'function setPreferredPool(uint128 poolId)',
  'error CapacityLocked(uint256 marketId)',
  'error PoolAlreadyExists(uint128 poolId)',
  'event NominatedPoolOwner(uint128 indexed poolId, address indexed owner)',
  'event PoolConfigurationSet(uint128 indexed poolId, tuple(uint128 market, uint128 weight, int128 maxDebtShareValue)[] markets, address indexed sender)',
  'event PoolCreated(uint128 indexed poolId, address indexed owner)',
  'event PoolNameUpdated(uint128 indexed poolId, string indexed name, address indexed sender)',
  'event PoolNominationRenounced(uint128 indexed poolId, address indexed owner)',
  'event PoolNominationRevoked(uint128 indexed poolId, address indexed owner)',
  'event PoolOwnershipAccepted(uint128 indexed poolId, address indexed owner)',
  'event PoolOwnershipRenounced(uint128 indexed poolId, address indexed owner)',
  'function acceptPoolOwnership(uint128 poolId)',
  'function createPool(uint128 requestedPoolId, address owner)',
  'function getMinLiquidityRatio() view returns (uint256)',
  'function getNominatedPoolOwner(uint128 poolId) view returns (address)',
  'function getPoolConfiguration(uint128 poolId) view returns (tuple(uint128 market, uint128 weight, int128 maxDebtShareValue)[])',
  'function getPoolName(uint128 poolId) view returns (string poolName)',
  'function getPoolOwner(uint128 poolId) view returns (address)',
  'function nominatePoolOwner(address nominatedOwner, uint128 poolId)',
  'function renouncePoolNomination(uint128 poolId)',
  'function renouncePoolOwnership(uint128 poolId)',
  'function setMinLiquidityRatio(uint256 minLiquidityRatio)',
  'function setPoolConfiguration(uint128 poolId, tuple(uint128 market, uint128 weight, int128 maxDebtShareValue)[] newDistributions)',
  'function setPoolName(uint128 poolId, string name)',
  'event RewardsClaimed(uint128 indexed accountId, uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount)',
  'event RewardsDistributed(uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount, uint256 start, uint256 duration)',
  'function claimRewards(uint128 poolId, address collateralType, uint128 accountId, address distributor) returns (uint256)',
  'function distributeRewards(uint128 poolId, address collateralType, uint256 amount, uint256 start, uint256 duration)',
  'function getRewardRate(uint128 poolId, address collateralType, address distributor) view returns (uint256)',
  'function getRewards(uint128 poolId, address collateralType, uint128 accountId) returns (uint256[], address[])',
  'function registerRewardsDistributor(uint128 poolId, address collateralType, address distributor)',
  'function mintInitialSystemToken(address to, uint256 amount)',
  'function registerCcip(address ccipSend, address ccipReceive, address ccipTokenPool)',
  'error InvalidLeverage(uint256 leverage)',
  'event DelegationUpdated(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, uint256 leverage, address indexed sender)',
  'function delegateCollateral(uint128 accountId, uint128 poolId, address collateralType, uint256 collateralAmount, uint256 leverage)',
  'function getPosition(uint128 accountId, uint128 poolId, address collateralType) returns (uint256 collateralAmount, uint256 collateralValue, int256 debt, uint256 collateralizationRatio)',
  'function getPositionCollateral(uint128 accountId, uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getPositionCollateralizationRatio(uint128 accountId, uint128 poolId, address collateralType) returns (uint256)',
  'function getPositionDebt(uint128 accountId, uint128 poolId, address collateralType) returns (int256)',
  'function getVaultCollateral(uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getVaultCollateralRatio(uint128 poolId, address collateralType) returns (uint256)',
  'function getVaultDebt(uint128 poolId, address collateralType) returns (int256)',
];
