pragma solidity ^0.8.0;

import "./Allowance.sol";

contract SharedWallet is Allowance {
    using SafeMath for uint;
    
    uint public totalBalance;
    
    
    event MoneyDeposited(address indexed _who, uint _amount, uint _totalAmount);
    event MoneyWithdrew(address indexed _beneficiary, uint _amount, uint _totalAmount);
    
    function deposit() public payable {
        totalBalance = totalBalance.add(msg.value);
        emit MoneyDeposited(msg.sender, msg.value, totalBalance);
    }
    
    function withdraw(uint _amount) public payable {
        allowance[owner] = _amount;
        require(allowance[msg.sender] >= _amount, "Amount exceeds your allowance.");
        require(totalBalance >= _amount);
        emit AllowanceChanged(msg.sender, msg.sender, allowance[msg.sender], allowance[msg.sender].sub(_amount));
        emit MoneyWithdrew(msg.sender, _amount, totalBalance);
        payable(msg.sender).transfer(_amount);
        allowance[msg.sender] = allowance[msg.sender].sub(_amount);
        totalBalance = totalBalance.sub(_amount);
    }
    
    function withdrawAll() public payable onlyOwner {
        emit MoneyWithdrew(msg.sender, totalBalance, totalBalance);
        payable(msg.sender).transfer(totalBalance);
        totalBalance = 0;
    }

    function getBalance() public view returns(uint) {
        return totalBalance;
    }

    receive() external payable{}
}    