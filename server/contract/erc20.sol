// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20 {
    uint256 public maxSupply;
    address payable public joinRewardAddress;
    uint256 pulic userReward;
    uint256 public initValue = 0;


    constructor(uint256 ) ERC20("ToKenIn", "TKI") {
        maxSupply = 1000000000000;
        userReward = maxSupply / 2;
        _mint(msg.sender, maxSupply);
    }


    function joinReward(address payable joinUserAddress) public view returns(bool) {
        joinRewardAddress = joinUserAddress;
        require(balanceOf(joinRewardAddress) == initValue);
        transfer(joinRewardAddress,1000);
    }
}