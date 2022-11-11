// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../interfaces/IRewardDistributor.sol';
import '../interfaces/IERC20.sol';

contract RewardDistributor is IRewardDistributor {
    function name() external pure returns (string memory) {
        return 'RewardDistributor';
    }

    function payout(
        uint128,
        uint128,
        address collateralType,
        address sender,
        uint256 amount
    ) external returns (bool) {
        IERC20(collateralType).transfer(sender, amount);
        return true;
    }

    function distributeRewards(
        address rewardManager,
        uint128 poolId,
        address collateralType,
        uint256 amount,
        uint256 start,
        uint256 duration
    ) public {
        IRewardsManagerModule(rewardManager).distributeRewards(
            poolId,
            collateralType,
            amount,
            start,
            duration
        );
    }
}

interface IRewardsManagerModule {
    function distributeRewards(
        uint128 poolId,
        address collateralType,
        uint256 amount,
        uint256 start,
        uint256 duration
    ) external;
}
