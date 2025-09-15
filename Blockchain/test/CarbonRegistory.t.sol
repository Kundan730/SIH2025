// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import "../src/CarbonRegistory.sol";
import "../src/CarbonToken.sol";
contract CarbonRegistryTest is Test {
    CarbonRegistry registry;
    CarbonToken token;
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

        // Verify that tokens were minted to NGO
        assertEq(token.balanceOf(ngo), 100 ether);
    }
}
