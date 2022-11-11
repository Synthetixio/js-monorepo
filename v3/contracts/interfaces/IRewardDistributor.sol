// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Interface a reward distributor.
interface IRewardDistributor {
    /// @notice returns a human-readable name for the reward distributor
    function name() external returns (string memory);

    /// called by system
    function payout(
        uint128 accountId,
        uint128 poolId,
        address collateralType,
        address sender,
        uint256 amount
    ) external returns (bool);
}
