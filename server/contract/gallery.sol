// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Gallery {
  IERC20 public token;
  IERC721 public nft;

  mapping (address => bool) public allowances;
  mapping(uint256 => mapping (address => uint256)) public unlockTime; //nftid -> address 
  mapping(uint256 => mapping (address => bool)) public nftOwner; //nftid -> address 
  address private owner;
  uint256 public rewardTokenAmount;
  

  constructor(address _token, address _nft) {
    token = IERC20(_token);
    nft = IERC721(_nft);
    owner = msg.sender;
    allowances[owner] = true;
    rewardTokenAmount = 1;
  }

  function stake(uint256 nftId, uint256 _unlockTime) external {
    uint256 rewardAmount = _updateReward(_unlockTime);
    token.transfer(msg.sender, rewardAmount);
    nft.transferFrom(msg.sender, address(this), nftId);

    unlockTime[nftId][msg.sender] = _unlockTime;
    nftOwner[nftId][msg.sender] = true;
  }

  function withdraw(uint256 nftId) external {
    uint256 _unlockTime = unlockTime[nftId][msg.sender];
    bool isNftOwner = nftOwner[nftId][msg.sender];
    require(_unlockTime <= block.timestamp, "Gallery: curr time must be in the future");
    require(isNftOwner, "Gallery: only nftOwner possible");

    nft.transferFrom(address(this), msg.sender, nftId);

    unlockTime[nftId][msg.sender] = 0;
    nftOwner[nftId][msg.sender] = false;
  }

  function _updateReward(uint256 _unlockTime) private view returns (uint256) {
    require(_unlockTime > block.timestamp, "Gallery: input time must be in the future");
    uint256 timeDifference = _unlockTime - block.timestamp;
    uint256 numOfHours = timeDifference / 1 hours;
    //if(numOfHours < 1) numOfHours = 1; //test
    return numOfHours  * rewardTokenAmount;
  }

  ////
  function setRewardTokenAmount(uint256 amount) public {
    require(allowances[msg.sender], "Gallery: only allowances possible");
    rewardTokenAmount = amount;
  }  

  function sendToken(address _addr, uint256 amount) public {
    require(allowances[msg.sender], "Gallery: only allowances possible");
    token.transfer(_addr, amount);
  }

  function sendNft(address _addr, uint256 nftId) public {
    require(allowances[msg.sender], "Gallery: only allowances possible");
    nft.transferFrom(address(this), _addr, nftId);
  }
  
  function approve(address _addr) public {
    require(owner == msg.sender, "Gallery: only owner possible");
    allowances[_addr] = true;
  }  
}