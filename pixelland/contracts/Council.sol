// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Profession {
    address public currentContract;
    function setCurrentContract(address _currentContract) public returns(bool){
        currentContract = _currentContract;
        return true;
    }
}

contract Council is Ownable {


    mapping(address => Profession) public profession;

    constructor() {
       
    }  

   
    
}