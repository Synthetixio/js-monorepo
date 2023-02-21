// !!! DO NOT EDIT !!! Automatically generated file

export const address = '0x66890372Ce7f316e7c4Cd03CF88022F1F8CCF296';
export const abi = [
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
  'function nominateNewOwner(address newNominatedOwner)',
  'function nominatedOwner() view returns (address)',
  'function owner() view returns (address)',
  'function renounceNomination()',
  'function simulateUpgradeTo(address newImplementation)',
  'function upgradeTo(address newImplementation)',
  'error ValueAlreadyInSet()',
  'error ValueNotInSet()',
  'event FeatureFlagAllowAllSet(bytes32 indexed feature, bool allowAll)',
  'event FeatureFlagAllowlistAdded(bytes32 indexed feature, address account)',
  'event FeatureFlagAllowlistRemoved(bytes32 indexed feature, address account)',
  'event FeatureFlagDeniersReset(bytes32 indexed feature, address[] deniers)',
  'event FeatureFlagDenyAllSet(bytes32 indexed feature, bool denyAll)',
  'function addToFeatureFlagAllowlist(bytes32 feature, address account)',
  'function getDeniers(bytes32 feature) view returns (address[])',
  'function getFeatureFlagAllowAll(bytes32 feature) view returns (bool)',
  'function getFeatureFlagAllowlist(bytes32 feature) view returns (address[])',
  'function getFeatureFlagDenyAll(bytes32 feature) view returns (bool)',
  'function isFeatureAllowed(bytes32 feature, address account) view returns (bool)',
  'function removeFromFeatureFlagAllowlist(bytes32 feature, address account)',
  'function setDeniers(bytes32 feature, address[] deniers)',
  'function setFeatureFlagAllowAll(bytes32 feature, bool allowAll)',
  'function setFeatureFlagDenyAll(bytes32 feature, bool denyAll)',
  'error FeatureUnavailable(bytes32 which)',
  'error InvalidPermission(bytes32 permission)',
  'error OnlyAccountTokenProxy(address origin)',
  'error PermissionDenied(uint128 accountId, bytes32 permission, address target)',
  'error PermissionNotGranted(uint128 accountId, bytes32 permission, address user)',
  'error PositionOutOfBounds()',
  'event AccountCreated(uint128 indexed accountId, address indexed owner)',
  'event PermissionGranted(uint128 indexed accountId, bytes32 indexed permission, address indexed user, address sender)',
  'event PermissionRevoked(uint128 indexed accountId, bytes32 indexed permission, address indexed user, address sender)',
  'function createAccount(uint128 requestedAccountId)',
  'function getAccountLastInteraction(uint128 accountId) view returns (uint256)',
  'function getAccountOwner(uint128 accountId) view returns (address)',
  'function getAccountPermissions(uint128 accountId) view returns (tuple(address user, bytes32[] permissions)[] accountPerms)',
  'function getAccountTokenAddress() view returns (address)',
  'function grantPermission(uint128 accountId, bytes32 permission, address user)',
  'function hasPermission(uint128 accountId, bytes32 permission, address user) view returns (bool)',
  'function isAuthorized(uint128 accountId, bytes32 permission, address user) view returns (bool)',
  'function notifyAccountTransfer(address to, uint128 accountId)',
  'function renouncePermission(uint128 accountId, bytes32 permission)',
  'function revokePermission(uint128 accountId, bytes32 permission, address user)',
  'error AccountNotFound(uint128 accountId)',
  'error EmptyDistribution()',
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
  'error MissingAssociatedSystem(bytes32 id)',
  'event AssociatedSystemSet(bytes32 indexed kind, bytes32 indexed id, address proxy, address impl)',
  'function getAssociatedSystem(bytes32 id) view returns (address addr, bytes32 kind)',
  'function initOrUpgradeNft(bytes32 id, string name, string symbol, string uri, address impl)',
  'function initOrUpgradeToken(bytes32 id, string name, string symbol, uint8 decimals, address impl)',
  'function registerUnmanagedSystem(bytes32 id, address endpoint)',
  'error AccountActivityTimeoutPending(uint128 accountId, uint256 currentTime, uint256 requiredTime)',
  'error CollateralDepositDisabled(address collateralType)',
  'error CollateralNotFound()',
  'error FailedTransfer(address from, address to, uint256 value)',
  'error InsufficientAccountCollateral(uint256 amount)',
  'error InsufficientAllowance(uint256 required, uint256 existing)',
  'error InvalidParameter(string parameter, string reason)',
  'error OverflowUint256ToUint64()',
  'error PrecisionLost(uint256 tokenAmount, uint8 decimals)',
  'event CollateralLockCreated(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, uint64 expireTimestamp)',
  'event CollateralLockExpired(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, uint64 expireTimestamp)',
  'event Deposited(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'event Withdrawn(uint128 indexed accountId, address indexed collateralType, uint256 tokenAmount, address indexed sender)',
  'function cleanExpiredLocks(uint128 accountId, address collateralType, uint256 offset, uint256 count) returns (uint256 cleared)',
  'function createLock(uint128 accountId, address collateralType, uint256 amount, uint64 expireTimestamp)',
  'function deposit(uint128 accountId, address collateralType, uint256 tokenAmount)',
  'function getAccountAvailableCollateral(uint128 accountId, address collateralType) view returns (uint256)',
  'function getAccountCollateral(uint128 accountId, address collateralType) view returns (uint256 totalDeposited, uint256 totalAssigned, uint256 totalLocked)',
  'function getLocks(uint128 accountId, address collateralType, uint256 offset, uint256 count) view returns (tuple(uint128 amountD18, uint64 lockExpirationTime)[] locks)',
  'function withdraw(uint128 accountId, address collateralType, uint256 tokenAmount)',
  'event CollateralConfigured(address indexed collateralType, tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18) config)',
  'function configureCollateral(tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18) config)',
  'function getCollateralConfiguration(address collateralType) view returns (tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18))',
  'function getCollateralConfigurations(bool hideDisabled) view returns (tuple(bool depositingEnabled, uint256 issuanceRatioD18, uint256 liquidationRatioD18, uint256 liquidationRewardD18, bytes32 oracleNodeId, address tokenAddress, uint256 minDelegationD18)[])',
  'function getCollateralPrice(address collateralType) view returns (uint256)',
  'error InsufficientDebt(int256 currentDebt)',
  'error PoolNotFound(uint128 poolId)',
  'event UsdBurned(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'event UsdMinted(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, address indexed sender)',
  'function burnUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'function mintUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)',
  'error CannotScaleEmptyMapping()',
  'error IneligibleForLiquidation(uint256 collateralValue, int256 debt, uint256 currentCRatio, uint256 cratio)',
  'error InsufficientMappedAmount()',
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
  'event MaximumMarketCollateralConfigured(uint128 indexed marketId, address indexed collateralType, uint256 systemAmount, address indexed owner)',
  'function configureMaximumMarketCollateral(uint128 marketId, address collateralType, uint256 amount)',
  'function depositMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
  'function getMarketCollateralAmount(uint128 marketId, address collateralType) view returns (uint256 collateralAmountD18)',
  'function getMarketCollateralValue(uint128 marketId) view returns (uint256)',
  'function getMaximumMarketCollateral(uint128 marketId, address collateralType) view returns (uint256)',
  'function withdrawMarketCollateral(uint128 marketId, address collateralType, uint256 tokenAmount)',
  'error IncorrectMarketInterface(address market)',
  'error NotEnoughLiquidity(uint128 marketId, uint256 amount)',
  'event MarketRegistered(address indexed market, uint128 indexed marketId, address indexed sender)',
  'event MarketUsdDeposited(uint128 indexed marketId, address indexed target, uint256 amount, address indexed market)',
  'event MarketUsdWithdrawn(uint128 indexed marketId, address indexed target, uint256 amount, address indexed market)',
  'function depositMarketUsd(uint128 marketId, address target, uint256 amount)',
  'function distributeDebtToPools(uint128 marketId, uint256 maxIter) returns (bool)',
  'function getMarketCollateral(uint128 marketId) view returns (uint256)',
  'function getMarketDebtPerShare(uint128 marketId) returns (int256)',
  'function getMarketNetIssuance(uint128 marketId) view returns (int128)',
  'function getMarketReportedDebt(uint128 marketId) view returns (uint256)',
  'function getMarketTotalDebt(uint128 marketId) view returns (int256)',
  'function getWithdrawableMarketUsd(uint128 marketId) view returns (uint256)',
  'function isMarketCapacityLocked(uint128 marketId) view returns (bool)',
  'function registerMarket(address market) returns (uint128 marketId)',
  'function withdrawMarketUsd(uint128 marketId, address target, uint256 amount)',
  'function multicall(bytes[] data) payable returns (bytes[] results)',
  'event PoolApprovedAdded(uint256 poolId)',
  'event PoolApprovedRemoved(uint256 poolId)',
  'event PreferredPoolSet(uint256 poolId)',
  'function addApprovedPool(uint128 poolId)',
  'function getApprovedPools() view returns (uint256[])',
  'function getPreferredPool() view returns (uint128)',
  'function removeApprovedPool(uint128 poolId)',
  'function setPreferredPool(uint128 poolId)',
  'error CapacityLocked(uint256 marketId)',
  'error PoolAlreadyExists(uint128 poolId)',
  'event PoolConfigurationSet(uint128 indexed poolId, tuple(uint128 marketId, uint128 weightD18, int128 maxDebtShareValueD18)[] markets, address indexed sender)',
  'event PoolCreated(uint128 indexed poolId, address indexed owner, address indexed sender)',
  'event PoolNameUpdated(uint128 indexed poolId, string name, address indexed sender)',
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
  'error OverflowUint256ToUint32()',
  'error OverflowUint32ToInt32()',
  'error OverflowUint64ToInt64()',
  'error RewardDistributorNotFound()',
  'error RewardUnavailable(address distributor)',
  'event RewardsClaimed(uint128 indexed accountId, uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount)',
  'event RewardsDistributed(uint128 indexed poolId, address indexed collateralType, address distributor, uint256 amount, uint256 start, uint256 duration)',
  'event RewardsDistributorRegistered(uint128 indexed poolId, address indexed collateralType, address indexed distributor)',
  'event RewardsDistributorRemoved(uint128 indexed poolId, address indexed collateralType, address indexed distributor)',
  'function claimRewards(uint128 accountId, uint128 poolId, address collateralType, address distributor) returns (uint256)',
  'function distributeRewards(uint128 poolId, address collateralType, uint256 amount, uint64 start, uint32 duration)',
  'function getRewardRate(uint128 poolId, address collateralType, address distributor) view returns (uint256)',
  'function registerRewardsDistributor(uint128 poolId, address collateralType, address distributor)',
  'function removeRewardsDistributor(uint128 poolId, address collateralType, address distributor)',
  'function updateRewards(uint128 poolId, address collateralType, uint128 accountId) returns (uint256[], address[])',
  'function configureOracleManager(address oracleManagerAddress)',
  'function getConfig(bytes32 k) view returns (bytes32 v)',
  'function registerCcip(address ccipSend, address ccipReceive, address ccipTokenPool)',
  'function setConfig(bytes32 k, bytes32 v)',
  'error InsufficientDelegation(uint256 minDelegation)',
  'error InvalidCollateralAmount()',
  'error InvalidLeverage(uint256 leverage)',
  'event DelegationUpdated(uint128 indexed accountId, uint128 indexed poolId, address collateralType, uint256 amount, uint256 leverage, address indexed sender)',
  'function delegateCollateral(uint128 accountId, uint128 poolId, address collateralType, uint256 newCollateralAmountD18, uint256 leverage)',
  'function getPosition(uint128 accountId, uint128 poolId, address collateralType) returns (uint256 collateralAmount, uint256 collateralValue, int256 debt, uint256 collateralizationRatio)',
  'function getPositionCollateral(uint128 accountId, uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getPositionCollateralRatio(uint128 accountId, uint128 poolId, address collateralType) returns (uint256)',
  'function getPositionDebt(uint128 accountId, uint128 poolId, address collateralType) returns (int256)',
  'function getVaultCollateral(uint128 poolId, address collateralType) view returns (uint256 amount, uint256 value)',
  'function getVaultCollateralRatio(uint128 poolId, address collateralType) returns (uint256)',
  'function getVaultDebt(uint128 poolId, address collateralType) returns (int256)',
];
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from './common';

