// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../client/node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: BSC TEST
     * Aggregator: ETH/USD
     BNB/USD: 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE
     * 
     * Mainnet: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
     ME: 0xC8626974B1dE9e5886bF8f7E9F469EB275C7D408
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
