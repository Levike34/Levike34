pragma solidity ^0.8.0;

import "./Poseidos.sol";
import "../client/node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Parthenon is Ownable {
    
    IERC20 public poseidos;
    address public parthenon = address(this);
    
    
    event Bought(uint _amount, uint _total);
    event Sold(uint _amount, uint _total);
    
    constructor (address _token) {
        poseidos = IERC20(_token);
    }
    
    function getPoseidosSupply() public view returns(uint) {
        return poseidos.balanceOf(address(this));
    }
    
    function getETHBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    //Send poseidos to the Dex from owner of ERC20 token.
    function fundParthenon(uint _amount) public {
        poseidos.transferFrom(msg.sender, address(this), _amount);
    }
    
    uint public rate = 1;
    function setRate(uint _rate) public onlyOwner {
        rate = _rate;
    }

    function getRate() public view returns(uint) {
        return rate;
    }
    function buyPoseidos() payable public {
        uint amountToBuy = msg.value * rate; //For 1 MATIC, you get 1 III.
        uint dexBalance = poseidos.balanceOf(address(this));
        require(amountToBuy > 0, "Buy more.");
        require(dexBalance >= amountToBuy, "The exchange is out of Poseidos.");
        poseidos.transfer(msg.sender, amountToBuy); 
        emit Bought(amountToBuy, poseidos.balanceOf(address(this)));
    }
    
    function sellPoseidos(uint _amount) public {
        require(_amount > 0, "Sell something.");
        poseidos.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(_amount / rate); //For 1 III, you get 1 MATIC.
        emit Sold(_amount, poseidos.balanceOf(address(this)));
    }
    
}