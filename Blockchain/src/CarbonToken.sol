// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

/// @title Carbon Credit Token
contract CarbonToken is ERC20 {
    address public registry; // only registry can mint

    constructor() ERC20("Carbon Credit Token", "CCT") {
        registry = msg.sender; // deployer will be registry contract
    }

    modifier onlyRegistry() {
        require(msg.sender == registry, "Not authorized");
        _;
    }

    /// @notice Mint new tokens (only registry)
    function mint(address to, uint256 amount) external onlyRegistry {
        _mint(to, amount);
    }
}