// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRewardDistributor {
    function payout(
        uint poolId,
        address token,
        address to,
        uint amount
    ) external returns (bool);
}
