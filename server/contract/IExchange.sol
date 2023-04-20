// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IExchange {
    function ethToTokenSwap(uint256 _minToken) external payable;
    function ethToTransfer(uint256 _minToken,address _recipient) external payable;
}