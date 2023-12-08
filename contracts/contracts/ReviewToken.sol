// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// the contracts inherits the erc20 and erc721 from openzeppelin 
contract ReviewToken is ERC20{

    address public owner;
    

    struct Product {
        string name;
        string description;
        uint256 price;
        uint256 id;
        PopNFT[200] nfts;
    }




    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    constructor() ERC20("Universal", "UNI") {
        _mint(msg.sender, 1000000000000000000000000000);
    }

    function mint(address to, uint256 amount) internal onlyOwner{
        _mint(to, amount);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

}
