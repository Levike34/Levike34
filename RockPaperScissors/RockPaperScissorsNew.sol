pragma solidity ^0.8.0;

contract RockPaperScissors {
      
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    constructor(){
    }
    
    struct Player {
        uint id;
        bool inGame;
        uint wager;
    }
    

    
    mapping(address => Player) public players;
  
    event GameResult(string result);

    uint public gameID;
    Game[] public games;

    struct Game {
        uint id;
        address player1;
        uint prize;
        uint choice;
        bool finished;
    }

    function getMyGame() public view returns(uint) {
        return players[msg.sender].id;
    }
    
    function startGame() public payable {
        require(players[msg.sender].inGame == false, "Finish your other game.");
        require(msg.value > 0, "Not Enough Funds.");
        uint prize = msg.value * 2;
        games.push(Game(gameID, msg.sender, prize, 5, false));
        payable(address(this)).transfer(msg.value);
        players[msg.sender].id = gameID;
        players[msg.sender].wager += msg.value;
        gameID++;
    }
    
    //0-2 R,P, S.
    function play(uint _choice) public payable {
       uint _id = getMyGame();
       require(msg.sender == games[_id].player1, "This is not your game.");
       require(_choice >= 0 && _choice < 3);
       games[_id].choice = _choice;
       games[_id].finished = true;
       uint aiChoice = rand();
        if( games[_id].choice == 0 && aiChoice == 2){
             payable(msg.sender).transfer(games[_id].prize);
             players[msg.sender].inGame == false;
             emit GameResult("winner");
        } else if( games[_id].choice == 2 && aiChoice == 1){
            payable(msg.sender).transfer(games[_id].prize);
             players[msg.sender].inGame == false;
            emit GameResult("winner");
        } else if( games[_id].choice == 1 && aiChoice == 0){
            payable(msg.sender).transfer(games[_id].prize);
             players[msg.sender].inGame == false;
            emit GameResult("winner");
    } else if(games[_id].choice == aiChoice){
        payable(msg.sender).transfer(games[_id].prize / 2);
         players[msg.sender].inGame == false;
        emit GameResult("tie");
    }
    else{
        emit GameResult("lost");
         players[msg.sender].inGame == false;
        return;
    }
    }

    //Determines CPU move.
    function rand() public view returns(uint256) {
    uint256 seed = uint256(keccak256(abi.encodePacked(
        block.timestamp + block.difficulty +
        ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / (block.timestamp)) +
        block.gaslimit + 
        ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (block.timestamp)) +
        block.number
    )));

    return (seed - ((seed / 3) * 3));
}
    
    function fund() public payable {
        payable(address(this)).transfer(msg.value);
    }
    receive() external payable {}
}
