pragma solidity ^0.8.0;


import "../client/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import './Poseidos.sol';
import './Owned.sol';

contract EtherStake is Owned {
    
    
    
    Poseidos public poseidos;
    uint fees;
    
    
     uint public rewardInterval = 86400; 
    
    //The divsisor for reward calculation. 100 = 1%, 50 = 2%, etc.
    //See the calculateReward funcction.
    uint public interestRate = 50;
    
    event StakeChanged(address _who, uint _amount, uint _total, uint _totalBalance);
    event RewardChanged(address _who, uint _amount, uint _totalPoseidos);
    
    
    //Data structure to keep track of staker reward and stake total
    struct Staker {
        uint stake;
        uint reward;
        uint startTime;
        bool isStaking;
        
    }
    
    mapping(address => Staker) public stakers;

    constructor(Poseidos _poseidos) {
        poseidos = _poseidos;
    }
    
    
    
    //View functions for Front-End
    function balance() public view returns (uint256) {
        return address(this).balance;
}

    function poseidosBalance() public view returns(uint256) {
        return poseidos.balanceOf(msg.sender);
    }
    
    function getInterestInfo() public view returns(uint256) {
        return interestRate;
    }
    
    function getStake() public view returns(uint256) {
        return stakers[msg.sender].stake;
    }
     
    
    function getReward() public view returns(uint256) {
        return stakers[msg.sender].reward;
    }
    
    //Modifiers for the interest in reward calculations
    function setInterest_Interval(uint _newRate) public onlyOwner {
        interestRate = _newRate;
    }
    
    

    function deposit()  public payable {
        // Amount must be greater than zero
         require(msg.value > 0, "amount cannot be 0");
         if(stakers[msg.sender].isStaking == true && stakers[msg.sender].reward > 0) {
            collectReward(); 
         }
         
        
        // Calculate start of stake and time until reward distribution
         stakers[msg.sender].isStaking = true;
         stakers[msg.sender].stake += msg.value;
         stakers[msg.sender].startTime = block.timestamp;
         emit StakeChanged(msg.sender, msg.value, stakers[msg.sender].stake, address(this).balance);
}

    function withdraw(uint256 _amount) public {
        require(stakers[msg.sender].stake >= _amount);
        //Fee to make it worth it
        uint fee = _amount / 100;
        
        uint amount = _amount - fee;
        payable(owner).transfer(fee);

        // Transfer ETH from this smart contract back to msg sender
        payable(msg.sender).transfer(amount);
        stakers[msg.sender].stake -= _amount;
        if(_amount == stakers[msg.sender].stake) {
            stakers[msg.sender].isStaking = false;
        }
        emit StakeChanged(msg.sender, _amount, stakers[msg.sender].stake, address(this).balance);
        
}
    
     //Rewards stakeholder the set % in Mango per day
    function calculateReward() public view returns(uint256) {
        require(stakers[msg.sender].isStaking == true, "No rewards available yet.");
        uint256 daysCompleted = (block.timestamp - stakers[msg.sender].startTime) / rewardInterval;
        return(daysCompleted * stakers[msg.sender].stake) / interestRate;
    }
    
    function collectReward() public {
        uint amountToGive = calculateReward();
        stakers[msg.sender].reward = amountToGive;
        require(stakers[msg.sender].reward > 0, "No rewards yet.");
        uint _amount = stakers[msg.sender].reward;
        stakers[msg.sender].reward -= _amount;
        stakers[msg.sender].startTime = block.timestamp;
        poseidos.mint(msg.sender, _amount);
        emit RewardChanged(msg.sender, _amount, poseidos.balanceOf(msg.sender));
    }
    
    receive() external payable {}
    
}