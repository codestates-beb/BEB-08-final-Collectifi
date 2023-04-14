// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './erc20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Soccer {
  GLDToken public token;
  uint256 public winAmount = 0;
  uint256 public loseAmount = 0;
  uint256 public drawAmount = 0;
  uint256 public totalAmount = 0;
  uint256 public winCount = 0;
  uint256 public loseCount = 0;
  uint256 public drawCount = 0;
  string public win = 'win';
  string public lose = 'lose';
  string public draw = 'draw';
  address payable public owner;

  uint256[] public winBalanceValue = new uint256[](100);
  uint256[] public loseBalanceValue = new uint256[](100);
  uint256[] public drawBalanceValue = new uint256[](100);
  address[] public winKeys = new address[](100);
  address[] public loseKeys = new address[](100);
  address[] public drawKeys = new address[](100);

  constructor(address _tokenAddress) {
    token = GLDToken(_tokenAddress);
    owner = payable(msg.sender);
  }

  function fund(address payable user, string memory game, uint256 value) public payable {
    // require(keccak256(bytes(game)) == keccak256(bytes(win)) || keccak256(bytes(game)) == keccak256(bytes(lose)) || keccak256(bytes(game)) == keccak256(bytes(draw)), "Choose one win or lose or draw");
    if (keccak256(bytes(game)) == keccak256(bytes(win))) {
      winKeys[winCount] = user;
      winBalanceValue[winCount] = value;
      winAmount += value;
      totalAmount += value;
      token.transferFrom(user, owner, value);
      winCount++;
    }
    if (keccak256(bytes(game)) == keccak256(bytes(lose))) {
      loseKeys[loseCount] = user;
      loseBalanceValue[loseCount] = value;
      loseAmount += value;
      totalAmount += value;
      token.transferFrom(user, owner, value);
      loseCount;
    }
    if (keccak256(bytes(game)) == keccak256(bytes(draw))) {
      drawKeys[drawCount] = user;
      drawBalanceValue[drawCount] = value;
      drawAmount += value;
      totalAmount += value;
      token.transferFrom(user, owner, value);
    }
  }

  function userAddress() public {}

  function totalToken() public view returns (uint256) {
    return totalAmount;
  }

  function winToken() public view returns (uint256) {
    return winAmount;
  }

  function loseToken() public view returns (uint256) {
    return loseAmount;
  }

  function drawToken() public view returns (uint256) {
    return drawAmount;
  }

  function matchedReward(string memory game, uint256 drainage) public payable {
    if (keccak256(bytes(game)) == keccak256(bytes(win))) {
      for (uint256 i = 0; i < winCount; i++) {
        uint256 toReward = winBalanceValue[i] * drainage;
        winBalanceValue[i] = 0;
        totalAmount -= toReward;
        token.transfer(winKeys[i], toReward);
      }
    }
    if (keccak256(bytes(game)) == keccak256(bytes(lose))) {
      for (uint256 i = 0; i < loseCount; i++) {
        uint256 toReward = loseBalanceValue[i] * drainage;
        loseBalanceValue[i] = 0;
        totalAmount -= toReward;
        token.transfer(loseKeys[i], toReward);
      }
    }
    if (keccak256(bytes(game)) == keccak256(bytes(draw))) {
      for (uint256 i = 0; i < drawCount; i++) {
        uint256 toReward = drawBalanceValue[i] * drainage;
        drawBalanceValue[i] = 0;
        totalAmount -= toReward;
        token.transfer(drawKeys[i], toReward);
      }
    }
  }
}
