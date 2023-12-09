// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "./interfaces.sol";
import "./PopNFT.sol";
import {ProofOfPurchaseNFT} from "./PopNFT.sol";
import {GovernanceToken} from "./GovernanceToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//linea: 0xb31EA32b27b3e28cF8369c121f6E2996f26e3277
contract Universal {
    IERC20 public token = IERC20(0x257B7Bd2E932e7e6E8388EF934a77CD853522438);

    mapping(uint256 => mapping(address => uint256)) popNfts;
    struct Product {
        string name;
        uint256 id;
        address nft;
    }

    //pdt id mapped with Product struct
    mapping(uint256 => Product) public products;
    mapping(uint256 => uint256) public noOfReviews;
    mapping(string => address) private aadharToAddress;
    mapping(address => uint256) private addressToStakeamt;
    mapping(address => bool) private staked;
    mapping(uint256 => uint256) public claimThreshold;
    address public daoGovernor;
    GovernanceToken public govToken;

    event productReviewed(uint256 productId, address sender);
    event thresholdChanged(uint256 threshold);

    constructor(address dao, address governorToken) {
        daoGovernor = dao;
        govToken = GovernanceToken(governorToken);
    }

    //sign in with aadhar
    function registerAadhar(string calldata aadhar) public {
        require(aadharToAddress[aadhar] == address(0x00), "not registered");
        aadharToAddress[aadhar] = msg.sender;
        addressToStakeamt[msg.sender] = 10000;
    }

    //add product
    function addProduct(
        string memory name,
        uint256 id,
        address nft,
        string memory aadhar
    ) public {
        require(aadharToAddress[aadhar] != address(0x00), "not registered");
        Product memory pdt;
        pdt.name = name;
        pdt.id = id;
        pdt.nft = nft;
        products[id] = pdt;
    }

    function buyProduct(uint256 productId, string calldata aadhar) public {
        require(aadharToAddress[aadhar] != address(0x00), "not registered");
        address nft = products[productId].nft;
        IPopNFT(nft).mint(aadharToAddress[aadhar]);
        uint256 tokenId = IPopNFT(nft).getTokenId();
        popNfts[productId][msg.sender] = tokenId;
    }

    function review(uint256 amount, uint256 productId) public {
        require(popNfts[productId][msg.sender] != 0, "not a verified buyer");
        require(addressToStakeamt[msg.sender] >= amount, "not enough balance");
        addressToStakeamt[msg.sender] -= amount;
        staked[msg.sender] = true;
        noOfReviews[productId] += 1;
        emit productReviewed(productId, msg.sender);
        
    }

    function getNoOfReview(uint256 productId) public view returns (uint256) {
        return noOfReviews[productId];
    }

    function setClaimThreshold(uint256 productId, uint256 threshold) public {
        require(msg.sender == daoGovernor, "Only DAO can call");
        claimThreshold[productId] =  threshold;
        emit thresholdChanged(claimThreshold[productId]);
    }

    function claim(uint256 amount) public {
        require(staked[msg.sender] == true, "not reviewed");
        addressToStakeamt[msg.sender] += amount;
        token.transfer(msg.sender, amount);
        //mint gov token
        govToken.mint(msg.sender, 10000000000000000);
    }
}
