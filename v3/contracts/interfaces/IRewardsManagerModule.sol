//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Module for managing pools and assignments per account
interface IRewardsManagerModule {
    function distributeRewards(
        uint128 poolId,
        address collateralType,
        uint256 amount,
        uint256 start,
        uint256 duration
    ) external;
}
