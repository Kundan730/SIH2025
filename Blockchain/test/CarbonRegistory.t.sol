// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/CarbonRegistory.sol";
import "../src/CarbonToken.sol";

contract CarbonRegistryTest is Test {
    CarbonRegistry registry;
    BlueCarbonToken token;
    address ngo = address(0xBEEF);

    function setUp() public {
        registry = new CarbonRegistry();
        token = registry.carbonToken();
    }

    function testRegisterProjectMintsTokens() public {
        vm.startPrank(ngo);

        registry.registerProject(
            100, // credits
            "12.9716N,77.5946E",
            "NGO-123",
            block.timestamp,
            10 // area
        );

        vm.stopPrank();

        // Verify stored entry
        CarbonRegistry.RegistryEntry[] memory userEntries = registry.getDetails(ngo);
        CarbonRegistry.RegistryEntry memory entry = userEntries[0];

        assertEq(entry.projectOwner, ngo);
        assertEq(entry.carbonCredits, 100 ether); // scaled with 18 decimals
        assertEq(entry.coordinates, "12.9716N,77.5946E");
        assertEq(entry.orgId, "NGO-123");
        assertEq(entry.date, block.timestamp);
        assertEq(entry.area, 10);

        // Verify token minting
        assertEq(token.balanceOf(ngo), 100 ether);
    }

    function testRegisterProjectEmitsEvent() public {
        vm.startPrank(ngo);

        // Expect event
        vm.expectEmit(true, true, false, true);
        emit CarbonRegistry.Registered(
            ngo,
            100 ether,
            "12.9716N,77.5946E",
            "NGO-123",
            block.timestamp,
            10
        );

        registry.registerProject(
            100,
            "12.9716N,77.5946E",
            "NGO-123",
            block.timestamp,
            10
        );

        vm.stopPrank();
    }

    function testFailRegisterProjectZeroCredits() public {
        vm.startPrank(ngo);

        // This should revert because credits = 0
        registry.registerProject(
            0,
            "12.9716N,77.5946E",
            "NGO-123",
            block.timestamp,
            10
        );

        vm.stopPrank();
    }
}
