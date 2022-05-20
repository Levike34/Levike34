// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pixel is ERC20, Ownable {

    mapping(address => bool) private authorized;
    mapping(address => bool) private got;

    constructor() ERC20("Pixel", "PIXEL"){
        _mint(msg.sender, 100000000000000000000000000); //1,000,000,000 = 1 billion.
        authorized[msg.sender] = true;
    }  

    ///only authorized accounts
    function burn(uint256 amount) public {
        require(authorized[msg.sender] == true);
        _burn(_msgSender(), amount);
    }
    
    function mint() public {
        require(!got[msg.sender]);
        _mint(msg.sender, 1000000000000000000000000);
    }

    ///Authorize certain smart contracts in Pixel's ecosystem
    ///for burning.
    function authorize(address addr) public onlyOwner {
        authorized[addr] = true; 
    }
    function unAuthorize(address addr) public onlyOwner {
        authorized[addr] = false; 
    }
    
}