export declare namespace IAccountModule {
  export type AccountPermissionsStruct = {
    user: PromiseOrValue<string>;
    permissions: PromiseOrValue<BytesLike>[];
  };

  export type AccountPermissionsStructOutput = [string, string[]] & {
    user: string;
    permissions: string[];
  };
}

export declare namespace CollateralLock {
  export type DataStruct = {
    amountD18: PromiseOrValue<BigNumberish>;
    lockExpirationTime: PromiseOrValue<BigNumberish>;
  };

  export type DataStructOutput = [BigNumber, BigNumber] & {
    amountD18: BigNumber;
    lockExpirationTime: BigNumber;
  };
}

export declare namespace CollateralConfiguration {
  export type DataStruct = {
    depositingEnabled: PromiseOrValue<boolean>;
    issuanceRatioD18: PromiseOrValue<BigNumberish>;
    liquidationRatioD18: PromiseOrValue<BigNumberish>;
    liquidationRewardD18: PromiseOrValue<BigNumberish>;
    oracleNodeId: PromiseOrValue<BytesLike>;
    tokenAddress: PromiseOrValue<string>;
    minDelegationD18: PromiseOrValue<BigNumberish>;
  };

  export type DataStructOutput = [
    boolean,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    BigNumber
  ] & {
    depositingEnabled: boolean;
    issuanceRatioD18: BigNumber;
    liquidationRatioD18: BigNumber;
    liquidationRewardD18: BigNumber;
    oracleNodeId: string;
    tokenAddress: string;
    minDelegationD18: BigNumber;
  };
}

export declare namespace ILiquidationModule {
  export type LiquidationDataStruct = {
    debtLiquidated: PromiseOrValue<BigNumberish>;
    collateralLiquidated: PromiseOrValue<BigNumberish>;
    amountRewarded: PromiseOrValue<BigNumberish>;
  };

  export type LiquidationDataStructOutput = [BigNumber, BigNumber, BigNumber] & {
    debtLiquidated: BigNumber;
    collateralLiquidated: BigNumber;
    amountRewarded: BigNumber;
  };
}

export declare namespace MarketConfiguration {
  export type DataStruct = {
    marketId: PromiseOrValue<BigNumberish>;
    weightD18: PromiseOrValue<BigNumberish>;
    maxDebtShareValueD18: PromiseOrValue<BigNumberish>;
  };

  export type DataStructOutput = [BigNumber, BigNumber, BigNumber] & {
    marketId: BigNumber;
    weightD18: BigNumber;
    maxDebtShareValueD18: BigNumber;
  };
}

