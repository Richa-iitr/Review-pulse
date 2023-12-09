//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

interface IPopNFT {
    function mint(address) external;
    function getTokenId() external returns (uint256);
    function getTokenMetadata(uint256 tokenId) external view returns (string memory);
     
}

interface IReviewToken {
    function mint(address to, uint256 amount) external;
    function transfer(address to, uint256 amount) external returns (bool); 
}