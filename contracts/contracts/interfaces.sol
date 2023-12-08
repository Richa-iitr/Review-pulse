interface IPopNFT {
    function mint(uint256) external;
    function getTokenMetadata(uint256 tokenId) external view returns (string memory);
     
}

interface IReviewToken {
    function mint(address to, uint256 amount) external;
    function transfer(address to, uint256 amount) external returns (bool); 
}