export interface CoreProxyInterface extends utils.Interface {
  functions: {
    'acceptOwnership()': FunctionFragment;
    'getImplementation()': FunctionFragment;
    'nominateNewOwner(address)': FunctionFragment;
    'nominatedOwner()': FunctionFragment;
    'owner()': FunctionFragment;
    'renounceNomination()': FunctionFragment;
    'simulateUpgradeTo(address)': FunctionFragment;
    'upgradeTo(address)': FunctionFragment;
    'addToFeatureFlagAllowlist(bytes32,address)': FunctionFragment;
    'getDeniers(bytes32)': FunctionFragment;
    'getFeatureFlagAllowAll(bytes32)': FunctionFragment;
    'getFeatureFlagAllowlist(bytes32)': FunctionFragment;
    'getFeatureFlagDenyAll(bytes32)': FunctionFragment;
    'isFeatureAllowed(bytes32,address)': FunctionFragment;
    'removeFromFeatureFlagAllowlist(bytes32,address)': FunctionFragment;
    'setDeniers(bytes32,address[])': FunctionFragment;
    'setFeatureFlagAllowAll(bytes32,bool)': FunctionFragment;
    'setFeatureFlagDenyAll(bytes32,bool)': FunctionFragment;
    'createAccount(uint128)': FunctionFragment;
    'getAccountLastInteraction(uint128)': FunctionFragment;
    'getAccountOwner(uint128)': FunctionFragment;
    'getAccountPermissions(uint128)': FunctionFragment;
    'getAccountTokenAddress()': FunctionFragment;
    'grantPermission(uint128,bytes32,address)': FunctionFragment;
    'hasPermission(uint128,bytes32,address)': FunctionFragment;
    'isAuthorized(uint128,bytes32,address)': FunctionFragment;
    'notifyAccountTransfer(address,uint128)': FunctionFragment;
    'renouncePermission(uint128,bytes32)': FunctionFragment;
    'revokePermission(uint128,bytes32,address)': FunctionFragment;
    'associateDebt(uint128,uint128,address,uint128,uint256)': FunctionFragment;
    'getAssociatedSystem(bytes32)': FunctionFragment;
    'initOrUpgradeNft(bytes32,string,string,string,address)': FunctionFragment;
    'initOrUpgradeToken(bytes32,string,string,uint8,address)': FunctionFragment;
    'registerUnmanagedSystem(bytes32,address)': FunctionFragment;
    'cleanExpiredLocks(uint128,address,uint256,uint256)': FunctionFragment;
    'createLock(uint128,address,uint256,uint64)': FunctionFragment;
    'deposit(uint128,address,uint256)': FunctionFragment;
    'getAccountAvailableCollateral(uint128,address)': FunctionFragment;
    'getAccountCollateral(uint128,address)': FunctionFragment;
    'getLocks(uint128,address,uint256,uint256)': FunctionFragment;
    'withdraw(uint128,address,uint256)': FunctionFragment;
    'configureCollateral((bool,uint256,uint256,uint256,bytes32,address,uint256))': FunctionFragment;
    'getCollateralConfiguration(address)': FunctionFragment;
    'getCollateralConfigurations(bool)': FunctionFragment;
    'getCollateralPrice(address)': FunctionFragment;
    'burnUsd(uint128,uint128,address,uint256)': FunctionFragment;
    'mintUsd(uint128,uint128,address,uint256)': FunctionFragment;
    'isPositionLiquidatable(uint128,uint128,address)': FunctionFragment;
    'isVaultLiquidatable(uint128,address)': FunctionFragment;
    'liquidate(uint128,uint128,address,uint128)': FunctionFragment;
    'liquidateVault(uint128,address,uint128,uint256)': FunctionFragment;
    'configureMaximumMarketCollateral(uint128,address,uint256)': FunctionFragment;
    'depositMarketCollateral(uint128,address,uint256)': FunctionFragment;
    'getMarketCollateralAmount(uint128,address)': FunctionFragment;
    'getMarketCollateralValue(uint128)': FunctionFragment;
    'getMaximumMarketCollateral(uint128,address)': FunctionFragment;
    'withdrawMarketCollateral(uint128,address,uint256)': FunctionFragment;
    'depositMarketUsd(uint128,address,uint256)': FunctionFragment;
    'distributeDebtToPools(uint128,uint256)': FunctionFragment;
    'getMarketCollateral(uint128)': FunctionFragment;
    'getMarketDebtPerShare(uint128)': FunctionFragment;
    'getMarketNetIssuance(uint128)': FunctionFragment;
    'getMarketReportedDebt(uint128)': FunctionFragment;
    'getMarketTotalDebt(uint128)': FunctionFragment;
    'getWithdrawableMarketUsd(uint128)': FunctionFragment;
    'isMarketCapacityLocked(uint128)': FunctionFragment;
    'registerMarket(address)': FunctionFragment;
    'withdrawMarketUsd(uint128,address,uint256)': FunctionFragment;
    'multicall(bytes[])': FunctionFragment;
    'addApprovedPool(uint128)': FunctionFragment;
    'getApprovedPools()': FunctionFragment;
    'getPreferredPool()': FunctionFragment;
    'removeApprovedPool(uint128)': FunctionFragment;
    'setPreferredPool(uint128)': FunctionFragment;
    'acceptPoolOwnership(uint128)': FunctionFragment;
    'createPool(uint128,address)': FunctionFragment;
    'getMinLiquidityRatio()': FunctionFragment;
    'getNominatedPoolOwner(uint128)': FunctionFragment;
    'getPoolConfiguration(uint128)': FunctionFragment;
    'getPoolName(uint128)': FunctionFragment;
    'getPoolOwner(uint128)': FunctionFragment;
    'nominatePoolOwner(address,uint128)': FunctionFragment;
    'renouncePoolNomination(uint128)': FunctionFragment;
    'revokePoolNomination(uint128)': FunctionFragment;
    'setMinLiquidityRatio(uint256)': FunctionFragment;
    'setPoolConfiguration(uint128,(uint128,uint128,int128)[])': FunctionFragment;
    'setPoolName(uint128,string)': FunctionFragment;
    'claimRewards(uint128,uint128,address,address)': FunctionFragment;
    'distributeRewards(uint128,address,uint256,uint64,uint32)': FunctionFragment;
    'getRewardRate(uint128,address,address)': FunctionFragment;
    'registerRewardsDistributor(uint128,address,address)': FunctionFragment;
    'removeRewardsDistributor(uint128,address,address)': FunctionFragment;
    'updateRewards(uint128,address,uint128)': FunctionFragment;
    'configureOracleManager(address)': FunctionFragment;
    'getConfig(bytes32)': FunctionFragment;
    'registerCcip(address,address,address)': FunctionFragment;
    'setConfig(bytes32,bytes32)': FunctionFragment;
    'delegateCollateral(uint128,uint128,address,uint256,uint256)': FunctionFragment;
    'getPosition(uint128,uint128,address)': FunctionFragment;
    'getPositionCollateral(uint128,uint128,address)': FunctionFragment;
    'getPositionCollateralRatio(uint128,uint128,address)': FunctionFragment;
    'getPositionDebt(uint128,uint128,address)': FunctionFragment;
    'getVaultCollateral(uint128,address)': FunctionFragment;
    'getVaultCollateralRatio(uint128,address)': FunctionFragment;
    'getVaultDebt(uint128,address)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'acceptOwnership'
      | 'getImplementation'
      | 'nominateNewOwner'
      | 'nominatedOwner'
      | 'owner'
      | 'renounceNomination'
      | 'simulateUpgradeTo'
      | 'upgradeTo'
      | 'addToFeatureFlagAllowlist'
      | 'getDeniers'
      | 'getFeatureFlagAllowAll'
      | 'getFeatureFlagAllowlist'
      | 'getFeatureFlagDenyAll'
      | 'isFeatureAllowed'
      | 'removeFromFeatureFlagAllowlist'
      | 'setDeniers'
      | 'setFeatureFlagAllowAll'
      | 'setFeatureFlagDenyAll'
      | 'createAccount'
      | 'getAccountLastInteraction'
      | 'getAccountOwner'
      | 'getAccountPermissions'
      | 'getAccountTokenAddress'
      | 'grantPermission'
      | 'hasPermission'
      | 'isAuthorized'
      | 'notifyAccountTransfer'
      | 'renouncePermission'
      | 'revokePermission'
      | 'associateDebt'
      | 'getAssociatedSystem'
      | 'initOrUpgradeNft'
      | 'initOrUpgradeToken'
      | 'registerUnmanagedSystem'
      | 'cleanExpiredLocks'
      | 'createLock'
      | 'deposit'
      | 'getAccountAvailableCollateral'
      | 'getAccountCollateral'
      | 'getLocks'
      | 'withdraw'
      | 'configureCollateral'
      | 'getCollateralConfiguration'
      | 'getCollateralConfigurations'
      | 'getCollateralPrice'
      | 'burnUsd'
      | 'mintUsd'
      | 'isPositionLiquidatable'
      | 'isVaultLiquidatable'
      | 'liquidate'
      | 'liquidateVault'
      | 'configureMaximumMarketCollateral'
      | 'depositMarketCollateral'
      | 'getMarketCollateralAmount'
      | 'getMarketCollateralValue'
      | 'getMaximumMarketCollateral'
      | 'withdrawMarketCollateral'
      | 'depositMarketUsd'
      | 'distributeDebtToPools'
      | 'getMarketCollateral'
      | 'getMarketDebtPerShare'
      | 'getMarketNetIssuance'
      | 'getMarketReportedDebt'
      | 'getMarketTotalDebt'
      | 'getWithdrawableMarketUsd'
      | 'isMarketCapacityLocked'
      | 'registerMarket'
      | 'withdrawMarketUsd'
      | 'multicall'
      | 'addApprovedPool'
      | 'getApprovedPools'
      | 'getPreferredPool'
      | 'removeApprovedPool'
      | 'setPreferredPool'
      | 'acceptPoolOwnership'
      | 'createPool'
      | 'getMinLiquidityRatio'
      | 'getNominatedPoolOwner'
      | 'getPoolConfiguration'
      | 'getPoolName'
      | 'getPoolOwner'
      | 'nominatePoolOwner'
      | 'renouncePoolNomination'
      | 'revokePoolNomination'
      | 'setMinLiquidityRatio'
      | 'setPoolConfiguration'
      | 'setPoolName'
      | 'claimRewards'
      | 'distributeRewards'
      | 'getRewardRate'
      | 'registerRewardsDistributor'
      | 'removeRewardsDistributor'
      | 'updateRewards'
      | 'configureOracleManager'
      | 'getConfig'
      | 'registerCcip'
      | 'setConfig'
      | 'delegateCollateral'
      | 'getPosition'
      | 'getPositionCollateral'
      | 'getPositionCollateralRatio'
      | 'getPositionDebt'
      | 'getVaultCollateral'
      | 'getVaultCollateralRatio'
      | 'getVaultDebt'
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'acceptOwnership', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getImplementation', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'nominateNewOwner',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'nominatedOwner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'renounceNomination', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'simulateUpgradeTo',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'upgradeTo', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'addToFeatureFlagAllowlist',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'getDeniers', values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: 'getFeatureFlagAllowAll',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getFeatureFlagAllowlist',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getFeatureFlagDenyAll',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'isFeatureAllowed',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'removeFromFeatureFlagAllowlist',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setDeniers',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'setFeatureFlagAllowAll',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setFeatureFlagDenyAll',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: 'createAccount',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAccountLastInteraction',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAccountOwner',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAccountPermissions',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'getAccountTokenAddress', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'grantPermission',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'hasPermission',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'isAuthorized',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'notifyAccountTransfer',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'renouncePermission',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'revokePermission',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'associateDebt',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAssociatedSystem',
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'initOrUpgradeNft',
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'initOrUpgradeToken',
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'registerUnmanagedSystem',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'cleanExpiredLocks',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'createLock',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'deposit',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAccountAvailableCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getAccountCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getLocks',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdraw',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'configureCollateral',
    values: [CollateralConfiguration.DataStruct]
  ): string;
  encodeFunctionData(
    functionFragment: 'getCollateralConfiguration',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getCollateralConfigurations',
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getCollateralPrice',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'burnUsd',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'mintUsd',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'isPositionLiquidatable',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'isVaultLiquidatable',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'liquidate',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'liquidateVault',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'configureMaximumMarketCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'depositMarketCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketCollateralAmount',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketCollateralValue',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMaximumMarketCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawMarketCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'depositMarketUsd',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'distributeDebtToPools',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketCollateral',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketDebtPerShare',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketNetIssuance',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketReportedDebt',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getMarketTotalDebt',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getWithdrawableMarketUsd',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'isMarketCapacityLocked',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'registerMarket', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'withdrawMarketUsd',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'multicall', values: [PromiseOrValue<BytesLike>[]]): string;
  encodeFunctionData(
    functionFragment: 'addApprovedPool',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: 'getApprovedPools', values?: undefined): string;
  encodeFunctionData(functionFragment: 'getPreferredPool', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'removeApprovedPool',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setPreferredPool',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'acceptPoolOwnership',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'createPool',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'getMinLiquidityRatio', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'getNominatedPoolOwner',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPoolConfiguration',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPoolName',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPoolOwner',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'nominatePoolOwner',
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'renouncePoolNomination',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'revokePoolNomination',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setMinLiquidityRatio',
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setPoolConfiguration',
    values: [PromiseOrValue<BigNumberish>, MarketConfiguration.DataStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: 'setPoolName',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'claimRewards',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'distributeRewards',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'getRewardRate',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'registerRewardsDistributor',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'removeRewardsDistributor',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'updateRewards',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: 'configureOracleManager',
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: 'getConfig', values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: 'registerCcip',
    values: [PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'setConfig',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: 'delegateCollateral',
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPosition',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPositionCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPositionCollateralRatio',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getPositionDebt',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVaultCollateral',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVaultCollateralRatio',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: 'getVaultDebt',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: 'acceptOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getImplementation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominateNewOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatedOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'simulateUpgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'upgradeTo', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addToFeatureFlagAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getDeniers', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeatureFlagAllowAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeatureFlagAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getFeatureFlagDenyAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isFeatureAllowed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeFromFeatureFlagAllowlist', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setDeniers', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeatureFlagAllowAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setFeatureFlagDenyAll', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createAccount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountLastInteraction', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountPermissions', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountTokenAddress', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'grantPermission', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'hasPermission', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isAuthorized', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'notifyAccountTransfer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renouncePermission', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'revokePermission', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'associateDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAssociatedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeNft', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initOrUpgradeToken', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerUnmanagedSystem', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'cleanExpiredLocks', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createLock', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'deposit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountAvailableCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAccountCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getLocks', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'configureCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralConfiguration', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralConfigurations', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCollateralPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'burnUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isPositionLiquidatable', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isVaultLiquidatable', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'liquidateVault', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'configureMaximumMarketCollateral',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'depositMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketCollateralAmount', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketCollateralValue', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMaximumMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'depositMarketUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'distributeDebtToPools', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketDebtPerShare', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketNetIssuance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketReportedDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMarketTotalDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getWithdrawableMarketUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isMarketCapacityLocked', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerMarket', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawMarketUsd', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'multicall', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addApprovedPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getApprovedPools', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPreferredPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeApprovedPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPreferredPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'acceptPoolOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'createPool', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getMinLiquidityRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getNominatedPoolOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPoolConfiguration', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPoolName', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPoolOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nominatePoolOwner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renouncePoolNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'revokePoolNomination', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMinLiquidityRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPoolConfiguration', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPoolName', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'claimRewards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'distributeRewards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getRewardRate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerRewardsDistributor', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'removeRewardsDistributor', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'updateRewards', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'configureOracleManager', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getConfig', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'registerCcip', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setConfig', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'delegateCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPosition', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPositionCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPositionCollateralRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPositionDebt', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVaultCollateral', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVaultCollateralRatio', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getVaultDebt', data: BytesLike): Result;

  events: {
    'OwnerChanged(address,address)': EventFragment;
    'OwnerNominated(address)': EventFragment;
    'Upgraded(address,address)': EventFragment;
    'FeatureFlagAllowAllSet(bytes32,bool)': EventFragment;
    'FeatureFlagAllowlistAdded(bytes32,address)': EventFragment;
    'FeatureFlagAllowlistRemoved(bytes32,address)': EventFragment;
    'FeatureFlagDeniersReset(bytes32,address[])': EventFragment;
    'FeatureFlagDenyAllSet(bytes32,bool)': EventFragment;
    'AccountCreated(uint128,address)': EventFragment;
    'PermissionGranted(uint128,bytes32,address,address)': EventFragment;
    'PermissionRevoked(uint128,bytes32,address,address)': EventFragment;
    'DebtAssociated(uint128,uint128,address,uint128,uint256,int256)': EventFragment;
    'AssociatedSystemSet(bytes32,bytes32,address,address)': EventFragment;
    'CollateralLockCreated(uint128,address,uint256,uint64)': EventFragment;
    'CollateralLockExpired(uint128,address,uint256,uint64)': EventFragment;
    'Deposited(uint128,address,uint256,address)': EventFragment;
    'Withdrawn(uint128,address,uint256,address)': EventFragment;
    'CollateralConfigured(address,tuple)': EventFragment;
    'UsdBurned(uint128,uint128,address,uint256,address)': EventFragment;
    'UsdMinted(uint128,uint128,address,uint256,address)': EventFragment;
    'Liquidation(uint128,uint128,address,tuple,uint128,address)': EventFragment;
    'VaultLiquidation(uint128,address,tuple,uint128,address)': EventFragment;
    'MarketCollateralDeposited(uint128,address,uint256,address)': EventFragment;
    'MarketCollateralWithdrawn(uint128,address,uint256,address)': EventFragment;
    'MaximumMarketCollateralConfigured(uint128,address,uint256,address)': EventFragment;
    'MarketRegistered(address,uint128,address)': EventFragment;
    'MarketUsdDeposited(uint128,address,uint256,address)': EventFragment;
    'MarketUsdWithdrawn(uint128,address,uint256,address)': EventFragment;
    'PoolApprovedAdded(uint256)': EventFragment;
    'PoolApprovedRemoved(uint256)': EventFragment;
    'PreferredPoolSet(uint256)': EventFragment;
    'PoolConfigurationSet(uint128,tuple[],address)': EventFragment;
    'PoolCreated(uint128,address,address)': EventFragment;
    'PoolNameUpdated(uint128,string,address)': EventFragment;
    'PoolNominationRenounced(uint128,address)': EventFragment;
    'PoolNominationRevoked(uint128,address)': EventFragment;
    'PoolOwnerNominated(uint128,address,address)': EventFragment;
    'PoolOwnershipAccepted(uint128,address)': EventFragment;
    'RewardsClaimed(uint128,uint128,address,address,uint256)': EventFragment;
    'RewardsDistributed(uint128,address,address,uint256,uint256,uint256)': EventFragment;
    'RewardsDistributorRegistered(uint128,address,address)': EventFragment;
    'RewardsDistributorRemoved(uint128,address,address)': EventFragment;
    'DelegationUpdated(uint128,uint128,address,uint256,uint256,address)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'OwnerChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Upgraded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowAllSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagAllowlistRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDeniersReset'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'FeatureFlagDenyAllSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AccountCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PermissionGranted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PermissionRevoked'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DebtAssociated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AssociatedSystemSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralLockCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralLockExpired'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Deposited'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Withdrawn'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CollateralConfigured'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'UsdBurned'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'UsdMinted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Liquidation'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'VaultLiquidation'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketCollateralDeposited'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketCollateralWithdrawn'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MaximumMarketCollateralConfigured'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketRegistered'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketUsdDeposited'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MarketUsdWithdrawn'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolApprovedAdded'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolApprovedRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PreferredPoolSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolConfigurationSet'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolCreated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolNameUpdated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolNominationRenounced'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolNominationRevoked'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolOwnerNominated'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PoolOwnershipAccepted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RewardsClaimed'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RewardsDistributed'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RewardsDistributorRegistered'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'RewardsDistributorRemoved'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DelegationUpdated'): EventFragment;
}

export interface OwnerChangedEventObject {
  oldOwner: string;
  newOwner: string;
}
export type OwnerChangedEvent = TypedEvent<[string, string], OwnerChangedEventObject>;

export type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;

export interface OwnerNominatedEventObject {
  newOwner: string;
}
export type OwnerNominatedEvent = TypedEvent<[string], OwnerNominatedEventObject>;

export type OwnerNominatedEventFilter = TypedEventFilter<OwnerNominatedEvent>;

export interface UpgradedEventObject {
  self: string;
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string, string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface FeatureFlagAllowAllSetEventObject {
  feature: string;
  allowAll: boolean;
}
export type FeatureFlagAllowAllSetEvent = TypedEvent<
  [string, boolean],
  FeatureFlagAllowAllSetEventObject
>;

export type FeatureFlagAllowAllSetEventFilter = TypedEventFilter<FeatureFlagAllowAllSetEvent>;

export interface FeatureFlagAllowlistAddedEventObject {
  feature: string;
  account: string;
}
export type FeatureFlagAllowlistAddedEvent = TypedEvent<
  [string, string],
  FeatureFlagAllowlistAddedEventObject
>;

export type FeatureFlagAllowlistAddedEventFilter = TypedEventFilter<FeatureFlagAllowlistAddedEvent>;

export interface FeatureFlagAllowlistRemovedEventObject {
  feature: string;
  account: string;
}
export type FeatureFlagAllowlistRemovedEvent = TypedEvent<
  [string, string],
  FeatureFlagAllowlistRemovedEventObject
>;

export type FeatureFlagAllowlistRemovedEventFilter =
  TypedEventFilter<FeatureFlagAllowlistRemovedEvent>;

export interface FeatureFlagDeniersResetEventObject {
  feature: string;
  deniers: string[];
}
export type FeatureFlagDeniersResetEvent = TypedEvent<
  [string, string[]],
  FeatureFlagDeniersResetEventObject
>;

export type FeatureFlagDeniersResetEventFilter = TypedEventFilter<FeatureFlagDeniersResetEvent>;

export interface FeatureFlagDenyAllSetEventObject {
  feature: string;
  denyAll: boolean;
}
export type FeatureFlagDenyAllSetEvent = TypedEvent<
  [string, boolean],
  FeatureFlagDenyAllSetEventObject
>;

export type FeatureFlagDenyAllSetEventFilter = TypedEventFilter<FeatureFlagDenyAllSetEvent>;

export interface AccountCreatedEventObject {
  accountId: BigNumber;
  owner: string;
}
export type AccountCreatedEvent = TypedEvent<[BigNumber, string], AccountCreatedEventObject>;

export type AccountCreatedEventFilter = TypedEventFilter<AccountCreatedEvent>;

export interface PermissionGrantedEventObject {
  accountId: BigNumber;
  permission: string;
  user: string;
  sender: string;
}
export type PermissionGrantedEvent = TypedEvent<
  [BigNumber, string, string, string],
  PermissionGrantedEventObject
>;

export type PermissionGrantedEventFilter = TypedEventFilter<PermissionGrantedEvent>;

export interface PermissionRevokedEventObject {
  accountId: BigNumber;
  permission: string;
  user: string;
  sender: string;
}
export type PermissionRevokedEvent = TypedEvent<
  [BigNumber, string, string, string],
  PermissionRevokedEventObject
>;

export type PermissionRevokedEventFilter = TypedEventFilter<PermissionRevokedEvent>;

export interface DebtAssociatedEventObject {
  marketId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  accountId: BigNumber;
  amount: BigNumber;
  updatedDebt: BigNumber;
}
export type DebtAssociatedEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber, BigNumber, BigNumber],
  DebtAssociatedEventObject
>;

export type DebtAssociatedEventFilter = TypedEventFilter<DebtAssociatedEvent>;

export interface AssociatedSystemSetEventObject {
  kind: string;
  id: string;
  proxy: string;
  impl: string;
}
export type AssociatedSystemSetEvent = TypedEvent<
  [string, string, string, string],
  AssociatedSystemSetEventObject
>;

export type AssociatedSystemSetEventFilter = TypedEventFilter<AssociatedSystemSetEvent>;

export interface CollateralLockCreatedEventObject {
  accountId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  expireTimestamp: BigNumber;
}
export type CollateralLockCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber],
  CollateralLockCreatedEventObject
>;

export type CollateralLockCreatedEventFilter = TypedEventFilter<CollateralLockCreatedEvent>;

export interface CollateralLockExpiredEventObject {
  accountId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  expireTimestamp: BigNumber;
}
export type CollateralLockExpiredEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber],
  CollateralLockExpiredEventObject
>;

export type CollateralLockExpiredEventFilter = TypedEventFilter<CollateralLockExpiredEvent>;

export interface DepositedEventObject {
  accountId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type DepositedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  DepositedEventObject
>;

export type DepositedEventFilter = TypedEventFilter<DepositedEvent>;

export interface WithdrawnEventObject {
  accountId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type WithdrawnEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  WithdrawnEventObject
>;

export type WithdrawnEventFilter = TypedEventFilter<WithdrawnEvent>;

export interface CollateralConfiguredEventObject {
  collateralType: string;
  config: CollateralConfiguration.DataStructOutput;
}
export type CollateralConfiguredEvent = TypedEvent<
  [string, CollateralConfiguration.DataStructOutput],
  CollateralConfiguredEventObject
>;

export type CollateralConfiguredEventFilter = TypedEventFilter<CollateralConfiguredEvent>;

export interface UsdBurnedEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  amount: BigNumber;
  sender: string;
}
export type UsdBurnedEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber, string],
  UsdBurnedEventObject
>;

export type UsdBurnedEventFilter = TypedEventFilter<UsdBurnedEvent>;

export interface UsdMintedEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  amount: BigNumber;
  sender: string;
}
export type UsdMintedEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber, string],
  UsdMintedEventObject
