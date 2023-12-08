// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./interfaces.sol";
import "./PopNFT.sol";
import {ReviewToken} from "./ReviewToken.sol";

contract Universal is ProofOfPurchaseNFT, ReviewToken {
    address public owner;

    struct Product {
        string name;
        uint256 id;
        address nft;
        mapping(address => bool) popNfts;
    }

    
}
