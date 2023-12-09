// Contract based on: https://docs.openzeppelin.com/contracts/4.x/governance
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

//linea: 0xBa1F9e7A98cd700969A36b9E8Cfe292dB49Dd4CD
//polygon 
contract GovernanceToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("Governance", "GVT") ERC20Permit("Governance") {}

    // The functions below are overrides required by Solidity.
    function _update(address from, address to, uint256 value) internal override(ERC20Votes, ERC20) {
        super._update(from,to,value);
    }

    function nonces(address owner) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }

    function mint(address to, uint256 amount) public {
        super._mint(to,amount);
    }

   
}