>;

export type UsdMintedEventFilter = TypedEventFilter<UsdMintedEvent>;

export interface LiquidationEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  liquidationData: ILiquidationModule.LiquidationDataStructOutput;
  liquidateAsAccountId: BigNumber;
  sender: string;
}
export type LiquidationEvent = TypedEvent<
  [BigNumber, BigNumber, string, ILiquidationModule.LiquidationDataStructOutput, BigNumber, string],
  LiquidationEventObject
>;

export type LiquidationEventFilter = TypedEventFilter<LiquidationEvent>;

export interface VaultLiquidationEventObject {
  poolId: BigNumber;
  collateralType: string;
  liquidationData: ILiquidationModule.LiquidationDataStructOutput;
  liquidateAsAccountId: BigNumber;
  sender: string;
}
export type VaultLiquidationEvent = TypedEvent<
  [BigNumber, string, ILiquidationModule.LiquidationDataStructOutput, BigNumber, string],
  VaultLiquidationEventObject
>;

export type VaultLiquidationEventFilter = TypedEventFilter<VaultLiquidationEvent>;

export interface MarketCollateralDepositedEventObject {
  marketId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type MarketCollateralDepositedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketCollateralDepositedEventObject
>;

export type MarketCollateralDepositedEventFilter = TypedEventFilter<MarketCollateralDepositedEvent>;

export interface MarketCollateralWithdrawnEventObject {
  marketId: BigNumber;
  collateralType: string;
  tokenAmount: BigNumber;
  sender: string;
}
export type MarketCollateralWithdrawnEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketCollateralWithdrawnEventObject
>;

export type MarketCollateralWithdrawnEventFilter = TypedEventFilter<MarketCollateralWithdrawnEvent>;

export interface MaximumMarketCollateralConfiguredEventObject {
  marketId: BigNumber;
  collateralType: string;
  systemAmount: BigNumber;
  owner: string;
}
export type MaximumMarketCollateralConfiguredEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MaximumMarketCollateralConfiguredEventObject
>;

export type MaximumMarketCollateralConfiguredEventFilter =
  TypedEventFilter<MaximumMarketCollateralConfiguredEvent>;

export interface MarketRegisteredEventObject {
  market: string;
  marketId: BigNumber;
  sender: string;
}
export type MarketRegisteredEvent = TypedEvent<
  [string, BigNumber, string],
  MarketRegisteredEventObject
>;

export type MarketRegisteredEventFilter = TypedEventFilter<MarketRegisteredEvent>;

export interface MarketUsdDepositedEventObject {
  marketId: BigNumber;
  target: string;
  amount: BigNumber;
  market: string;
}
export type MarketUsdDepositedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketUsdDepositedEventObject
>;

export type MarketUsdDepositedEventFilter = TypedEventFilter<MarketUsdDepositedEvent>;

export interface MarketUsdWithdrawnEventObject {
  marketId: BigNumber;
  target: string;
  amount: BigNumber;
  market: string;
}
export type MarketUsdWithdrawnEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  MarketUsdWithdrawnEventObject
>;

export type MarketUsdWithdrawnEventFilter = TypedEventFilter<MarketUsdWithdrawnEvent>;

export interface PoolApprovedAddedEventObject {
  poolId: BigNumber;
}
export type PoolApprovedAddedEvent = TypedEvent<[BigNumber], PoolApprovedAddedEventObject>;

export type PoolApprovedAddedEventFilter = TypedEventFilter<PoolApprovedAddedEvent>;

export interface PoolApprovedRemovedEventObject {
  poolId: BigNumber;
}
export type PoolApprovedRemovedEvent = TypedEvent<[BigNumber], PoolApprovedRemovedEventObject>;

export type PoolApprovedRemovedEventFilter = TypedEventFilter<PoolApprovedRemovedEvent>;

export interface PreferredPoolSetEventObject {
  poolId: BigNumber;
}
export type PreferredPoolSetEvent = TypedEvent<[BigNumber], PreferredPoolSetEventObject>;

export type PreferredPoolSetEventFilter = TypedEventFilter<PreferredPoolSetEvent>;

export interface PoolConfigurationSetEventObject {
  poolId: BigNumber;
  markets: MarketConfiguration.DataStructOutput[];
  sender: string;
}
export type PoolConfigurationSetEvent = TypedEvent<
  [BigNumber, MarketConfiguration.DataStructOutput[], string],
  PoolConfigurationSetEventObject
>;

export type PoolConfigurationSetEventFilter = TypedEventFilter<PoolConfigurationSetEvent>;

export interface PoolCreatedEventObject {
  poolId: BigNumber;
  owner: string;
  sender: string;
}
export type PoolCreatedEvent = TypedEvent<[BigNumber, string, string], PoolCreatedEventObject>;

export type PoolCreatedEventFilter = TypedEventFilter<PoolCreatedEvent>;

export interface PoolNameUpdatedEventObject {
  poolId: BigNumber;
  name: string;
  sender: string;
}
export type PoolNameUpdatedEvent = TypedEvent<
  [BigNumber, string, string],
  PoolNameUpdatedEventObject
>;

export type PoolNameUpdatedEventFilter = TypedEventFilter<PoolNameUpdatedEvent>;

export interface PoolNominationRenouncedEventObject {
  poolId: BigNumber;
  owner: string;
}
export type PoolNominationRenouncedEvent = TypedEvent<
  [BigNumber, string],
  PoolNominationRenouncedEventObject
>;

export type PoolNominationRenouncedEventFilter = TypedEventFilter<PoolNominationRenouncedEvent>;

export interface PoolNominationRevokedEventObject {
  poolId: BigNumber;
  owner: string;
}
export type PoolNominationRevokedEvent = TypedEvent<
  [BigNumber, string],
  PoolNominationRevokedEventObject
>;

export type PoolNominationRevokedEventFilter = TypedEventFilter<PoolNominationRevokedEvent>;

export interface PoolOwnerNominatedEventObject {
  poolId: BigNumber;
  nominatedOwner: string;
  owner: string;
}
export type PoolOwnerNominatedEvent = TypedEvent<
  [BigNumber, string, string],
  PoolOwnerNominatedEventObject
>;

export type PoolOwnerNominatedEventFilter = TypedEventFilter<PoolOwnerNominatedEvent>;

export interface PoolOwnershipAcceptedEventObject {
  poolId: BigNumber;
  owner: string;
}
export type PoolOwnershipAcceptedEvent = TypedEvent<
  [BigNumber, string],
  PoolOwnershipAcceptedEventObject
>;

export type PoolOwnershipAcceptedEventFilter = TypedEventFilter<PoolOwnershipAcceptedEvent>;

export interface RewardsClaimedEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  distributor: string;
  amount: BigNumber;
}
export type RewardsClaimedEvent = TypedEvent<
  [BigNumber, BigNumber, string, string, BigNumber],
  RewardsClaimedEventObject
