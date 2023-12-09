// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfPurchaseNFT is ERC721, Ownable {
    uint256 private tokenId;
    mapping(uint256 => string) private tokenURIs;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable(msg.sender) {}

    function mint(address to, string memory uri) public onlyOwner {
        tokenId = tokenId + 1;
        _mint(to, tokenId);
        tokenURIs[tokenId] = uri;
    }

    function getTokenId() public view returns (uint256) {
        return tokenId;
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return tokenURIs[_tokenId];
    }
}
