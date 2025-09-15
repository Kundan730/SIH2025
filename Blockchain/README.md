# <h1 align="center"> Forge Template </h1>

**Template repository for getting started quickly with Foundry projects**

![Github Actions](https://github.com/foundry-rs/forge-template/workflows/CI/badge.svg)

## Getting Started

Click "Use this template" on [GitHub](https://github.com/foundry-rs/forge-template) to create a new repository with this repo as the initial state.

Or, if your repo already exists, run:
```sh
forge init
forge build
forge test
```

## Writing your first test

All you need is to `import forge-std/Test.sol` and then inherit it from your test contract. Forge-std's Test contract comes with a pre-instatiated [cheatcodes environment](https://book.getfoundry.sh/cheatcodes/), the `vm`. It also has support for [ds-test](https://book.getfoundry.sh/reference/ds-test.html)-style logs and assertions. Finally, it supports Hardhat's [console.log](https://github.com/brockelmore/forge-std/blob/master/src/console.sol). The logging functionalities require `-vvvv`.

```solidity
pragma solidity 0.8.10;

import "forge-std/Test.sol";

contract ContractTest is Test {
    function testExample() public {
        vm.roll(100);
        console.log(1);
        emit log("hi");
        assertTrue(true);
    }
}
```

## Development

This project uses [Foundry](https://getfoundry.sh). See the [book](https://book.getfoundry.sh/getting-started/installation.html) for instructions on how to install and use Foundry.


## CMD
forge build
export PRIVATE_KEY= 0xe1a57117f1928e60b4ef0938f42c058c020b2af191a5cf39c191b3713201176b

forge create src/BlueCarbonToken.sol:BlueCarbonToken \
  --rpc-url https://eth-sepolia.g.alchemy.com/v2/OgX2oq12FWRTYy5zEJj9_5BHxL_JktB0 \
  --private-key $PRIVATE_KEY


forge verify-contract \
  --chain sepolia \
  --etherscan-api-key W1P2BWYQ6BE5E5Y3M8QUW5U3XG8S42W842 \
  0x745a1C33a96717A3154519a2A35B8b432344c0B7 \
  src/CarbonToken.sol:BlueCarbonToken


forge create src/CarbonRegistory.sol:CarbonRegistry \
  --rpc-url https://eth-sepolia.g.alchemy.com/v2/OgX2oq12FWRTYy5zEJj9_5BHxL_JktB0 \
  --private-key $PRIVATE_KEY \
  --etherscan-api-key W1P2BWYQ6BE5E5Y3M8QUW5U3XG8S42W842 \
  --verify


0x5e3d3513e57249102867622B1E525f387EC8ca30 //registory
0x745a1C33a96717A3154519a2A35B8b432344c0B7 //carbon credit token


test

forge create src/CarbonRegistory.sol:CarbonRegistry \
  --rpc-url https://eth-sepolia.g.alchemy.com/v2/OgX2oq12FWRTYy5zEJj9_5BHxL_JktB0 \
  --private-key $PRIVATE_KEY
