// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IFactory.sol";
import "./IExchange.sol";

contract Exchange is ERC20{
    event TokenPurchase(
        address indexed buyer,
        uint256 indexed ethSold,
        uint256 indexed tokensBought
    );
    event EthPurchase(
        address indexed buyer,
        uint256 indexed ethSold,
        uint256 indexed tokensBought
    );
    event AddLiquidity(
        address indexed provider,
        uint256 indexed ethAmount,
        uint256 indexed tokenAmount
    );
    event RemoveLiquidity(
        address indexed provider,
        uint256 indexed ethAmount,
        uint256 indexed tokenAmount
    );

    IERC20 token;
    IFactory factory;

    constructor (address _token) ERC20("SWAP LP","LP-V1"){
        token = IERC20(_token); 
        factory = IFactory(msg.sender);
    }


    function getEthBalance() public view returns (uint256) {
    return address(this).balance;
    }

    //유동성 추가 아예 없을때와 유동성 있는 곳에 추가할 경우
    function addLiquidity(uint256 _maxTokens) public payable{
        uint256 totalLiquidity = totalSupply();
        if(totalLiquidity>0){
            uint256 ethReserve = address(this).balance - msg.value;
            uint256 tokenReserve = token.balanceOf(address(this));
            uint256 tokenAmount = msg.value * ethReserve/tokenReserve;
            require(_maxTokens >= tokenAmount);
            token.transferFrom(msg.sender,address(this),tokenAmount);
            uint256 liquidityMinted = totalLiquidity * msg.value/ethReserve;
            _mint(msg.sender,liquidityMinted);
        }else{
            uint256 tokenAmount = _maxTokens;
            uint256 initialLiquidity = address(this).balance;
            _mint(msg.sender,initialLiquidity);
            token.transferFrom(msg.sender,address(this),tokenAmount);
        }
    }
    //유동성 제거
    function removeLiquidity(uint256 _lpTokenAmount) public{
        require(_lpTokenAmount > 0);
        uint256 totalLiquidity = totalSupply();
        uint256 ethAmount = _lpTokenAmount * address(this).balance / totalLiquidity;
        uint256 tokenAmount = _lpTokenAmount * token.balanceOf(address(this))/totalLiquidity;

        _burn(msg.sender,_lpTokenAmount);

        payable(msg.sender).transfer(ethAmount);
        token.transfer(msg.sender,tokenAmount);
    }



    //ETH -> ERC20
    function ethToTokenSwap(uint256 _minToken) public payable{
        //address(this).balance-msg.value 빼준 이유는 함수를 실행한 시점에서 ETH값이 더해진 상태로 조회되기 때문에 그 값을 빼준다.
        ethToToken(_minToken,msg.sender);
    }

    function ethToTransfer(uint256 _minToken,address _recipient) public payable{
        require(_recipient != address(0));
        ethToToken(_minToken,_recipient);
    }

    //개선된 ETH -> ERC20 
    function ethToToken(uint256 _minToken,address _recipient) private{
        //address(this).balance-msg.value 빼준 이유는 함수를 실행한 시점에서 ETH값이 더해진 상태로 조회되기 때문에 그 값을 빼준다.
        uint256 outputAmount = getOutputAmountWithFee(msg.value,address(this).balance-msg.value,token.balanceOf(address(this)));
        require(outputAmount >= _minToken);

        token.transfer(_recipient,outputAmount);
        
        emit TokenPurchase(_recipient, msg.value, outputAmount);
    }

    //ERC20 -> ETH
    function tokenToEthSwap(uint256 _tokenSold,uint256 _minEth) public payable{
        
        uint256 outputAmount = getOutputAmountWithFee(_tokenSold,token.balanceOf(address(this)),address(this).balance);
        require(outputAmount >= _minEth,"outputAmount >= _minEth");
        token.transferFrom(msg.sender,address(this),_tokenSold);
        payable(msg.sender).transfer(outputAmount);
    }
    //ERC20 -> ERC20
    //_minTokenBought 최종적으로 스왑 했을 때 얻게 되는 토큰의 수
    //스왑 할 때 사용할 ETH의 수가 계산보다 적을 때 _minEthBought를 이용해 중간에 확인작업을 한다
    function tokenToTokenSwap(uint256 _tokenSold,uint256 _minTokenBought,uint256 _minEthBought,address _tokenAddress) public payable{
        address toTokenExchangeAddress = factory.getExchange(_tokenAddress);

        uint256 ethOutputAmount = getOutputAmountWithFee(_tokenSold,token.balanceOf(address(this)),address(this).balance);
        require(ethOutputAmount >= _minEthBought,"ethOutputAmount >= _minEthBought");
        IERC20(token).transferFrom(msg.sender,address(this),_tokenSold);

        IExchange(toTokenExchangeAddress).ethToTransfer{value:ethOutputAmount}(_minTokenBought,msg.sender);
        payable(msg.sender).transfer(ethOutputAmount);
    }

    //Eth
    function getOutputAmountWithFee(uint256 inputAmount,uint256 inputReserve,uint256 outputReserve) public pure returns (uint256){
        uint256 inputAmountWithFee = inputAmount * 99;
        uint256 numerator = outputReserve * inputAmountWithFee;
        uint256 denominator = inputReserve * 100  + inputAmountWithFee;
        return numerator / denominator;
    }

    function tokenBalanceOf() public view returns (uint256){
        return token.balanceOf(address(this));
    }

    function ethBalanceOf() public view returns (uint256){
        return address(this).balance;
    }


}