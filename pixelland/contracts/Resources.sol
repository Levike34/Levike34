//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Resources is ERC1155 {
    IERC20 public pixel;

    uint256 public constant WOOD = 0;
    uint256 public constant STONE = 1;
    uint256 public constant FOOD = 2;
    uint256 public constant HEALTH_POTIONS = 3;
    uint256 public constant STAMINA_POTIONS = 4;
    uint256 public constant SKELETON_BONES = 5;


    constructor(address _pixel) ERC1155("Pixelland Resources") {
        _mint(msg.sender, WOOD, 10**12, "");
        _mint(msg.sender, STONE, 10**6, "");
        _mint(msg.sender, FOOD, 10**10, "");
        _mint(msg.sender, HEALTH_POTIONS, 10**5, "");
        _mint(msg.sender, STAMINA_POTIONS, 10**5, "");
        _mint(msg.sender, SKELETON_BONES, 10**9, "");
        pixel = IERC20(_pixel);
    }
}
