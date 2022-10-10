// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IRewardDistributor.sol";
import "../interfaces/IERC20.sol";

contract RewardDistributor is IRewardDistributor {
    function payout(
        uint poolId,
        address token,
        address to,
        uint amount
    ) external returns (bool) {
        IERC20(token).transfer(to, amount);
        return true;
    }
}
