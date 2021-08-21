pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract Owned {
    address owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner () {
        require(msg.sender == owner, "You are not allowed.");
        _;
    }
}
contract Allowance is Owned {
    using SafeMath for uint;
    
    event AllowanceChanged(address indexed _forWho, address indexed _byWho, uint _oldAmount, uint _newAmount);
    
     mapping(address => uint) public allowance;
    
     function setAllowance(address _user, uint _allowance) public onlyOwner {
        emit AllowanceChanged(_user, msg.sender, allowance[_user], _allowance);
        allowance[_user] = _allowance;
    }
    
}
