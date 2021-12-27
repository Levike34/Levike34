pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../client/node_modules/@openzeppelin/contracts/utils/Address.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Owned.sol";

contract UnderWorld is ERC20, Owned {
    using Address for address;
    using SafeERC20 for IERC20;

    IERC20 public poseidos;
    IERC20 public trident;
    
    
    uint public rewardInterval = 60 minutes;
    
    //The divsisor for reward calculation. 100 = 1%, 50 = 2%, etc.
    //See the calculateReward function.
    uint public interestRate = 50;
    
    event StakeChanged(address _who, uint _amount, uint _total, uint _poseidosTotal);
    event RewardChanged(address _who, uint _amount, uint _totalTrident);
    event RateChanged(uint _newRate);
    
    
    
    //Data structure to keep track of staker reward and stake total
    struct Staker {
        uint stake;
        uint reward;
        uint startTime;
        bool isStaking;
        
    }
    
    mapping(address => Staker) public stakers;

    constructor(address _token) ERC20("Trident", "TDNT") {
        poseidos = IERC20(_token);
        trident = IERC20(address(this));
    }
    
     //View functions for Front-End
    function balance() public view returns (uint256) {
        return poseidos.balanceOf(address(this));
}

    function tridentBalance() public view returns(uint256) {
        return trident.balanceOf(msg.sender);
    }
    
    function getInterestRate() public view returns(uint256) {
        return interestRate;
    }
    function getInterestInterval() public view returns (uint256) {
        return rewardInterval;
    }
      function getStake() public view returns(uint256) {
        return stakers[msg.sender].stake;
    }
    
    //Modifiers for the interest in reward calculations
    function setInterest_Interval(uint _newRate, uint _newInterval) public onlyOwner {
        interestRate = _newRate;
        rewardInterval = _newInterval * 60;
        emit RateChanged(_newRate); 
    }


    function deposit(uint256 _amount)  public {
        // Amount must be greater than zero
         require(_amount > 0, "amount cannot be 0");
         if(stakers[msg.sender].isStaking == true && stakers[msg.sender].reward > 0) {
            collectReward(); 
         }

        // Transfer Poseidos to smart contract
         poseidos.safeTransferFrom(msg.sender, address(this), _amount);

         // Mint Trident to msg sender
         _mint(msg.sender, _amount);
         
         // Calculate start of stake and time until reward distribution
         stakers[msg.sender].isStaking = true;
         stakers[msg.sender].stake += _amount;
         stakers[msg.sender].startTime = block.timestamp;
         emit StakeChanged(msg.sender, _amount, stakers[msg.sender].stake, poseidos.balanceOf(address(this)));

}

    function withdraw(uint256 _amount) public {
         // Burn tridents from msg sender
        _burn(msg.sender, _amount);

        // Transfer poseidos from this smart contract to msg sender
        poseidos.safeTransfer(msg.sender, _amount);
        stakers[msg.sender].stake -= _amount;
        if(_amount == stakers[msg.sender].stake) {
            stakers[msg.sender].isStaking = false;
        }
        emit StakeChanged(msg.sender, _amount, stakers[msg.sender].stake, poseidos.balanceOf(address(this)));

        
}

    function viewReward(address _staker) public view returns(uint256) {
        return stakers[_staker].reward; 
    }
    
     
     //Rewards stakeholder the set % in trident per day
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
        _mint(msg.sender, _amount);
        emit RewardChanged(msg.sender, _amount, trident.balanceOf(msg.sender));
    }

}