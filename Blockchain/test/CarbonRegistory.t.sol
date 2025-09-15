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
        // Deploy registry (which internally deploys CarbonToken)
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
        (
            uint256 id,
            address owner,
            uint256 credits,
            string memory coords,
            string memory orgId,
            uint256 date,
            uint256 area
        ) = registry.entries(0);

        assertEq(id, 0);
        assertEq(owner, ngo);
        assertEq(credits, 100 ether); // scaled with 18 decimals
        assertEq(coords, "12.9716N,77.5946E");
        assertEq(orgId, "NGO-123");
        assertEq(date, block.timestamp);
        assertEq(area, 10);

        // Verify token minting
        assertEq(token.balanceOf(ngo), 100 ether);

        // Verify that nextId incremented
        assertEq(registry.nextId(), 1);
    }

    function testRegisterProjectEmitsEvent() public {
        vm.startPrank(ngo);

        // Expect event
        vm.expectEmit(true, true, false, true);
        emit CarbonRegistry.Registered(
            0,
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
        // This should revert because credits = 0
        registry.registerProject(
            0,
            "12.9716N,77.5946E",
            "NGO-123",
            block.timestamp,
            10
        );
    }
}
