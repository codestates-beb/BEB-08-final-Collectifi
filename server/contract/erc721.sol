// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTLootBox is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 goldCard;
    uint256 silverCard;
    uint256 bronzCard;
    uint256 totalSupply1 = 0;
    uint256 gettokenid;
    string[] public name;
    string[] public description;
    uint256[] public price;
    address[] public fromAddress;


    constructor() ERC721("MyNFTs", "MNFT") {
        goldCard = 5000;
        silverCard = 3000;
        bronzCard = 1500;
    }

    function mintNFT(address recipient, string memory tokenURI,string memory _name,string memory _description,uint256 _price) public onlyOwner returns (uint256) {
        require(token.balanceOf(recipient) >= bronzCard);

        name.push(_name);
        description.push(_description);
        price.push(_price);
        fromAddress.push(recipient);
        totalSupply1++;

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        gettokenid = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function setToken (address tokenAddress) public onlyOwner returns (bool) {
        require(tokenAddress != address(0x0));
        token = IERC20(tokenAddress);
        return true;
    }

    function getNftName(uint256 tokenId) public view returns(string memory){
        return name[tokenId-1];
    }

    function getNftDescription(uint256 tokenId) public view returns(string memory){
        return description[tokenId-1];
    }

    function getTotalSupply() public view returns(uint256){
        return totalSupply1;
    }

    function getTokenId() public view returns(uint256){
        return gettokenid;
    }

    function getPrice(uint256 tokenId) public view returns(uint256){
        return price[tokenId -1];
    }


    function transferNFT(address from, address to, uint256 tokenId, uint256 value) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        safeTransferFrom(from,to,tokenId);
        token.transferFrom(to,from,value);
    }

    function setPrice(uint256 tokenId, uint256 newPrice) public onlyOwner{
        require(tokenId <= _tokenIds.current(), "Invalid token ID");
        price[tokenId-1] = newPrice;
    }


}