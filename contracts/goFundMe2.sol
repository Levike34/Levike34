// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract GoFundMe2 {
 
   uint public totalBalance = (address(this).balance);
   address owner = 0xc91A23b981cAE8aF602361911d331a4bC6849A0f;
   
   uint public id = 1;

    struct Receiver {
        uint id;
        uint amountRaised;
        uint targetAmount;
        uint startBlock;
        uint endBlock;
        string reason;
    }
    
    mapping(address => Receiver) public balanceRaised;
    mapping(uint => address) public owners;
    mapping(address => bool) public fundStarted; 

    function startFundMe(uint256 _amountToRaise, uint256 _daysToRaise, string memory reason) public {
        require(fundStarted[msg.sender] == false, "You are in a fund.");
        require(_daysToRaise >= 1, "Not enough time.");
        balanceRaised[msg.sender].id = id;
        owners[id] = msg.sender;
        balanceRaised[msg.sender].targetAmount = _amountToRaise;
        balanceRaised[msg.sender].startBlock = block.timestamp;
        balanceRaised[msg.sender].endBlock = block.timestamp + (86400 * _daysToRaise);
        balanceRaised[msg.sender].reason = reason;
        fundStarted[msg.sender] = true;
        id ++;
    }

    function donate(address _to) payable public {
        require(block.timestamp < balanceRaised[_to].endBlock, "Fund is over.");
        payable(address(this)).transfer(msg.value);
        balanceRaised[_to].amountRaised += msg.value;
    }

    function disperseFunds() public payable {
        require(fundStarted[msg.sender] == true, "You are not in a fund.");
        require(block.timestamp > balanceRaised[msg.sender].endBlock || balanceRaised[msg.sender].targetAmount >= balanceRaised[msg.sender].amountRaised, "Still ongoing." );
        uint total = balanceRaised[msg.sender].amountRaised;
        uint feeAmount = total / 10;
        uint giveAmount = total - feeAmount;
        
        payable(owner).transfer(feeAmount);
        payable(msg.sender).transfer(giveAmount);
        fundStarted[msg.sender] == false;
    }

    function getById(uint _id) public view returns(address) {
        return owners[_id];
    }

    function getId() public view returns(address) {
        return owners[id - 1];
    }

    function getId2() public view returns(address) {
        return owners[id - 2];
    }
    function getId3() public view returns(address) {
        return owners[id - 3];
    }

    function setOwner(address _newOwner) public {
        require(msg.sender == owner, "You are not the owner.");
        owner = _newOwner;
    }
    receive() external payable {}
}
