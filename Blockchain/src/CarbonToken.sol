// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

/// @title Carbon Credit Token
contract CarbonToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Carbon Credit Token", "CCT") {
        _mint(msg.sender, initialSupply);
    }
}
