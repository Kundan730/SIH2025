pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
contract CarbonToken is ERC20 {
    address public registry; 

    constructor() ERC20("Blue Carbon Token", "BCT") {
        registry = msg.sender; 
    }

    modifier onlyRegistry() {
        require(msg.sender == registry, "Not authorized");
        _;
    }
    function mint(address to, uint256 amount) external onlyRegistry {
        _mint(to, amount);
    }
}