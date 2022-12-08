export const address = '0xd5a3007a4042d833390ebccfeb57b9abbc53ce4a190eed6cfab272189c970871';
export const abi = [
  'error AlreadyInitialized()',
  'error ImplementationIsSterile(address implementation)',
  'error NoChange()',
  'error NotAContract(address contr)',
  'error NotNominated(address addr)',
  'error Unauthorized(address addr)',
  'error UpgradeSimulationFailed()',
  'error ZeroAddress()',
  'event OwnerChanged(address oldOwner, address newOwner)',
  'event OwnerNominated(address newOwner)',
  'event Upgraded(address indexed self, address implementation)',
  'function acceptOwnership()',
  'function getImplementation() view returns (address)',
  'function initializeOwnerModule(address initialOwner)',
  'function isOwnerModuleInitialized() view returns (bool)',
  'function nominateNewOwner(address newNominatedOwner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function renounceNomination()',
  'function simulateUpgradeTo(address newImplementation)',
  'function upgradeTo(address newImplementation)',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event FeatureFlagAllowAllSet(bytes32 feature, bool allowAll)',
  'event FeatureFlagAllowlistAdded(bytes32 feature, address account)',
  'event FeatureFlagAllowlistRemoved(bytes32 feature, address account)',
  'function addToFeatureFlagAllowlist(bytes32 feature, address account)',
  'function getFeatureFlagAllowAll(bytes32 feature) view returns (bool)',
  'function getFeatureFlagAllowlist(bytes32 feature) view returns (address[])',
  'function isFeatureAllowed(bytes32 feature, address account) view returns (bool)',
  'function removeFromFeatureFlagAllowlist(bytes32 feature, address account)',
  'function setFeatureFlagAllowAll(bytes32 feature, bool allowAll)',
  'error InvalidPermission(bytes32 permission)',
  'error OnlyAccountTokenProxy(address origin)',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error PermissionNotGranted(uint128 accountId, bytes32 permission, address user)',
  'error PositionOutOfBounds()',
  'event AccountCreated(uint128 indexed accountId, address indexed owner)',
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
  'error FeatureUnavailable()',
  'error InsufficientCollateralRatio(uint256 collateralValue, uint256 debt, uint256 ratio, uint256 minRatio)',
  'error MarketNotFound(uint128 marketId)',
  'error NotFundedByPool(uint256 marketId, uint256 poolId)',
  'error OverflowInt256ToInt128()',
  'error OverflowInt256ToUint256()',
  'error OverflowUint128ToInt128()',
  'error OverflowUint256ToInt256()',
  'error OverflowUint256ToUint128()',
  'event DebtAssociated(uint128 indexed marketId, uint128 indexed poolId, address indexed collateralType, uint128 accountId, uint256 amount, int256 updatedDebt)',
  'function associateDebt(uint128 marketId, uint128 poolId, address collateralType, uint128 accountId, uint256 amount) returns (int256)',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'function getAssociatedSystem(bytes32 id) view returns (address addr, bytes32 kind)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
  'error CollateralDepositDisabled(address collateralType)',
  'error CollateralNotFound()',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficientAccountCollateral(uint256 amount)',
  'error InsufficientAllowance(uint256 required, uint256 existing)',
  'error OutOfBounds()',
  'event Deposited(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event Withdrawn(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'function cleanExpiredLocks(uint128 accountId, address collateralType, uint256 offset, uint256 items)',
  'function createLock(uint128 accountId, address collateralType, uint256 amount, uint64 expireTimestamp)',
  'function deposit(uint128 accountId, address collateralType, uint256 tokenAmount)',
  'function getAccountAvailableCollateral(uint128 accountId, address collateralType) view returns (uint256)',
  'function getAccountCollateral(uint128 accountId, address collateralType) view returns (uint256 totalDeposited, uint256 totalAssigned, uint256 totalLocked)',
  'function withdraw(uint128 accountId, address collateralType, uint256 tokenAmount)',
  'error InvalidParameter(string parameter, string reason)',
  'event CollateralConfigured(address indexed collateralType, tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18) config)',
  'function configureCollateral(tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18) config)',
  'function getCollateralConfiguration(address collateralType) view returns (tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18))',
  'function getCollateralConfigurations(bool hideDisabled) view returns (tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18)[])',
  'function getCollateralPrice(address collateralType) view returns (uint256)',
  'error InsufficientDebt(int256 currentDebt)',
  'event UsdBurned(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'event UsdMinted(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'function burnUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'function mintUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'error AccountNotFound(uint128 accountId)',
  'error IneligibleForLiquidation(uint256 collateralValue, int256 debt, uint256 currentCRatio, uint256 cratio)',
  'error InsufficientMappedAmount(int256 scaleModifier)',
  'error MustBeVaultLiquidated()',
  'error OverflowInt128ToUint128()',
  'event Liquidation(uint128 indexed accountId, uint128 indexed poolId, address indexed collateralType, tuple(uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded) liquidationData, uint128 liquidateAsAccountId, address sender)',
  'event VaultLiquidation(uint128 indexed poolId, address indexed collateralType, tuple(uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded) liquidationData, uint128 liquidateAsAccountId, address sender)',
  'function isPositionLiquidatable(uint128 accountId, uint128 poolId, address collateralType) returns (bool)',
  'function isVaultLiquidatable(uint128 poolId, address collateralType) returns (bool)',
  'function liquidate(uint128 accountId, uint128 poolId, address collateralType, uint128 liquidateAsAccountId) returns (tuple(uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded) liquidationData)',
  'function liquidateVault(uint128 poolId, address collateralType, uint128 liquidateAsAccountId, uint256 maxUsd) returns (tuple(uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded) liquidationData)',
  'error InsufficientMarketCollateralDepositable(uint128 marketId, address collateralType, uint256 tokenAmountToDeposit)',
  'error InsufficientMarketCollateralWithdrawable(uint128 marketId, address collateralType, uint256 tokenAmountToWithdraw)',
  'event MarketCollateralDeposited(uint128 indexed marketId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event MarketCollateralWithdrawn(uint128 indexed marketId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event MaximumMarketCollateralConfigured(uint128 indexed marketId, address indexed collateralType, uint256 systemAmount, address indexed sender)',
  'function configureMaximumMarketCollateral(uint128 marketId, address collateralType, uint256 amount)',
  'function depositMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
  'function getMarketCollateralAmount(uint128 marketId, address collateralType) view returns (uint256 collateralAmountD18)',
  'function getMaximumMarketCollateral(uint128 marketId, address collateralType) view returns (uint256)',
  'function withdrawMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
  'error IncorrectMarketInterface(address market)',
  'error NotEnoughLiquidity(uint128 marketId, uint256 amount)',
  'event MarketRegistered(address indexed market, uint128 indexed marketId, address indexed sender)',
  'event MarketUsdDeposited(uint128 indexed marketId, address indexed target, uint256 amount, address indexed market)',
  'event MarketUsdWithdrawn(uint128 indexed marketId, address indexed target, uint256 amount, address indexed market)',
  'function depositMarketUsd(uint128 marketId, address target, uint256 amount)',
  'function getMarketCollateral(uint128 marketId) view returns (uint256)',
  'function getMarketDebtPerShare(uint128 marketId) returns (int256)',
  'function getMarketNetIssuance(uint128 marketId) view returns (int128)',
  'function getMarketReportedDebt(uint128 marketId) view returns (uint256)',
  'function getMarketTotalDebt(uint128 marketId) view returns (int256)',
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
  'event PoolConfigurationSet(uint128 indexed poolId, tuple(uint128 marketId, uint128 weightD18, int128 maxDebtShareValueD18)[] markets, address indexed sender)',
  'event PoolCreated(uint128 indexed poolId, address indexed owner, address indexed sender)',
  'event PoolNameUpdated(uint128 indexed poolId, string indexed name, address indexed sender)',
  'event PoolNominationRenounced(uint128 indexed poolId, address indexed owner)',
  'event PoolNominationRevoked(uint128 indexed poolId, address indexed owner)',
  'event PoolOwnerNominated(uint128 indexed poolId, address indexed nominatedOwner, address indexed owner)',
  'event PoolOwnershipAccepted(uint128 indexed poolId, address indexed owner)',
  'function acceptPoolOwnership(uint128 poolId)',
  'function createPool(uint128 requestedPoolId, address owner)',
  'function getMinLiquidityRatio() view returns (uint256)',
  'function getNominatedPoolOwner(uint128 poolId) view returns (address)',
  'function getPoolConfiguration(uint128 poolId) view returns (tuple(uint128 marketId, uint128 weightD18, int128 maxDebtShareValueD18)[])',
  'function getPoolName(uint128 poolId) view returns (string poolName)',
  'function getPoolOwner(uint128 poolId) view returns (address)',
  'function nominatePoolOwner(address nominatedOwner, uint128 poolId)',
  'function renouncePoolNomination(uint128 poolId)',
  'function revokePoolNomination(uint128 poolId)',
  'function setMinLiquidityRatio(uint256 minLiquidityRatio)',
  'function setPoolConfiguration(uint128 poolId, tuple(uint128 marketId, uint128 weightD18, int128 maxDebtShareValueD18)[] newMarketConfigurations)',
  'function setPoolName(uint128 poolId, string name)',
  'event RewardsClaimed(uint128 indexed accountId, uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount)',
  'event RewardsDistributed(uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount, uint256 start, uint256 duration)',
  'event RewardsDistributorRegistered(uint128 indexed poolId, address indexed collateralType, address indexed distributor)',
  'event RewardsDistributorRemoved(uint128 indexed poolId, address indexed collateralType, address indexed distributor)',
  'function claimRewards(uint128 accountId, uint128 poolId, address collateralType, address distributor) returns (uint256)',
  'function distributeRewards(uint128 poolId, address collateralType, uint256 amount, uint64 start, uint32 duration)',
  'function getClaimableRewards(uint128 poolId, address collateralType, uint128 accountId) returns (uint256[], address[])',
  'function getRewardRate(uint128 poolId, address collateralType, address distributor) view returns (uint256)',
  'function registerRewardsDistributor(uint128 poolId, address collateralType, address distributor)',
  'function removeRewardsDistributor(uint128 poolId, address collateralType, address distributor)',
  'function configureOracleManager(address oracleManagerAddress)',
  'function registerCcip(address ccipSend, address ccipReceive, address ccipTokenPool)',
  'error InsufficientDelegation(uint256 minDelegation)',
  'error InvalidLeverage(uint256 leverage)',
  'event DelegationUpdated(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, uint256 leverage, address indexed sender)',
  'function delegateCollateral(uint128 accountId, uint128 poolId, address collateralType, uint256 newCollateralAmount, uint256 leverage)',
  'function getPosition(uint128 accountId, uint128 poolId, address collateralType) returns (uint256 collateralAmount, uint256 collateralValue, int256 debt, uint256 collateralizationRatio)',
  'function getPositionCollateral(uint128 accountId, uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getPositionCollateralizationRatio(uint128 accountId, uint128 poolId, address collateralType) returns (uint256)',
  'function getPositionDebt(uint128 accountId, uint128 poolId, address collateralType) returns (int256)',
  'function getVaultCollateral(uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getVaultCollateralRatio(uint128 poolId, address collateralType) returns (uint256)',
  'function getVaultDebt(uint128 poolId, address collateralType) returns (int256)',
];
