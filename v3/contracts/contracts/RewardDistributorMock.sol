// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../interfaces/IRewardDistributor.sol';
import '../interfaces/IRewardsManagerModule.sol';
import '../interfaces/IERC20.sol';
import '@synthetixio/core-contracts/contracts/interfaces/IERC165.sol';

contract RewardDistributorMock is IRewardDistributor, IERC165 {
    address private _rewardManager;
    address private _token;
    string private _name;

    error Unauthorized(address sender);

    function initialize(
        address rewardManager,
        address token_,
        string memory name_
    ) public {
        _rewardManager = rewardManager;
        _token = token_;
        _name = name_;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function token() public view override returns (address) {
        return _token;
    }

    function payout(
        uint128,
        uint128,
        address,
        address sender,
        uint256 amount
    ) external returns (bool) {
        // IMPORTANT: In production, this function should revert if msg.sender is not the Synthetix CoreProxy address.
        if (msg.sender != _rewardManager) {
            revert Unauthorized(msg.sender);
        }
        IERC20(_token).transfer(sender, amount);
        return true;
    }

    function distributeRewards(
        uint128 poolId,
        address collateralType,
        uint256 amount,
        uint256 start,
        uint256 duration
    ) public {
        IRewardsManagerModule(_rewardManager).distributeRewards(
            poolId,
            collateralType,
            amount,
            start,
            duration
        );
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IRewardDistributor).interfaceId ||
            interfaceId == this.supportsInterface.selector;
    }
}