>;

export type RewardsClaimedEventFilter = TypedEventFilter<RewardsClaimedEvent>;

export interface RewardsDistributedEventObject {
  poolId: BigNumber;
  collateralType: string;
  distributor: string;
  amount: BigNumber;
  start: BigNumber;
  duration: BigNumber;
}
export type RewardsDistributedEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, BigNumber, BigNumber],
  RewardsDistributedEventObject
>;

export type RewardsDistributedEventFilter = TypedEventFilter<RewardsDistributedEvent>;

export interface RewardsDistributorRegisteredEventObject {
  poolId: BigNumber;
  collateralType: string;
  distributor: string;
}
export type RewardsDistributorRegisteredEvent = TypedEvent<
  [BigNumber, string, string],
  RewardsDistributorRegisteredEventObject
>;

export type RewardsDistributorRegisteredEventFilter =
  TypedEventFilter<RewardsDistributorRegisteredEvent>;

export interface RewardsDistributorRemovedEventObject {
  poolId: BigNumber;
  collateralType: string;
  distributor: string;
}
export type RewardsDistributorRemovedEvent = TypedEvent<
  [BigNumber, string, string],
  RewardsDistributorRemovedEventObject
>;

export type RewardsDistributorRemovedEventFilter = TypedEventFilter<RewardsDistributorRemovedEvent>;

export interface DelegationUpdatedEventObject {
  accountId: BigNumber;
  poolId: BigNumber;
  collateralType: string;
  amount: BigNumber;
  leverage: BigNumber;
  sender: string;
}
export type DelegationUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber, BigNumber, string],
  DelegationUpdatedEventObject
>;

export type DelegationUpdatedEventFilter = TypedEventFilter<DelegationUpdatedEvent>;

