pragma solidity ^0.8.0;

contract ProxyStorage {
    uint public myNumber;
}

contract Pointer is ProxyStorage {
    address public currentContract;
    function setCurrentContract(address _currentContract) public returns(bool){
        currentContract = _currentContract;
        return true;
    }
}

contract One is ProxyStorage {
    function setMyNumber(uint _myNumber) public returns (bool success) {
        myNumber = _myNumber;
        return true;
    }
}

contract Two is ProxyStorage {
    function setMyNumber(uint _myNumber) public returns (bool success) {
        myNumber = _myNumber * 10;
        return true;
    }
}