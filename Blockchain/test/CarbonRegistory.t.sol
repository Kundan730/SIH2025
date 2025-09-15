// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";
import "../src/CarbonRegistory.sol";
import "../src/CarbonToken.sol";

contract CarbonRegistryTest is Test {
    CarbonRegistry registry;
    CarbonToken token;
    address ngo = address(0xBEEF);

    function setUp() public {
        token = new CarbonToken(1000 ether);
        registry = new CarbonRegistry(address(token));

        token.transfer(ngo, 100 ether);
    }

    function testRegisterProject() public {
        vm.startPrank(ngo);

        token.approve(address(registry), 50 ether);

        registry.registerProject(
            50 ether,
            "12.9716N,77.5946E",
            "NGO-123",
            block.timestamp
        );

        vm.stopPrank();

        (
            uint256 id,
            address owner,
            uint256 credits,
            string memory coords,
            string memory orgId,
            uint256 date
        ) = registry.entries(0);

        assertEq(id, 0);
        assertEq(owner, ngo);
        assertEq(credits, 50 ether);
        assertEq(coords, "12.9716N,77.5946E");
        assertEq(orgId, "NGO-123");
        assertEq(date, block.timestamp);

        assertEq(token.balanceOf(address(registry)), 50 ether);
    }
}
