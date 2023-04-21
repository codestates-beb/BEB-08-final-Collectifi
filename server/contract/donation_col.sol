// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Erc20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract CrowdDonation {
    string public title;
    string public img_url;    
    COLToken public token;
    uint256 public targetAmount;
    address public owner;
    mapping(address => uint256) public donations;

    uint256 public raisedAmount = 0;
    uint256 public finishTime = block.timestamp + 4 weeks;

    constructor(address _tokenAddress, uint256 _targetAmount) {
        token = COLToken(_tokenAddress);
        targetAmount = _targetAmount;
        owner = msg.sender;
        title = "Education support for low-income children";
        img_url = "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/vlP/image/TnuQM01BhuVEsXg0RvsNc1iO3cM.jpg";        
    } 





    function fund(address payable user, uint256 amount) public  {
        require(block.timestamp < finishTime, "This Campaign is over");

        donations[user] += amount;
        raisedAmount += amount;
        token.transferFrom(user, address(this), amount);

    }

    function withdrawDonations() external {
        // require(msg.sender == owner, "Funds will only be released to the Owner");

        // require(raisedAmount >= targetAmount, "The project did not reach the goal");

        // require(block.timestamp > finishTime, "The campaign is not over yet.");
        token.transfer(owner, raisedAmount);
    }

    function refund() external {

        // require(block.timestamp > finishTime, "The campaign is not over yet.");
        // require(raisedAmount < targetAmount, "The campaign reached the goal.");
        // require(donations[msg.sender] > 0, "You did not donate to this campaign.");
        
        uint256 toRefund = donations[msg.sender];
        donations[msg.sender] = 0;

        token.transfer(msg.sender, toRefund);
    }

    


}

