pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./CCLC.sol";

contract TeamStorage is Ownable {

    //40 million CCLC stored until the beginning of the first ICO, to be re-vested when ICO starts.

    CCLC public cclc;

    event TokensClaimed(uint _amount);
    
    uint startTime = block.timestamp;
    uint fundReleaseStart = block.timestamp +  12 weeks; //3 months after start of ICO (8 weeks)
    //uint fundReleaseEnd = fundReleaseStart + 24 weeks; //6 months
    //uint fundReleaseInterval = 4 weeks;
    uint claimedAmount;
    uint total = 40000000000000000000000000;

    constructor(CCLC token) {
        cclc = token;
    }

    function _transferOwnership(address newOwner) public onlyOwner {
        transferOwnership(newOwner);
    } 


   
    function claimTokens() public onlyOwner{
        uint claimableAmount = getClaimAmount();
        uint amountToGive =  claimableAmount - claimedAmount;
        require(claimableAmount > 0, "Can't claim anything now.");
        require(claimedAmount + amountToGive <= 40000000000000000000000000);
        require(claimedAmount != 40000000000000000000000000, "You have claimed all of your CCLC.");
        cclc.transfer(msg.sender, amountToGive);
        claimedAmount += amountToGive;
        emit TokensClaimed(amountToGive);
      }

    function getClaimAmount() public view returns(uint256) {
          if(block.timestamp < fundReleaseStart) {
              return 0;
          } else {
              return total;
          }
      }

    function getUserClaimed() public view returns(uint256) {
        return claimedAmount;
      }

    receive() external payable {}

}