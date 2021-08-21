pragma solidity ^0.5.17;

contract vaxProtocol {
    
   struct Patient {
       bool vaxxed;
       uint vaxCount;
   }
    mapping (address => Patient) public vaxxedPeople;
    
    function getVaxxed() public {
        require(vaxxedPeople[msg.sender].vaxCount < 2, "Already vaxxed.");
        vaxxedPeople[msg.sender].vaxxed = true;
        vaxxedPeople[msg.sender].vaxCount += 1;
    }
    
    function checkVaxxed(address _patient) public view returns (bool) {
        require(vaxxedPeople[_patient].vaxxed == true, "Not vaxxed.");
        return true;
    }
    
}
