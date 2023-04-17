// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Fundraising {
    string public title;
    string public img_url;

    


    uint256 public targetAmount;
    address public owner;
    mapping(address => uint256) public donations;

    uint256 public raisedAmount = 0;
    uint256 public finishTime = block.timestamp + 4 weeks;

    constructor(uint256 _targetAmount) {
        targetAmount = _targetAmount;
        owner = msg.sender;
        title = "Youth Football Development Fund";
        img_url = "https://monthly.chosun.com/upload/1410/1410_288_2.jpg";
    }
    
    /*
        Create a function called receive and we have to say that it is external,
        which means it can only be called from outside of the contract.
        add the payable modifer to it to indicate that this can receive money.
    */
    receive() external payable {
        // `require` the block.timestamp which is a date, to be a smaller date than the finishTime of our contract.
        // if the block.timestamp is bigger, which means the current date is after the finishTime,
        // we will show an error that says "This campaign is over".
        require(block.timestamp < finishTime, "This campaign is over");
        
        // Using the global variable `msg.sender` to know who is sending money and `msg.value` to know how much they are sending
        // and we save this info in our mapping, with the sender as they key and the money amount as the value.
        donations[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }
    
    
    /*
        `withdrawDonations` will check if the person calling this function is the same person that created this contract
        by checking the `msg.sender` with the owner set on the constructor, if they are not the same it will throw an error.
    */
    function withdrawDonations() external {
        require(msg.sender == owner, "Funds will only be released to the owner");
        
        // Let's check if the `raisedAmount` which is the donation counter, is more than or equals to the target of the campaing
        // and if it isn't let's throw an error using require again.
        require(raisedAmount >= targetAmount, "The project did not reach the goal");
        
        // If all these conditions are true, if the person calling withdrawDonations is the owner of the contract,
        // if the raised amount is more than the target amount, and if the campaign has finished we will release the funds to the owner.
        require(block.timestamp > finishTime, "The campaign is not over yet.");
        payable(owner).transfer(raisedAmount);
    }
    
    /*
        In the refund function we check to see if the campaign is over or now,
        if it is not over then the user won't be able to get a refund.
    */
    function refund() external {
        // If all the following conditions are true, if the campaign is over and it didn't reach the goal and if the user asking for the refund did donate to the campaign,
        // we will put the amount of donated money on a variable.
        require(block.timestamp > finishTime, "The campaign is not over yet.");
        require(raisedAmount < targetAmount, "The campaign reached the goal.");
        require(donations[msg.sender] > 0, "You did not donate to this campaign.");
        
        uint256 toRefund = donations[msg.sender];
        donations[msg.sender] = 0;
        // Then update our donations list, to make sure that the same user can't ask for a refund twice.
        payable(msg.sender).transfer(toRefund);
    }
}