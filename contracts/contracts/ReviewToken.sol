// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 0x257B7Bd2E932e7e6E8388EF934a77CD853522438
contract MyToken is ERC20 {
    constructor() ERC20("ReviewToken", "RVT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}