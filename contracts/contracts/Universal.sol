// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "./interfaces.sol";
import "./PopNFT.sol";
import {ProofOfPurchaseNFT} from "./PopNFT.sol";
import {GovernanceToken} from "./GovernanceToken.sol";
import {MyToken} from "./ReviewToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Lilypad} from "./Lilypad.sol";

//linea: 0xb31EA32b27b3e28cF8369c121f6E2996f26e3277
contract Universal {
    MyToken public token;

    mapping(uint256 => mapping(address => uint256)) popNfts;
    struct Product {
        string name;
        uint256 id;
        ProofOfPurchaseNFT nft;
    }
    // declare a constant string
    string public constant RANDOMNFTGENERATORPROMPT =
        "Give a prompt for generating a random NFT for users of our dapp called Review-pulse";
    Lilypad public lilypad;

    //pdt id mapped with Product struct
    mapping(uint256 => Product) public products;
    uint256 public productCount;
    mapping(uint256 => uint256) public noOfReviews;
    mapping(string => address) private aadharToAddress;
    mapping(address => uint256) private addressToStakeamt;
    mapping(address => bool) private staked;
    mapping(uint256 => uint256) public productValuePool;
    mapping(uint256 => uint256) public claimThreshold;
    uint256 public promptJobId;
    uint256 public nftJobId;
    // address public daoGovernor;
    // GovernanceToken public govToken;

    event productReviewed(uint256 productId, address sender);
    event thresholdChanged(uint256 threshold);

    constructor(
        // address dao,
        // address governorToken,
        address reviewToken
    ) {
        // daoGovernor = dao;
        // govToken = GovernanceToken(governorToken);
        token = MyToken(reviewToken);
        lilypad = new Lilypad();
        productCount = 0;
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
        string memory aadhar
    ) public payable {
        require(msg.value > 0, "not enough value sent");
        require(aadharToAddress[aadhar] != address(0x00), "not registered");
        Product memory pdt;
        pdt.name = name;
        pdt.id = id;
        pdt.nft = new ProofOfPurchaseNFT(name, "RVT");
        products[id] = pdt;
        payable(address(this)).transfer(msg.value);
        productValuePool[id] = msg.value;
        productCount++;
    }

    function buyProduct(
        uint256 productId,
        string calldata aadhar,
        string memory uri
    ) public {
        require(aadharToAddress[aadhar] != address(0x00), "not registered");
        ProofOfPurchaseNFT nft = products[productId].nft;
        nft.mint(aadharToAddress[aadhar], uri);
        uint256 tokenId = nft.getTokenId();
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
        // require(msg.sender == daoGovernor, "Only DAO can call");
        claimThreshold[productId] = threshold;
        emit thresholdChanged(claimThreshold[productId]);
    }

    function claim(uint256 amount, uint256 share) public payable {
        require(staked[msg.sender] == true, "not reviewed");
        addressToStakeamt[msg.sender] += amount;
        token.transfer(msg.sender, amount);
        payable(msg.sender).transfer((productValuePool[share] * share) / 100);
        //mint gov token
        // govToken.mint(msg.sender, 10000000000000000);
    }

    function generateRandomPrompt() public {
        promptJobId = lilypad.runMistral(RANDOMNFTGENERATORPROMPT);
    }

    function getRandomNFT(string memory prompt) public {
        nftJobId = lilypad.runStableDiffusion(prompt);
    }

    function getPopNFT(
        uint256 productId,
        address user
    ) public view returns (uint256) {
        return popNfts[productId][user];
    }
}
