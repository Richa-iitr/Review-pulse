// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
 
contract ProofOfPurchaseNFT is ERC721Enumerable, Ownable {
    uint256 public currentTokenId;

    // Metadata for each NFT
    mapping(uint256 => string) private _tokenMetadata;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    // Mint new NFT with the product ID as metadata
    function mint(uint256 productId) external onlyOwner {
        uint256 tokenId = currentTokenId + 1;
        _safeMint(msg.sender, tokenId);
        _tokenMetadata[tokenId] = uintToString(productId); // Convert uint to string for metadata
        currentTokenId = tokenId;
    }

    // Retrieve metadata for a given token ID
    function getTokenMetadata(uint256 tokenId) external view returns (string memory) {
        return _tokenMetadata[tokenId];
    }

    // Convert uint to string utility function
    function uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        for (uint256 i = digits; i > 0; i--) {
            buffer[i - 1] = bytes1(uint8(48 + value % 10));
            value /= 10;
        }
        return string(buffer);
    }
}
