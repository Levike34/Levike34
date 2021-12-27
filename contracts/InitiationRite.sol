pragma solidity ^0.8.0;

import '../client/node_modules/@openzeppelin/contracts/access/Ownable.sol'; 
import './Poseidos.sol';

contract InitiationRite is Ownable {
    
    Poseidos public poseidos;
    address public rite = address(this);
    bool checked;
    
    constructor(address _poseidos) {
        poseidos = Poseidos(_poseidos);
    }
        
    event Favor(uint _num);
    event GodOfDay(uint _num);
    
    
    //The data structure for the Initiate.
    struct Initiate{
        uint choice;
        uint choiceCount;
        bool paid;
        bool praised;
    }
    
    
    mapping(address => Initiate) public cult;

    function getStage() public view returns(uint) {
        return cult[msg.sender].choiceCount;
    }
    
    
    function offering() public {
        require(poseidos.balanceOf(msg.sender) >= 1000000000000000000, 'The gods reject your measly offering.');
        require(cult[msg.sender].paid == false, 'The gods have accepted your daily offer.');
        poseidos.transferFrom(msg.sender, address(this), 1000000000000000000);
        cult[msg.sender].paid = true;
        cult[msg.sender].choiceCount = 1;
    }
    
    //Choice of wine upon waking.  Initiate selects a drink, if same as last initiate, they win 2 III.
    //Sets after each person chooses.  Only 1-5.
    uint public wineNum = 1;
    
    function chooseWine(uint _num) public {
        require(cult[msg.sender].choiceCount == 1, "You have passed.");
        require(cult[msg.sender].paid == true, 'Donate to Poseidon first.');
        require(_num > 0 && _num <= 5, "Only 5 wines here.");
        if(wineNum == _num){
            poseidos.mint(msg.sender, 2000000000000000000);
            cult[msg.sender].choiceCount = 2;
            wineNum = _num;
            emit Favor(_num);
        } else{
        wineNum = _num;
        cult[msg.sender].choiceCount = 2; 
        }
    }
    
    //Determines winners of Part2 pot at the end of the day.
    function rand() public view returns(uint256) {
    uint256 seed = uint256(keccak256(abi.encodePacked(
        block.timestamp + block.difficulty +
        ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / (block.timestamp)) +
        block.gaslimit + 
        ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (block.timestamp)) +
        block.number
    )));

    return (seed - ((seed / 4) * 4));
}
    
    //God choices for Part2.
        uint public poseidon;   //1
        uint public  zeus;     //2
        uint public hades;    //3

        uint public godOfDay;
        uint public potWinners;
        
        uint public startTime = block.timestamp;
        uint interval = 1 days;
        uint public pot;

    function getPot() public view returns(uint) {
        return address(this).balance;
    }
    function getTimeLeft() public view returns(uint) {
        if(block.timestamp > startTime + 86400) {
            return 0;
        } else {
        return (startTime + 86400) - block.timestamp;
        }
    }
    
    //Gives Initiate a chance to win the daily ETHER pot.  If no one wins, it goes to the ETH : Poseidos liquidity pool.
    function praise(uint _num) public payable {
        require(_num > 0 && _num <= 3);
        require(cult[msg.sender].choiceCount == 2);
        require((msg.sender).balance >= 1000000000000000000); //1 MATIC
        payable(address(this)).transfer(1000000000000000000);
        pot += 1000000000000000000;
        cult[msg.sender].choiceCount = 3;
        cult[msg.sender].praised = true;
        if(_num == 1) {
            poseidon++;
            cult[msg.sender].choice = poseidon;
        }
        else if(_num == 2) {
            zeus++;
            cult[msg.sender].choice = zeus;
        }
        else if(_num == 3) {
            hades++;
            cult[msg.sender].choice = hades;
        }
    }
    
    
    //Gets random number 1-3.
    function getDailyGod() public {
        //require(block.timestamp - startTime > interval, 'Day is not over.');
        require(checked == false);
        godOfDay = rand();
        if(godOfDay == 1) {
            potWinners == poseidon;
        } else if(godOfDay == 2) {
            potWinners == zeus;
        } else if(godOfDay == 3) {
            potWinners == hades;
        }
        emit GodOfDay(godOfDay);
        checked = true;
        
    }
    
    //Performed on the front end after praise to determine win.
    function checkFate() public view returns(bool) {
        require(cult[msg.sender].praised == true, 'The gods have naught to do with you, mortal.');
        if(cult[msg.sender].choice == godOfDay) {
            return true;
        }
        else{
            return false;
        }
    }
    
    function prayerAnswered() public {
        require(cult[msg.sender].praised == true, 'The gods have naught to do with you, mortal.');
        require(checked == true);
        bool win = checkFate();
        uint winnings = pot / potWinners;
        if(win == true) {
            payable(msg.sender).transfer(winnings);
            cult[msg.sender].choiceCount = 3;
        }
        else {
            poseidos.mint(msg.sender, 1000000000000000000); //mints 1 III for losers as compensation.
            cult[msg.sender].choiceCount = 3;
        }
    }
    
    //Skips the ETHER bet.
    function rejectPraise() public {
        require(cult[msg.sender].choiceCount == 2);
        cult[msg.sender].choiceCount = 3;
    }
    
    function withdrawIII() public onlyOwner {
        poseidos.transfer(msg.sender, poseidos.balanceOf(address(this)));
    }

    function withDraw() public payable onlyOwner {
        payable(msg.sender).transfer(pot);
    }
    
    receive() payable external {}
    
}