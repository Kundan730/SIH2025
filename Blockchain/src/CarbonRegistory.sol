// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {BlueCarbonToken} from "./CarbonToken.sol";
contract CarbonRegistry {
    struct RegistryEntry {
        uint256 id;
        address projectOwner;
        uint256 carbonCredits;
        string coordinates;
        string orgId;
        uint256 date;
        uint256 area;
    }

    uint256 public nextId;
    BlueCarbonToken public carbonToken;
    mapping(uint256 => RegistryEntry) public entries;

    event Registered(
        uint256 indexed id,
        address indexed owner,
        uint256 credits,
        string coordinates,
        string orgId,
        uint256 date,
        uint256 area
    );

    constructor() {
        carbonToken = new BlueCarbonToken();
    }

    function registerProject(
        uint256 credits,
        string memory coordinates,
        string memory orgId,
        uint256 date,
        uint256 area
    ) external {
        require(credits > 0, "Credits must be > 0");

        entries[nextId] = RegistryEntry({
            id: nextId,
            projectOwner: msg.sender,
            carbonCredits: credits * 1e18, // store scaled with 18 decimals
            coordinates: coordinates,
            orgId: orgId,
            date: date,
            area: area
        });

        // Mint tokens to project owner
        carbonToken.mint(msg.sender, credits * 1e18);

        emit Registered(
            nextId,
            msg.sender,
            credits * 1e18,
            coordinates,
            orgId,
            date,
            area
        );

        nextId++;
    }
}
