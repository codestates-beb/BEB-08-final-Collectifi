// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Exchange.sol";

contract Factory{
    mapping(address => address) tokenToExchange;

    event NewExchange(address indexed token,address indexed exchange);

    function createExchange(address _token) public returns (address){
        require(_token != address(0));
        require(tokenToExchange[_token] == address(0));
        Exchange exchange = new Exchange(_token);
        tokenToExchange[_token] = address(exchange); 
        emit NewExchange(_token,address(exchange));
        return address(exchange);
    }

    function getExchange(address _token) public view returns (address){
        return tokenToExchange[_token];
    }
}