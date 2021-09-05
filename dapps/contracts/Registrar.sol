pragma solidity ^0.8.0;
import "./VaxProtocol.sol";

contract Registrar {
    string public name;
    address public id = address(this);

 
    VaxProtocol parentContract;
    
    constructor(VaxProtocol _parentContract, string memory _name) {
        parentContract = _parentContract;
        name = _name;
    }
}