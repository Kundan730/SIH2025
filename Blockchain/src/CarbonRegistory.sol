// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {BlueCarbonToken} from "./CarbonToken.sol";

contract CarbonRegistry {
    struct RegistryEntry {
        address projectOwner;
        uint256 carbonCredits;
        string coordinates;
        string orgId;
        uint256 date;
        uint256 area;
    }

    BlueCarbonToken public carbonToken;

    mapping(address => RegistryEntry[]) public entries;

    event Registered(
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

        RegistryEntry memory entry = RegistryEntry({
            projectOwner: msg.sender,
            carbonCredits: credits * 1e18,
            coordinates: coordinates,
            orgId: orgId,
            date: date,
            area: area
        });

        entries[msg.sender].push(entry);

        carbonToken.mint(msg.sender, credits * 1e18);

        emit Registered(
            msg.sender,
            credits * 1e18,
            coordinates,
            orgId,
            date,
            area
        );
    }

    function getDetails(address projectOwner) external view returns (RegistryEntry[] memory) {
        return entries[projectOwner];
    }
}
