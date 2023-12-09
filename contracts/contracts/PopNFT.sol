// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfPurchaseNFT is ERC721, Ownable {
    string public baseURI;
    uint256 private tokenId;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        baseURI = _baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function mint(address to) public onlyOwner {
        tokenId = tokenId + 1;
        _mint(to, tokenId);
    }

    function getTokenId() public view returns (uint256) {
        return tokenId;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }


}
