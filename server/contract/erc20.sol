// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract COLToken is ERC20 {
    uint256 public maxSupply;
    address payable public joinRewardAddress;
    uint256 public userReward;
    uint256 public initValue = 0;


    constructor() ERC20("Collectifi", "COL") {
        maxSupply = 100000000000000000000;
        userReward = maxSupply / 2;
        _mint(msg.sender, maxSupply);
    }


    function joinReward(address payable joinUserAddress) public returns(bool) {
        transfer(joinUserAddress,500000);
        return true;
    }

    function mintToken(address user,uint256 amount) public returns(uint256){
        _mint(user,amount);
        return amount;
    }
}