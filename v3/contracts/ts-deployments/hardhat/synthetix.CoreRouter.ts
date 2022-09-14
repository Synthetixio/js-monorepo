export const address = '0x72013AC0Ad943F31C5fFf2032d987e117d725Ffe';
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
  'error ImplementationIsSterile(address implementation)',
  'error NotAContract(address contr)',
  'error UpgradeSimulationFailed()',
  'event Upgraded(address implementation)',
  'function getImplementation() view returns (address)',
  'function simulateUpgradeTo(address newImplementation)',
  'function upgradeTo(address newImplementation)',
  'error InvalidPermission()',
  'error MismatchAssociatedSystemKind(bytes32 expected, bytes32 actual)',
  'error OnlyAccountTokenProxy(address origin)',
  'error PermissionDenied(uint256 accountId, bytes32 permission, address target)',
  'error PermissionNotGranted(uint256 accountId, bytes32 permission, address target)',
  'error PositionOutOfBounds()',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event AccountCreated(address indexed sender, uint256 indexed accountId)',
  'event PermissionGranted(uint256 indexed accountId, bytes32 indexed permission, address indexed target, address sender)',
  'event PermissionRevoked(uint256 indexed accountId, bytes32 indexed permission, address indexed target, address sender)',
  'function createAccount(uint256 requestedAccountId)',
  'function getAccountOwner(uint256 accountId) view returns (address)',
  'function getAccountPermissions(uint256 accountId) view returns (tuple(address target, bytes32[] permissions)[] permissions)',
  'function getAccountTokenAddress() view returns (address)',
  'function grantPermission(uint256 accountId, bytes32 permission, address target)',
  'function hasPermission(uint256 accountId, bytes32 permission, address target) view returns (bool)',
  'function notifyAccountTransfer(address to, uint256 accountId)',
  'function renouncePermission(uint256 accountId, bytes32 permission)',
  'function revokePermission(uint256 accountId, bytes32 permission, address target)',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'function getAssociatedSystem(bytes32 id) view returns (address proxy, bytes32 kind)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficientAccountCollateral(uint256 accountId, address collateralType, uint256 requestedAmount)',
  'error InvalidCollateral(address collateralType)',
  'error OutOfBounds()',
  'event CollateralConfigured(address indexed collateralType, address indexed priceFeed, uint256 targetCollateralizationRatio, uint256 minimumCollateralizationRatio, uint256 liquidationReward, bool indexed enabled)',
  'event CollateralDeposited(uint256 indexed accountId, address indexed collateralType, uint256 amount, address indexed sender)',
  'event CollateralWithdrawn(uint256 indexed accountId, address indexed collateralType, uint256 amount, address indexed sender)',
  'function configureCollateral(address collateralType, address priceFeed, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, bool enabled)',
  'function depositCollateral(uint256 accountId, address collateralType, uint256 amount)',
  'function getAccountAvailableCollateral(uint256 accountId, address collateralType) view returns (uint256)',
  'function getAccountCollateral(uint256 accountId, address collateralType) view returns (uint256 totalStaked, uint256 totalAssigned)',
  'function getCollateralConfiguration(address collateralType) view returns (tuple(bool enabled, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, address priceFeed, address tokenAddress))',
  'function getCollateralConfigurations(bool hideDisabled) view returns (tuple(bool enabled, uint256 targetCRatio, uint256 minimumCRatio, uint256 liquidationReward, address priceFeed, address tokenAddress)[])',
  'function withdrawCollateral(uint256 accountId, address collateralType, uint256 amount)',
  'error IneligibleForLiquidation(uint256 collateralValue, uint256 debt, uint256 currentCRatio, uint256 cratio)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error InvalidParameters(string incorrectParameter, string help)',
  'error MarketNotFound(uint256 marketId)',
  'error MaxDebtPerShareTooLow(uint256 marketId, int256 requestedMaxDebtPerShare, int256 maximumMaxDebtPerShare)',
  'error MustBeVaultLiquidated()',
  'error PoolNotFound(uint256 poolId)',
  'event Liquidation(uint256 indexed accountId, uint256 indexed poolId, address indexed collateralType, uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded)',
  'event VaultLiquidation(uint256 indexed poolId, address indexed collateralType, uint256 debtLiquidated, uint256 collateralLiquidated, uint256 amountRewarded)',
  'function isLiquidatable(uint256 accountId, uint256 poolId, address collateralType) returns (bool)',
  'function liquidate(uint256 accountId, uint256 poolId, address collateralType) returns (uint256 amountRewarded, uint256 debtLiquidated, uint256 collateralLiquidated)',
  'function liquidateVault(uint256 poolId, address collateralType, uint256 liquidateAsAccountId, uint256 maxUsd) returns (uint256 amountLiquidated, uint256 collateralRewarded)',
  'error MarketAlreadyRegistered(address market, uint256 existingMarketId)',
  'error MarketDepositNotApproved(address market, address from, uint256 requestedAmount, uint256 approvedAmount)',
  'error NotEnoughLiquidity(uint256 marketId, uint256 amount)',
  'event MarketRegistered(address indexed market, uint256 indexed marketId)',
  'event UsdDeposited(uint256 indexed marketId, address indexed target, uint256 amount, address indexed sender)',
  'event UsdWithdrawn(uint256 indexed marketId, address indexed target, uint256 amount, address indexed sender)',
  'function depositUsd(uint256 marketId, address target, uint256 amount)',
  'function getMarketCollateral(uint256 marketId) view returns (uint256)',
  'function getMarketDebtPerShare(uint256 marketId) returns (int256)',
  'function getMarketIssuance(uint256 marketId) view returns (int128)',
  'function getMarketReportedBalance(uint256 marketId) view returns (uint256)',
  'function getMarketTotalBalance(uint256 marketId) view returns (int256)',
  'function getWithdrawableUsd(uint256 marketId) view returns (uint256)',
  'function registerMarket(address market) returns (uint256 marketId)',
  'function withdrawUsd(uint256 marketId, address target, uint256 amount)',
  'function multicall(bytes[] data) payable returns (bytes[] results)',
  'event PoolApprovedAdded(uint256 poolId)',
  'event PoolApprovedRemoved(uint256 poolId)',
  'event PreferredPoolSet(uint256 poolId)',
  'function addApprovedPool(uint256 poolId)',
  'function getApprovedPools() view returns (uint256[])',
  'function getPreferredPool() view returns (uint256)',
  'function removeApprovedPool(uint256 poolId)',
  'function setPreferredPool(uint256 poolId)',
  'error PoolAlreadyExists(uint256 poolId)',
  'event NominatedPoolOwner(uint256 indexed poolId, address indexed owner)',
  'event PoolConfigurationSet(uint256 indexed poolId, uint256[] indexed markets, uint256[] indexed weights, address executedBy)',
  'event PoolCreated(uint256 indexed poolId, address indexed owner)',
  'event PoolNameUpdated(uint256 indexed poolId, string indexed name, address indexed sender)',
  'event PoolNominationRenounced(uint256 indexed poolId, address indexed owner)',
  'event PoolNominationRevoked(uint256 indexed poolId, address indexed owner)',
  'event PoolOwnershipAccepted(uint256 indexed poolId, address indexed owner)',
  'event PoolOwnershipRenounced(uint256 indexed poolId, address indexed owner)',
  'function acceptPoolOwnership(uint256 poolId)',
  'function createPool(uint256 requestedPoolId, address owner)',
  'function getMinLiquidityRatio() view returns (uint256)',
  'function getNominatedPoolOwner(uint256 poolId) view returns (address)',
  'function getPoolConfiguration(uint256 poolId) view returns (uint256[], uint256[], int256[])',
  'function getPoolName(uint256 poolId) view returns (string poolName)',
  'function getPoolOwner(uint256 poolId) view returns (address)',
  'function nominatePoolOwner(address nominatedOwner, uint256 poolId)',
  'function renouncePoolNomination(uint256 poolId)',
  'function renouncePoolOwnership(uint256 poolId)',
  'function setMinLiquidityRatio(uint256 minLiquidityRatio)',
  'function setPoolConfiguration(uint256 poolId, uint256[] markets, uint256[] weights, int256[] maxDebtShareValues)',
  'function setPoolName(uint256 poolId, string name)',
  'error InsufficientRewardAllocation(uint256 requestedAmount, uint256 remainingAllocation)',
  'function getRewardAllocation(uint256 poolId) view returns (uint256)',
  'function payout(uint256 poolId, address, address to, uint256 amount) returns (bool)',
  'function setRewardAllocation(uint256 poolId, uint256 allocation)',
  'function mintInitialSystemToken(address to, uint256 amount)',
  'error InsufficientCollateralRatio(uint256 collateralValue, uint256 debt, uint256 ratio, uint256 minRatio)',
  'error InsufficientDebt(int256 currentDebt)',
  'error InvalidLeverage(uint256 leverage)',
  'event DelegationUpdated(uint256 indexed accountId, uint256 indexed poolId, address collateralType, uint256 amount, uint256 leverage, address indexed sender)',
  'event UsdBurned(uint256 indexed accountId, uint256 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'event UsdMinted(uint256 indexed accountId, uint256 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'function burnUsd(uint256 accountId, uint256 poolId, address collateralType, uint256 amount)',
  'function delegateCollateral(uint256 accountId, uint256 poolId, address collateralType, uint256 collateralAmount, uint256 leverage)',
  'function getPosition(uint256 accountId, uint256 poolId, address collateralType) returns (uint256 collateralAmount, uint256 collateralValue, int256 debt, uint256 collateralizationRatio)',
  'function getPositionCollateral(uint256 accountId, uint256 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getPositionCollateralizationRatio(uint256 accountId, uint256 poolId, address collateralType) returns (uint256)',
  'function getPositionDebt(uint256 accountId, uint256 poolId, address collateralType) returns (int256)',
  'function getVaultCollateral(uint256 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getVaultCollateralRatio(uint256 poolId, address collateralType) returns (uint256)',
  'function getVaultDebt(uint256 poolId, address collateralType) returns (int256)',
  'function mintUsd(uint256 accountId, uint256 poolId, address collateralType, uint256 amount)',
  'event RewardDistributionSet(uint256 indexed poolId, address indexed token, uint256 indexed index, address distributor, uint256 totalRewarded, uint256 start, uint256 duration)',
  'event RewardsClaimed(uint256 indexed poolId, address indexed token, uint256 indexed accountId, uint256 index, uint256 amountClaimed)',
  'function claimRewards(uint256 poolId, address collateralType, uint256 accountId) returns (uint256[])',
  'function distributeRewards(uint256 poolId, address collateralType, uint256 index, address distributor, uint256 amount, uint256 start, uint256 duration)',
  'function getAvailableRewards(uint256 poolId, address collateralType, uint256 accountId) returns (uint256[])',
  'function getCurrentRewardAccumulation(uint256 poolId, address collateralType) view returns (uint256[])',
  'function mockAccountRBACMixinDeposit(uint256 accountId, uint256 newDepositMock)',
  'function mockAccountRBACMixinGetDepositMock() view returns (uint256)',
  'function mockAccountRBACMixinGetMintMock() view returns (uint256)',
  'function mockAccountRBACMixinMint(uint256 accountId, uint256 newMintMock)',
];
