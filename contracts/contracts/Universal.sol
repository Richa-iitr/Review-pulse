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
        mapping(address => address) popNfts;
    }

    //pdt id mapped with Product struct
    mapping(uint256 => Product) public products;
    mapping(string => address) private aadharToAddress;
    mapping(address => uint256) private addressToStakeamt;
    mapping(address => bool) private staked;

    //sign in with aadhar
    function registerAadhar(string memory aadhar) public {
        require(aadharToAddress[aadhar] == "0x", "not registered");
        aadharToAddress[aadhar] = msg.sender;
        addressToStakeamt[msg.sender] = 10000;
    }

    //add product
    function addProduct(
        string memory name,
        uint256 id,
        address nft,
        string aadhar
    ) public {
        require(aadharToAddress[aadhar] != "0x", "not registered");
        products[id] = Product(name, id, nft);
    }

    function buyProduct(uint256 productId, address aadhar) public {
        require(aadharToAddress[aadhar] != "0x", "not registered");
        require(products[productId].popNfts[popNft] == false, "Already minted");
        address nft = products[productId].nft;
        ProofOfPurchaseNFT(nft).mint(aadharToAddress[aadhar], productId);
        products[productId].popNfts[popNft] = msg.sender;
    }

    function review(uint256 amount) public {
        require(
            products[productId].popNfts[popNft] == msg.sender,
            "not a verified buyer"
        );
        require(addressToStakeamt[msg.sender] >= amount, "not enough balance");
        addressToStakeamt[msg.sender] -= amount;
        staked[msg.sender] = true;
    }

    function claim(uint256 amount) public {
        require(staked[msg.sender] == true, "not reviewed");
        addressToStakeamt[msg.sender] += amount;
        transfer(msg.sender, amount);
    }
}
