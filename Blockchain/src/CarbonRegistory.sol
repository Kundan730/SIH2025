// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CarbonToken.sol";

/// @title Carbon Registry
contract CarbonRegistry {
    struct RegistryEntry {
        uint256 id;
        address projectOwner;
        uint256 carbonCredits;
        string coordinates; 
        string orgId;       
        uint256 date;       
    }

    uint256 public nextId;
    CarbonToken public carbonToken;

    mapping(uint256 => RegistryEntry) public entries;

    event Registered(
        uint256 indexed id,
        address indexed owner,
        uint256 credits,
        string coordinates,
        string orgId,
        uint256 date
    );

    constructor(address _carbonToken) {
        carbonToken = CarbonToken(_carbonToken);
    }

    function registerProject(
        uint256 credits,
        string memory coordinates,
        string memory orgId,
        uint256 date
    ) external {
        require(credits > 0, "Credits must be > 0");

        carbonToken.transferFrom(msg.sender, address(this), credits);

        entries[nextId] = RegistryEntry({
            id: nextId,
            projectOwner: msg.sender,
            carbonCredits: credits,
            coordinates: coordinates,
            orgId: orgId,
            date: date
        });

        emit Registered(nextId, msg.sender, credits, coordinates, orgId, date);
        nextId++;
    }
}