export interface CoreProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CoreProxyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getImplementation(overrides?: CallOverrides): Promise<[string]>;

    nominateNewOwner(
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceNomination(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    simulateUpgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addToFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getDeniers(feature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;

    getFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isFeatureAllowed(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removeFromFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setDeniers(
      feature: PromiseOrValue<BytesLike>,
      deniers: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      allowAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      denyAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createAccount(
      requestedAccountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAccountLastInteraction(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAccountOwner(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getAccountPermissions(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [IAccountModule.AccountPermissionsStructOutput[]] & {
        accountPerms: IAccountModule.AccountPermissionsStructOutput[];
      }
    >;

    getAccountTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    grantPermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hasPermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isAuthorized(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    notifyAccountTransfer(
      to: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renouncePermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokePermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    associateDebt(
      marketId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAssociatedSystem(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; kind: string }>;

    initOrUpgradeNft(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      uri: PromiseOrValue<string>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initOrUpgradeToken(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerUnmanagedSystem(
      id: PromiseOrValue<BytesLike>,
      endpoint: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cleanExpiredLocks(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      offset: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createLock(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expireTimestamp: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deposit(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAccountAvailableCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAccountCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        totalDeposited: BigNumber;
        totalAssigned: BigNumber;
        totalLocked: BigNumber;
      }
    >;

    getLocks(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      offset: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[CollateralLock.DataStructOutput[]] & { locks: CollateralLock.DataStructOutput[] }>;

    withdraw(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    configureCollateral(
      config: CollateralConfiguration.DataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getCollateralConfiguration(
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[CollateralConfiguration.DataStructOutput]>;

    getCollateralConfigurations(
      hideDisabled: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<[CollateralConfiguration.DataStructOutput[]]>;

    getCollateralPrice(
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    burnUsd(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mintUsd(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isPositionLiquidatable(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isVaultLiquidatable(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    liquidate(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      liquidateAsAccountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    liquidateVault(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      liquidateAsAccountId: PromiseOrValue<BigNumberish>,
      maxUsd: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    configureMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMarketCollateralAmount(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { collateralAmountD18: BigNumber }>;

    getMarketCollateralValue(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    withdrawMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    distributeDebtToPools(
      marketId: PromiseOrValue<BigNumberish>,
      maxIter: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMarketDebtPerShare(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMarketNetIssuance(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMarketReportedDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMarketTotalDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getWithdrawableMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isMarketCapacityLocked(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    registerMarket(
      market: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getApprovedPools(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getPreferredPool(overrides?: CallOverrides): Promise<[BigNumber]>;

    removeApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPreferredPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    acceptPoolOwnership(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createPool(
      requestedPoolId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMinLiquidityRatio(overrides?: CallOverrides): Promise<[BigNumber]>;

    getNominatedPoolOwner(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getPoolConfiguration(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[MarketConfiguration.DataStructOutput[]]>;

    getPoolName(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { poolName: string }>;

    getPoolOwner(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    nominatePoolOwner(
      nominatedOwner: PromiseOrValue<string>,
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renouncePoolNomination(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokePoolNomination(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMinLiquidityRatio(
      minLiquidityRatio: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPoolConfiguration(
      poolId: PromiseOrValue<BigNumberish>,
      newMarketConfigurations: MarketConfiguration.DataStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPoolName(
      poolId: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimRewards(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    distributeRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getRewardRate(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    registerRewardsDistributor(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeRewardsDistributor(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    configureOracleManager(
      oracleManagerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getConfig(
      k: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { v: string }>;

    registerCcip(
      ccipSend: PromiseOrValue<string>,
      ccipReceive: PromiseOrValue<string>,
      ccipTokenPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setConfig(
      k: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    delegateCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      newCollateralAmountD18: PromiseOrValue<BigNumberish>,
      leverage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getPosition(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getPositionCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

    getPositionCollateralRatio(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getPositionDebt(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getVaultCollateral(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

    getVaultCollateralRatio(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getVaultDebt(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getImplementation(overrides?: CallOverrides): Promise<string>;

  nominateNewOwner(
    newNominatedOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nominatedOwner(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceNomination(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  simulateUpgradeTo(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addToFeatureFlagAllowlist(
    feature: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getDeniers(feature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;

  getFeatureFlagAllowAll(
    feature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getFeatureFlagAllowlist(
    feature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getFeatureFlagDenyAll(
    feature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isFeatureAllowed(
    feature: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removeFromFeatureFlagAllowlist(
    feature: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setDeniers(
    feature: PromiseOrValue<BytesLike>,
    deniers: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeatureFlagAllowAll(
    feature: PromiseOrValue<BytesLike>,
    allowAll: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeatureFlagDenyAll(
    feature: PromiseOrValue<BytesLike>,
    denyAll: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createAccount(
    requestedAccountId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAccountLastInteraction(
    accountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAccountOwner(
    accountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getAccountPermissions(
    accountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IAccountModule.AccountPermissionsStructOutput[]>;

  getAccountTokenAddress(overrides?: CallOverrides): Promise<string>;

  grantPermission(
    accountId: PromiseOrValue<BigNumberish>,
    permission: PromiseOrValue<BytesLike>,
    user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hasPermission(
    accountId: PromiseOrValue<BigNumberish>,
    permission: PromiseOrValue<BytesLike>,
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isAuthorized(
    accountId: PromiseOrValue<BigNumberish>,
    permission: PromiseOrValue<BytesLike>,
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  notifyAccountTransfer(
    to: PromiseOrValue<string>,
    accountId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renouncePermission(
    accountId: PromiseOrValue<BigNumberish>,
    permission: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokePermission(
    accountId: PromiseOrValue<BigNumberish>,
    permission: PromiseOrValue<BytesLike>,
    user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  associateDebt(
    marketId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    accountId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAssociatedSystem(
    id: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, string] & { addr: string; kind: string }>;

  initOrUpgradeNft(
    id: PromiseOrValue<BytesLike>,
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    uri: PromiseOrValue<string>,
    impl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initOrUpgradeToken(
    id: PromiseOrValue<BytesLike>,
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    decimals: PromiseOrValue<BigNumberish>,
    impl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerUnmanagedSystem(
    id: PromiseOrValue<BytesLike>,
    endpoint: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cleanExpiredLocks(
    accountId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    offset: PromiseOrValue<BigNumberish>,
    count: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createLock(
    accountId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    expireTimestamp: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deposit(
    accountId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAccountAvailableCollateral(
    accountId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAccountCollateral(
    accountId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      totalDeposited: BigNumber;
      totalAssigned: BigNumber;
      totalLocked: BigNumber;
    }
  >;

  getLocks(
    accountId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    offset: PromiseOrValue<BigNumberish>,
    count: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<CollateralLock.DataStructOutput[]>;

  withdraw(
    accountId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  configureCollateral(
    config: CollateralConfiguration.DataStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getCollateralConfiguration(
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<CollateralConfiguration.DataStructOutput>;

  getCollateralConfigurations(
    hideDisabled: PromiseOrValue<boolean>,
    overrides?: CallOverrides
  ): Promise<CollateralConfiguration.DataStructOutput[]>;

  getCollateralPrice(
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  burnUsd(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mintUsd(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isPositionLiquidatable(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isVaultLiquidatable(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  liquidate(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    liquidateAsAccountId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  liquidateVault(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    liquidateAsAccountId: PromiseOrValue<BigNumberish>,
    maxUsd: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  configureMaximumMarketCollateral(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositMarketCollateral(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMarketCollateralAmount(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMarketCollateralValue(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMaximumMarketCollateral(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdrawMarketCollateral(
    marketId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositMarketUsd(
    marketId: PromiseOrValue<BigNumberish>,
    target: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  distributeDebtToPools(
    marketId: PromiseOrValue<BigNumberish>,
    maxIter: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMarketCollateral(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMarketDebtPerShare(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMarketNetIssuance(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMarketReportedDebt(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMarketTotalDebt(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getWithdrawableMarketUsd(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isMarketCapacityLocked(
    marketId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  registerMarket(
    market: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawMarketUsd(
    marketId: PromiseOrValue<BigNumberish>,
    target: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  multicall(
    data: PromiseOrValue<BytesLike>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addApprovedPool(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getApprovedPools(overrides?: CallOverrides): Promise<BigNumber[]>;

  getPreferredPool(overrides?: CallOverrides): Promise<BigNumber>;

  removeApprovedPool(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPreferredPool(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  acceptPoolOwnership(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createPool(
    requestedPoolId: PromiseOrValue<BigNumberish>,
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMinLiquidityRatio(overrides?: CallOverrides): Promise<BigNumber>;

  getNominatedPoolOwner(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getPoolConfiguration(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MarketConfiguration.DataStructOutput[]>;

  getPoolName(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

  getPoolOwner(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

  nominatePoolOwner(
    nominatedOwner: PromiseOrValue<string>,
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renouncePoolNomination(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokePoolNomination(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMinLiquidityRatio(
    minLiquidityRatio: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPoolConfiguration(
    poolId: PromiseOrValue<BigNumberish>,
    newMarketConfigurations: MarketConfiguration.DataStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPoolName(
    poolId: PromiseOrValue<BigNumberish>,
    name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimRewards(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    distributor: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  distributeRewards(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    start: PromiseOrValue<BigNumberish>,
    duration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getRewardRate(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    distributor: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  registerRewardsDistributor(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    distributor: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeRewardsDistributor(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    distributor: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateRewards(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    accountId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  configureOracleManager(
    oracleManagerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getConfig(k: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

  registerCcip(
    ccipSend: PromiseOrValue<string>,
    ccipReceive: PromiseOrValue<string>,
    ccipTokenPool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setConfig(
    k: PromiseOrValue<BytesLike>,
    v: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  delegateCollateral(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    newCollateralAmountD18: PromiseOrValue<BigNumberish>,
    leverage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getPosition(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getPositionCollateral(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

  getPositionCollateralRatio(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getPositionDebt(
    accountId: PromiseOrValue<BigNumberish>,
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getVaultCollateral(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

  getVaultCollateralRatio(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getVaultDebt(
    poolId: PromiseOrValue<BigNumberish>,
    collateralType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    getImplementation(overrides?: CallOverrides): Promise<string>;

    nominateNewOwner(
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    nominatedOwner(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceNomination(overrides?: CallOverrides): Promise<void>;

    simulateUpgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTo(newImplementation: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    addToFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getDeniers(feature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;

    getFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isFeatureAllowed(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeFromFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setDeniers(
      feature: PromiseOrValue<BytesLike>,
      deniers: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      allowAll: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      denyAll: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    createAccount(
      requestedAccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAccountLastInteraction(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountOwner(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAccountPermissions(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IAccountModule.AccountPermissionsStructOutput[]>;

    getAccountTokenAddress(overrides?: CallOverrides): Promise<string>;

    grantPermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    hasPermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isAuthorized(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    notifyAccountTransfer(
      to: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    renouncePermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokePermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    associateDebt(
      marketId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAssociatedSystem(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string] & { addr: string; kind: string }>;

    initOrUpgradeNft(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      uri: PromiseOrValue<string>,
      impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    initOrUpgradeToken(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    registerUnmanagedSystem(
      id: PromiseOrValue<BytesLike>,
      endpoint: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    cleanExpiredLocks(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      offset: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createLock(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expireTimestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAccountAvailableCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        totalDeposited: BigNumber;
        totalAssigned: BigNumber;
        totalLocked: BigNumber;
      }
    >;

    getLocks(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      offset: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<CollateralLock.DataStructOutput[]>;

    withdraw(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    configureCollateral(
      config: CollateralConfiguration.DataStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    getCollateralConfiguration(
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<CollateralConfiguration.DataStructOutput>;

    getCollateralConfigurations(
      hideDisabled: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<CollateralConfiguration.DataStructOutput[]>;

    getCollateralPrice(
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burnUsd(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    mintUsd(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    isPositionLiquidatable(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isVaultLiquidatable(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    liquidate(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      liquidateAsAccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<ILiquidationModule.LiquidationDataStructOutput>;

    liquidateVault(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      liquidateAsAccountId: PromiseOrValue<BigNumberish>,
      maxUsd: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<ILiquidationModule.LiquidationDataStructOutput>;

    configureMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getMarketCollateralAmount(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketCollateralValue(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    distributeDebtToPools(
      marketId: PromiseOrValue<BigNumberish>,
      maxIter: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketDebtPerShare(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketNetIssuance(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketReportedDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketTotalDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWithdrawableMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isMarketCapacityLocked(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registerMarket(market: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    multicall(data: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<string[]>;

    addApprovedPool(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;

    getApprovedPools(overrides?: CallOverrides): Promise<BigNumber[]>;

    getPreferredPool(overrides?: CallOverrides): Promise<BigNumber>;

    removeApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setPreferredPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    acceptPoolOwnership(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createPool(
      requestedPoolId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getMinLiquidityRatio(overrides?: CallOverrides): Promise<BigNumber>;

    getNominatedPoolOwner(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getPoolConfiguration(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MarketConfiguration.DataStructOutput[]>;

    getPoolName(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

    getPoolOwner(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

    nominatePoolOwner(
      nominatedOwner: PromiseOrValue<string>,
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    renouncePoolNomination(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokePoolNomination(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMinLiquidityRatio(
      minLiquidityRatio: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setPoolConfiguration(
      poolId: PromiseOrValue<BigNumberish>,
      newMarketConfigurations: MarketConfiguration.DataStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    setPoolName(
      poolId: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimRewards(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    distributeRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getRewardRate(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerRewardsDistributor(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeRewardsDistributor(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], string[]]>;

    configureOracleManager(
      oracleManagerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getConfig(k: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

    registerCcip(
      ccipSend: PromiseOrValue<string>,
      ccipReceive: PromiseOrValue<string>,
      ccipTokenPool: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setConfig(
      k: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    delegateCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      newCollateralAmountD18: PromiseOrValue<BigNumberish>,
      leverage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getPosition(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        collateralAmount: BigNumber;
        collateralValue: BigNumber;
        debt: BigNumber;
        collateralizationRatio: BigNumber;
      }
    >;

    getPositionCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

    getPositionCollateralRatio(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPositionDebt(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultCollateral(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { amount: BigNumber; value: BigNumber }>;

    getVaultCollateralRatio(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultDebt(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    'OwnerChanged(address,address)'(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(oldOwner?: null, newOwner?: null): OwnerChangedEventFilter;

    'OwnerNominated(address)'(newOwner?: null): OwnerNominatedEventFilter;
    OwnerNominated(newOwner?: null): OwnerNominatedEventFilter;

    'Upgraded(address,address)'(
      self?: PromiseOrValue<string> | null,
      implementation?: null
    ): UpgradedEventFilter;
    Upgraded(self?: PromiseOrValue<string> | null, implementation?: null): UpgradedEventFilter;

    'FeatureFlagAllowAllSet(bytes32,bool)'(
      feature?: PromiseOrValue<BytesLike> | null,
      allowAll?: null
    ): FeatureFlagAllowAllSetEventFilter;
    FeatureFlagAllowAllSet(
      feature?: PromiseOrValue<BytesLike> | null,
      allowAll?: null
    ): FeatureFlagAllowAllSetEventFilter;

    'FeatureFlagAllowlistAdded(bytes32,address)'(
      feature?: PromiseOrValue<BytesLike> | null,
      account?: null
    ): FeatureFlagAllowlistAddedEventFilter;
    FeatureFlagAllowlistAdded(
      feature?: PromiseOrValue<BytesLike> | null,
      account?: null
    ): FeatureFlagAllowlistAddedEventFilter;

    'FeatureFlagAllowlistRemoved(bytes32,address)'(
      feature?: PromiseOrValue<BytesLike> | null,
      account?: null
    ): FeatureFlagAllowlistRemovedEventFilter;
    FeatureFlagAllowlistRemoved(
      feature?: PromiseOrValue<BytesLike> | null,
      account?: null
    ): FeatureFlagAllowlistRemovedEventFilter;

    'FeatureFlagDeniersReset(bytes32,address[])'(
      feature?: PromiseOrValue<BytesLike> | null,
      deniers?: null
    ): FeatureFlagDeniersResetEventFilter;
    FeatureFlagDeniersReset(
      feature?: PromiseOrValue<BytesLike> | null,
      deniers?: null
    ): FeatureFlagDeniersResetEventFilter;

    'FeatureFlagDenyAllSet(bytes32,bool)'(
      feature?: PromiseOrValue<BytesLike> | null,
      denyAll?: null
    ): FeatureFlagDenyAllSetEventFilter;
    FeatureFlagDenyAllSet(
      feature?: PromiseOrValue<BytesLike> | null,
      denyAll?: null
    ): FeatureFlagDenyAllSetEventFilter;

    'AccountCreated(uint128,address)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null
    ): AccountCreatedEventFilter;
    AccountCreated(
      accountId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null
    ): AccountCreatedEventFilter;

    'PermissionGranted(uint128,bytes32,address,address)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      permission?: PromiseOrValue<BytesLike> | null,
      user?: PromiseOrValue<string> | null,
      sender?: null
    ): PermissionGrantedEventFilter;
    PermissionGranted(
      accountId?: PromiseOrValue<BigNumberish> | null,
      permission?: PromiseOrValue<BytesLike> | null,
      user?: PromiseOrValue<string> | null,
      sender?: null
    ): PermissionGrantedEventFilter;

    'PermissionRevoked(uint128,bytes32,address,address)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      permission?: PromiseOrValue<BytesLike> | null,
      user?: PromiseOrValue<string> | null,
      sender?: null
    ): PermissionRevokedEventFilter;
    PermissionRevoked(
      accountId?: PromiseOrValue<BigNumberish> | null,
      permission?: PromiseOrValue<BytesLike> | null,
      user?: PromiseOrValue<string> | null,
      sender?: null
    ): PermissionRevokedEventFilter;

    'DebtAssociated(uint128,uint128,address,uint128,uint256,int256)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      accountId?: null,
      amount?: null,
      updatedDebt?: null
    ): DebtAssociatedEventFilter;
    DebtAssociated(
      marketId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      accountId?: null,
      amount?: null,
      updatedDebt?: null
    ): DebtAssociatedEventFilter;

    'AssociatedSystemSet(bytes32,bytes32,address,address)'(
      kind?: PromiseOrValue<BytesLike> | null,
      id?: PromiseOrValue<BytesLike> | null,
      proxy?: null,
      impl?: null
    ): AssociatedSystemSetEventFilter;
    AssociatedSystemSet(
      kind?: PromiseOrValue<BytesLike> | null,
      id?: PromiseOrValue<BytesLike> | null,
      proxy?: null,
      impl?: null
    ): AssociatedSystemSetEventFilter;

    'CollateralLockCreated(uint128,address,uint256,uint64)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      expireTimestamp?: null
    ): CollateralLockCreatedEventFilter;
    CollateralLockCreated(
      accountId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      expireTimestamp?: null
    ): CollateralLockCreatedEventFilter;

    'CollateralLockExpired(uint128,address,uint256,uint64)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      expireTimestamp?: null
    ): CollateralLockExpiredEventFilter;
    CollateralLockExpired(
      accountId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      expireTimestamp?: null
    ): CollateralLockExpiredEventFilter;

    'Deposited(uint128,address,uint256,address)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): DepositedEventFilter;
    Deposited(
      accountId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): DepositedEventFilter;

    'Withdrawn(uint128,address,uint256,address)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): WithdrawnEventFilter;
    Withdrawn(
      accountId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): WithdrawnEventFilter;

    'CollateralConfigured(address,tuple)'(
      collateralType?: PromiseOrValue<string> | null,
      config?: null
    ): CollateralConfiguredEventFilter;
    CollateralConfigured(
      collateralType?: PromiseOrValue<string> | null,
      config?: null
    ): CollateralConfiguredEventFilter;

    'UsdBurned(uint128,uint128,address,uint256,address)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: null,
      amount?: null,
      sender?: PromiseOrValue<string> | null
    ): UsdBurnedEventFilter;
    UsdBurned(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: null,
      amount?: null,
      sender?: PromiseOrValue<string> | null
    ): UsdBurnedEventFilter;

    'UsdMinted(uint128,uint128,address,uint256,address)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: null,
      amount?: null,
      sender?: PromiseOrValue<string> | null
    ): UsdMintedEventFilter;
    UsdMinted(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: null,
      amount?: null,
      sender?: PromiseOrValue<string> | null
    ): UsdMintedEventFilter;

    'Liquidation(uint128,uint128,address,tuple,uint128,address)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      liquidationData?: null,
      liquidateAsAccountId?: null,
      sender?: null
    ): LiquidationEventFilter;
    Liquidation(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      liquidationData?: null,
      liquidateAsAccountId?: null,
      sender?: null
    ): LiquidationEventFilter;

    'VaultLiquidation(uint128,address,tuple,uint128,address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      liquidationData?: null,
      liquidateAsAccountId?: null,
      sender?: null
    ): VaultLiquidationEventFilter;
    VaultLiquidation(
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      liquidationData?: null,
      liquidateAsAccountId?: null,
      sender?: null
    ): VaultLiquidationEventFilter;

    'MarketCollateralDeposited(uint128,address,uint256,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MarketCollateralDepositedEventFilter;
    MarketCollateralDeposited(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MarketCollateralDepositedEventFilter;

    'MarketCollateralWithdrawn(uint128,address,uint256,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MarketCollateralWithdrawnEventFilter;
    MarketCollateralWithdrawn(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      tokenAmount?: null,
      sender?: PromiseOrValue<string> | null
    ): MarketCollateralWithdrawnEventFilter;

    'MaximumMarketCollateralConfigured(uint128,address,uint256,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      systemAmount?: null,
      owner?: PromiseOrValue<string> | null
    ): MaximumMarketCollateralConfiguredEventFilter;
    MaximumMarketCollateralConfigured(
      marketId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      systemAmount?: null,
      owner?: PromiseOrValue<string> | null
    ): MaximumMarketCollateralConfiguredEventFilter;

    'MarketRegistered(address,uint128,address)'(
      market?: PromiseOrValue<string> | null,
      marketId?: PromiseOrValue<BigNumberish> | null,
      sender?: PromiseOrValue<string> | null
    ): MarketRegisteredEventFilter;
    MarketRegistered(
      market?: PromiseOrValue<string> | null,
      marketId?: PromiseOrValue<BigNumberish> | null,
      sender?: PromiseOrValue<string> | null
    ): MarketRegisteredEventFilter;

    'MarketUsdDeposited(uint128,address,uint256,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      target?: PromiseOrValue<string> | null,
      amount?: null,
      market?: PromiseOrValue<string> | null
    ): MarketUsdDepositedEventFilter;
    MarketUsdDeposited(
      marketId?: PromiseOrValue<BigNumberish> | null,
      target?: PromiseOrValue<string> | null,
      amount?: null,
      market?: PromiseOrValue<string> | null
    ): MarketUsdDepositedEventFilter;

    'MarketUsdWithdrawn(uint128,address,uint256,address)'(
      marketId?: PromiseOrValue<BigNumberish> | null,
      target?: PromiseOrValue<string> | null,
      amount?: null,
      market?: PromiseOrValue<string> | null
    ): MarketUsdWithdrawnEventFilter;
    MarketUsdWithdrawn(
      marketId?: PromiseOrValue<BigNumberish> | null,
      target?: PromiseOrValue<string> | null,
      amount?: null,
      market?: PromiseOrValue<string> | null
    ): MarketUsdWithdrawnEventFilter;

    'PoolApprovedAdded(uint256)'(poolId?: null): PoolApprovedAddedEventFilter;
    PoolApprovedAdded(poolId?: null): PoolApprovedAddedEventFilter;

    'PoolApprovedRemoved(uint256)'(poolId?: null): PoolApprovedRemovedEventFilter;
    PoolApprovedRemoved(poolId?: null): PoolApprovedRemovedEventFilter;

    'PreferredPoolSet(uint256)'(poolId?: null): PreferredPoolSetEventFilter;
    PreferredPoolSet(poolId?: null): PreferredPoolSetEventFilter;

    'PoolConfigurationSet(uint128,tuple[],address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      markets?: null,
      sender?: PromiseOrValue<string> | null
    ): PoolConfigurationSetEventFilter;
    PoolConfigurationSet(
      poolId?: PromiseOrValue<BigNumberish> | null,
      markets?: null,
      sender?: PromiseOrValue<string> | null
    ): PoolConfigurationSetEventFilter;

    'PoolCreated(uint128,address,address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): PoolCreatedEventFilter;
    PoolCreated(
      poolId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): PoolCreatedEventFilter;

    'PoolNameUpdated(uint128,string,address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      name?: null,
      sender?: PromiseOrValue<string> | null
    ): PoolNameUpdatedEventFilter;
    PoolNameUpdated(
      poolId?: PromiseOrValue<BigNumberish> | null,
      name?: null,
      sender?: PromiseOrValue<string> | null
    ): PoolNameUpdatedEventFilter;

    'PoolNominationRenounced(uint128,address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null
    ): PoolNominationRenouncedEventFilter;
    PoolNominationRenounced(
      poolId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null
    ): PoolNominationRenouncedEventFilter;

    'PoolNominationRevoked(uint128,address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null
    ): PoolNominationRevokedEventFilter;
    PoolNominationRevoked(
      poolId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null
    ): PoolNominationRevokedEventFilter;

    'PoolOwnerNominated(uint128,address,address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      nominatedOwner?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): PoolOwnerNominatedEventFilter;
    PoolOwnerNominated(
      poolId?: PromiseOrValue<BigNumberish> | null,
      nominatedOwner?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): PoolOwnerNominatedEventFilter;

    'PoolOwnershipAccepted(uint128,address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null
    ): PoolOwnershipAcceptedEventFilter;
    PoolOwnershipAccepted(
      poolId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null
    ): PoolOwnershipAcceptedEventFilter;

    'RewardsClaimed(uint128,uint128,address,address,uint256)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      distributor?: null,
      amount?: null
    ): RewardsClaimedEventFilter;
    RewardsClaimed(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      distributor?: null,
      amount?: null
    ): RewardsClaimedEventFilter;

    'RewardsDistributed(uint128,address,address,uint256,uint256,uint256)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      distributor?: null,
      amount?: null,
      start?: null,
      duration?: null
    ): RewardsDistributedEventFilter;
    RewardsDistributed(
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      distributor?: null,
      amount?: null,
      start?: null,
      duration?: null
    ): RewardsDistributedEventFilter;

    'RewardsDistributorRegistered(uint128,address,address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      distributor?: PromiseOrValue<string> | null
    ): RewardsDistributorRegisteredEventFilter;
    RewardsDistributorRegistered(
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      distributor?: PromiseOrValue<string> | null
    ): RewardsDistributorRegisteredEventFilter;

    'RewardsDistributorRemoved(uint128,address,address)'(
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      distributor?: PromiseOrValue<string> | null
    ): RewardsDistributorRemovedEventFilter;
    RewardsDistributorRemoved(
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: PromiseOrValue<string> | null,
      distributor?: PromiseOrValue<string> | null
    ): RewardsDistributorRemovedEventFilter;

    'DelegationUpdated(uint128,uint128,address,uint256,uint256,address)'(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: null,
      amount?: null,
      leverage?: null,
      sender?: PromiseOrValue<string> | null
    ): DelegationUpdatedEventFilter;
    DelegationUpdated(
      accountId?: PromiseOrValue<BigNumberish> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      collateralType?: null,
      amount?: null,
      leverage?: null,
      sender?: PromiseOrValue<string> | null
    ): DelegationUpdatedEventFilter;
  };

  estimateGas: {
    acceptOwnership(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    getImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    nominateNewOwner(
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nominatedOwner(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceNomination(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    simulateUpgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addToFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getDeniers(feature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isFeatureAllowed(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeFromFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setDeniers(
      feature: PromiseOrValue<BytesLike>,
      deniers: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      allowAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      denyAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createAccount(
      requestedAccountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAccountLastInteraction(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountOwner(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountPermissions(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    grantPermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hasPermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isAuthorized(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    notifyAccountTransfer(
      to: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renouncePermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokePermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    associateDebt(
      marketId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAssociatedSystem(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initOrUpgradeNft(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      uri: PromiseOrValue<string>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initOrUpgradeToken(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerUnmanagedSystem(
      id: PromiseOrValue<BytesLike>,
      endpoint: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cleanExpiredLocks(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      offset: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createLock(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expireTimestamp: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deposit(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAccountAvailableCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLocks(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      offset: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    configureCollateral(
      config: CollateralConfiguration.DataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getCollateralConfiguration(
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollateralConfigurations(
      hideDisabled: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollateralPrice(
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burnUsd(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mintUsd(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isPositionLiquidatable(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isVaultLiquidatable(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    liquidate(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      liquidateAsAccountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    liquidateVault(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      liquidateAsAccountId: PromiseOrValue<BigNumberish>,
      maxUsd: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    configureMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMarketCollateralAmount(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketCollateralValue(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    distributeDebtToPools(
      marketId: PromiseOrValue<BigNumberish>,
      maxIter: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketDebtPerShare(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMarketNetIssuance(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketReportedDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMarketTotalDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWithdrawableMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isMarketCapacityLocked(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerMarket(
      market: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getApprovedPools(overrides?: CallOverrides): Promise<BigNumber>;

    getPreferredPool(overrides?: CallOverrides): Promise<BigNumber>;

    removeApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPreferredPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    acceptPoolOwnership(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createPool(
      requestedPoolId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMinLiquidityRatio(overrides?: CallOverrides): Promise<BigNumber>;

    getNominatedPoolOwner(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolConfiguration(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolName(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolOwner(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nominatePoolOwner(
      nominatedOwner: PromiseOrValue<string>,
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renouncePoolNomination(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokePoolNomination(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMinLiquidityRatio(
      minLiquidityRatio: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPoolConfiguration(
      poolId: PromiseOrValue<BigNumberish>,
      newMarketConfigurations: MarketConfiguration.DataStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPoolName(
      poolId: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimRewards(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    distributeRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getRewardRate(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerRewardsDistributor(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeRewardsDistributor(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    configureOracleManager(
      oracleManagerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getConfig(k: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    registerCcip(
      ccipSend: PromiseOrValue<string>,
      ccipReceive: PromiseOrValue<string>,
      ccipTokenPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setConfig(
      k: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    delegateCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      newCollateralAmountD18: PromiseOrValue<BigNumberish>,
      leverage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getPosition(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getPositionCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPositionCollateralRatio(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getPositionDebt(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getVaultCollateral(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVaultCollateralRatio(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getVaultDebt(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getImplementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nominateNewOwner(
      newNominatedOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nominatedOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceNomination(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    simulateUpgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addToFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getDeniers(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isFeatureAllowed(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeFromFeatureFlagAllowlist(
      feature: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setDeniers(
      feature: PromiseOrValue<BytesLike>,
      deniers: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeatureFlagAllowAll(
      feature: PromiseOrValue<BytesLike>,
      allowAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeatureFlagDenyAll(
      feature: PromiseOrValue<BytesLike>,
      denyAll: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createAccount(
      requestedAccountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAccountLastInteraction(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountOwner(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountPermissions(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountTokenAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    grantPermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hasPermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isAuthorized(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    notifyAccountTransfer(
      to: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renouncePermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokePermission(
      accountId: PromiseOrValue<BigNumberish>,
      permission: PromiseOrValue<BytesLike>,
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    associateDebt(
      marketId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAssociatedSystem(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initOrUpgradeNft(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      uri: PromiseOrValue<string>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initOrUpgradeToken(
      id: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      impl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerUnmanagedSystem(
      id: PromiseOrValue<BytesLike>,
      endpoint: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cleanExpiredLocks(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      offset: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createLock(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      expireTimestamp: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAccountAvailableCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLocks(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      offset: PromiseOrValue<BigNumberish>,
      count: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      accountId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    configureCollateral(
      config: CollateralConfiguration.DataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getCollateralConfiguration(
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollateralConfigurations(
      hideDisabled: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollateralPrice(
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burnUsd(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mintUsd(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isPositionLiquidatable(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isVaultLiquidatable(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    liquidate(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      liquidateAsAccountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    liquidateVault(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      liquidateAsAccountId: PromiseOrValue<BigNumberish>,
      maxUsd: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    configureMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMarketCollateralAmount(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketCollateralValue(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaximumMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    distributeDebtToPools(
      marketId: PromiseOrValue<BigNumberish>,
      maxIter: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMarketCollateral(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketDebtPerShare(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMarketNetIssuance(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketReportedDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMarketTotalDebt(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWithdrawableMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMarketCapacityLocked(
      marketId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerMarket(
      market: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawMarketUsd(
      marketId: PromiseOrValue<BigNumberish>,
      target: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getApprovedPools(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPreferredPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeApprovedPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPreferredPool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    acceptPoolOwnership(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createPool(
      requestedPoolId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMinLiquidityRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNominatedPoolOwner(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolConfiguration(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolName(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolOwner(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nominatePoolOwner(
      nominatedOwner: PromiseOrValue<string>,
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renouncePoolNomination(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokePoolNomination(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMinLiquidityRatio(
      minLiquidityRatio: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPoolConfiguration(
      poolId: PromiseOrValue<BigNumberish>,
      newMarketConfigurations: MarketConfiguration.DataStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPoolName(
      poolId: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimRewards(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    distributeRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      start: PromiseOrValue<BigNumberish>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getRewardRate(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerRewardsDistributor(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeRewardsDistributor(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      distributor: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateRewards(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    configureOracleManager(
      oracleManagerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getConfig(
      k: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerCcip(
      ccipSend: PromiseOrValue<string>,
      ccipReceive: PromiseOrValue<string>,
      ccipTokenPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setConfig(
      k: PromiseOrValue<BytesLike>,
      v: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    delegateCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      newCollateralAmountD18: PromiseOrValue<BigNumberish>,
      leverage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getPosition(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getPositionCollateral(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPositionCollateralRatio(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getPositionDebt(
      accountId: PromiseOrValue<BigNumberish>,
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getVaultCollateral(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVaultCollateralRatio(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getVaultDebt(
      poolId: PromiseOrValue<BigNumberish>,
      collateralType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
