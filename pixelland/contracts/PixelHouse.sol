// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721A.sol";
import "./Pixel.sol";
import "./PixelPlot.sol";

contract PixelHouse is ERC721A, Ownable {
    IERC20 public pixel;
    PixelPlot public pixelPlot;

    uint public priceInPixel;
    uint public constant DECIMALS = 10 ** 18;

    struct House {
        uint level;
        uint[4] furnitureSlots;
    }

    mapping(uint => House) public houses;

    constructor(address _pixel, address _pixelPlot) ERC721A("Pixel House", "HOUSE", 1, 10000) {
        priceInPixel = 100 * DECIMALS;
        pixel = IERC20(_pixel);
        pixelPlot = PixelPlot(_pixelPlot);
    }

    ///Only Plot owners can own houses.
    function mintHouse() public {
        require(pixelPlot.balanceOf(msg.sender) != 0);
        pixel.transferFrom(msg.sender, owner(), priceInPixel);
        _safeMint(msg.sender, 1);
    }
}