//SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./FinalizedPapaDoge.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 

/// ************************************************************************//
/// This DAO allows voters to stake their PAPA while still receiving reward //
/// reflections.  User's stake PAPA to receive weighted voting rights to     //
/// vote on the next batch of reward tokens and their distribution rankings.//
/// ************************************************************************//

/// @title Papa Doge DAO
/// @notice Divided into 2 parts: Staking and Voting.
/// @dev This contract is inseparable from the Papa Doge BEP20 contract.


contract PapaStake is Ownable {

    IBEP20 public PAPA;
    PapaDogeDAO public papadogeDAO;

    uint public stakerCount;

    /// @notice 12 weeks
    uint public stakingPeriod = 90 days; 

    ///@notice 5  - 10 million staked.
    uint constant public L1 = 1;     
    ///@notice 10 - 50 million staked.
    uint constant public L2 = 10; 
    ///@notice 50 - 250 million staked.   
    uint constant public L3 = 50;   
    ///@notice 250 - 500 million staked. 
    uint constant public L4 = 100; 
    ///@notice 500 million - 2 billion staked. 
    uint constant public L5 = 400; 
    ///@notice 2 billion staked.  
    uint constant public L6 = 1000;  


    constructor(address _papaAddress, address _papadogeDAO) {
        PAPA = IBEP20(_papaAddress);
        papadogeDAO = PapaDogeDAO(_papadogeDAO);
        transferOwnership(0x65F7dbC2082A9571f3d49bC27975Ce6F26B60eb7); //Master Wallet
    }

    struct Staker {
        uint amountStaked;
        uint startTime;
        uint endTime;
    }
    
    mapping(address => Staker) public stakers;
    mapping(address => uint) public votes;

    /// @notice Stake PAPA to get votes.
    /// @param amount The amount of PAPA to stake
    function stake(uint amount) public {
        require(amount >= 5000000000000000); // 5 million required to become staker.
        //PAPA.approve(address(PAPA), amount);
        PAPA.transferFrom(msg.sender, address(this), amount);
        stakers[msg.sender].amountStaked += amount;
        stakers[msg.sender].startTime = block.timestamp;
        stakers[msg.sender].endTime = block.timestamp + stakingPeriod;
        votes[msg.sender] += 1;
        if(stakers[msg.sender].amountStaked - amount == 0) {
            stakerCount += 1;
        } 
    }
    
    /// @notice Unstake PAPA. Rewards from reflections will be sent out proportionally to total share in contract.
    function unStake() public {
        require(block.timestamp > stakers[msg.sender].endTime, "You cannot unstake yet.");

        uint totalSharehold = getPAPABalance();
        uint userSharePercent = stakers[msg.sender].amountStaked / totalSharehold;
        IBEP20 refToken1 = papadogeDAO.getTok1();
        IBEP20 refToken2 = papadogeDAO.getTok2();
        IBEP20 refToken3 = papadogeDAO.getTok3();
        uint totalshareTok1 = getBalance();
        uint totalshareTok2 = getBalance2();
        uint totalshareTok3 = getBalance3();
        uint userOwed1 = userSharePercent * totalshareTok1;
        uint userOwed2 = userSharePercent * totalshareTok2;
        uint userOwed3 = userSharePercent * totalshareTok3;

        PAPA.transfer(msg.sender, stakers[msg.sender].amountStaked);
        refToken1.transfer(msg.sender, userOwed1); 
        refToken2.transfer(msg.sender, userOwed2);
        refToken3.transfer(msg.sender, userOwed3); 
        stakers[msg.sender].amountStaked = 0; 
        stakerCount -= 1;
    }


    /// @notice Check voter elgibility.
    /// @param staker The address to check.
    /// @return true = can vote, false = cannot vote.
    function hasVotes(address staker) external view returns(bool) {
        if(votes[staker] > 0) {
            return true;
        } else {
            return false; 
        }
    }

    /// @notice Check voter class by address.
    /// @param addr The address to check.
    /// @return Voting weight of the address.
    function getVoteWeight(address addr) external view returns(uint) {
        if(stakers[addr].amountStaked < 5000000000000000) {
            return 0;
        } else if(stakers[addr].amountStaked >= 5000000000000000 && stakers[addr].amountStaked < 10000000000000000) {
            return L1; //1 vote
        } else if(stakers[addr].amountStaked >= 10000000000000000 && stakers[addr].amountStaked < 50000000000000000) {
            return L2; //10 votes
        } else if(stakers[addr].amountStaked >= 50000000000000000 && stakers[addr].amountStaked < 250000000000000000) {
            return L3; //50 votes
        } else if(stakers[addr].amountStaked >= 250000000000000000 && stakers[addr].amountStaked < 500000000000000000) {
            return L4; //100 votes
        } else if(stakers[addr].amountStaked >= 500000000000000000 && stakers[addr].amountStaked < 2000000000000000000) {
            return L5; //400 votes
        } else if(stakers[addr].amountStaked >= 2000000000000000000) {
            return L6; //1000 votes
        } 
    }

    /// @notice Checks the balance of reflection tokens held by the contract for unstaking reward proportions.
    /// @return Balance of each reflection token held by the contract.
    function getBalance() public view returns(uint) {
        IBEP20 refToken1 = papadogeDAO.getTok1();
        return refToken1.balanceOf(address(this)); 
    }
    function getBalance2() public view returns(uint) {
        IBEP20 refToken2 = papadogeDAO.getTok2();
        return refToken2.balanceOf(address(this)); 
    }
    function getBalance3() public view returns(uint) {
        IBEP20 refToken3 = papadogeDAO.getTok3();
        return refToken3.balanceOf(address(this)); 
    }

    function getPAPABalance() public view returns(uint) {
        return PAPA.balanceOf(address(this));
    }

    /// @notice Add 1 vote when someone stakes in stake().
    /// @param addr The address to add votes to.
    function setVoteCount(address addr) external {
        require(msg.sender == address(papadogeDAO));
        votes[addr] -= 1;
    }

    /// @notice Set the staking time required when someone stakes PAPA.
    /// @param timePeriodDays The amount of days staked PAPA will be locked to receive voting rights.
    function setStakeSettings(uint timePeriodDays) public onlyOwner {
        stakingPeriod = timePeriodDays * 1 days; 
    }


}

contract PapaDogeDAO is Ownable {

    /// @notice Functions for Dividend Distributors in the BEP20 Papa Doge contract.
    /// @return Current refelection tokens.
    function getTok1() public view returns(IBEP20) {
        return refToken1;
    }
    function getTok2() public view returns(IBEP20) {
        return refToken2;
    }
    function getTok3() public view returns(IBEP20) {
        return refToken3;
    }

   
    IBEP20 public refToken1; //Distributor1
    IBEP20 public refToken2; //Distributor2
    IBEP20 public refToken3; //Distributor3

    IBEP20 public PAPA;
    PapaStake public papaStake;

    function getPapaStake() public view returns(address) {
        return address(papaStake);
    }

    event VoteResults(address winner, address runnerUp, address loser);

    ///@notice tracks the current vote status.
    bool public voteInProgress;
    uint public counter;
    uint public voteEnd;

    ///@notice track individual voter status for the current vote.
    mapping(uint => mapping(address => bool)) public voted;

    constructor(address _papaAddress) {
        counter = 1;
        PAPA = IBEP20(_papaAddress);
        papaStake = new PapaStake(_papaAddress, address(this));

    ///@notice original reflection tokens are DOGE, BABYDOGE, FLOKI
        refToken1 = IBEP20(0xbA2aE424d960c26247Dd6c32edC70B295c744C43); //DOGE     
        refToken2 = IBEP20(0xc748673057861a797275CD8A068AbB95A902e8de); //BABYDOGE 
        refToken3 = IBEP20(0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7); //FLOKI    
        
    ///@dev  Transfer ownership to the Master Wallet    
        transferOwnership(0x65F7dbC2082A9571f3d49bC27975Ce6F26B60eb7); 
    }

    ///@notice Vote data: 3 tokens and 3 counts with vote round id.
    struct TokenCandidates {
        address token1;
        address token2;
        address token3;
        uint token1count;
        uint token2count;
        uint token3count;
        uint id;
    }

    mapping(uint => TokenCandidates) public candidates;

    /// @notice Opens reflection token vote.
    /// @param _token1 candidate 1
    /// @param _token2 candidate 2
    /// @param _token3 candidate 3
    /// @param _days Amount of days until the vote is finished.
    function openTokenVote(address _token1, address _token2, address _token3, uint _days) public onlyOwner {
        require(voteInProgress == false, "Vote in progress.");

        candidates[counter].token1 = _token1;
        candidates[counter].token2 = _token2;
        candidates[counter].token3 = _token3;
        candidates[counter].id = counter;

        voteEnd = block.timestamp + (_days * 1 days); 
        voteInProgress = true; 
    }

    ///@notice Choose from 3 tokens, tallies will rank which ones get the higher percentages for PAPA distribution.
    ///@param _choice choose a token out of 3: address _token1(1), address _token2(2), address _token3(3).
    function vote(uint _choice) public { 
        require(papaStake.hasVotes(msg.sender) == true && voted[counter][msg.sender] == false, "You are not allowed."); 
        require(voteInProgress == true && block.timestamp <= voteEnd, "No voting now."); 
        require(_choice > 0 && _choice <= 3, "Choose from the list."); 
        uint voteWeight = papaStake.getVoteWeight(msg.sender);
        if(_choice == 1) {
            candidates[counter].token1count += (1 * voteWeight);
        }else if(_choice == 2) {
            candidates[counter].token2count += (1 * voteWeight);
        }else if(_choice == 3) {
            candidates[counter].token3count += (1 * voteWeight);
         }

        ///@notice 1 vote per staker, multiplied by their Vote Weight class (calculated by amount PAPA staked).
        voted[counter][msg.sender] = true; 
        papaStake.setVoteCount(msg.sender);  ///staker used 1 of total eligible votes
    }

    ///@notice get voting results
    ///@return gets the addresses in order from highest count to lowest count.
    function tallyUp() public view returns(address, address, address) {
        address winner = tallyVoteWinner();
        address runnerUp = tallyRunnerUp();
        address loser = tallyVoteLoser();
        return(winner, runnerUp, loser);
    }

    ///@notice get winner
    ///@return highest vote count token.
    function tallyVoteWinner() public view returns(address) {
        uint token1 = candidates[counter].token1count;
        uint token2 = candidates[counter].token2count;
        uint token3 = candidates[counter].token3count;
        if(token1 > token2 && token1 > token3) {
            return candidates[counter].token1;
        } else if(token2 > token1 && token2 > token3) {
            return candidates[counter].token2;
        } else if(token3 > token1 && token3 > token2) {
            return candidates[counter].token3; 
        }
    }

    ///@notice get loser
    ///@return lowest vote count token.
    function tallyVoteLoser() public view returns(address) {
        uint token1 = candidates[counter].token1count;
        uint token2 = candidates[counter].token2count;
        uint token3 = candidates[counter].token3count;
        if(token1 < token2 && token1 < token3) {
            return candidates[counter].token1;
        } else if(token2 < token1 && token2 < token3) {
            return candidates[counter].token2;
        } else if(token3 < token1 && token3 < token2) { 
            return candidates[counter].token3; 
        }
    }

    ///@notice get runner up
    ///@return middle vote count token.
    function tallyRunnerUp() public view returns(address) {
        uint token1 = candidates[counter].token1count;
        uint token2 = candidates[counter].token2count;
        uint token3 = candidates[counter].token3count;
        if(token1 < token2 && token1 > token3 || token1 > token2 && token1 < token3) {
            return candidates[counter].token1;
        } else if(token2 < token1 && token2 > token3 || token2 > token1 && token2 < token3) {
            return candidates[counter].token2;
        } else if(token3 < token1 && token3 > token2 || token3 > token1 && token3 < token2) { 
            return candidates[counter].token3; 
        }
    }

    ///@notice Calculate vote results and change reward tokens
    function execute() public onlyOwner {
        require(block.timestamp > voteEnd, "Vote is not over.");
        require(voteInProgress = true, "No vote to execute.");
        
        address winner = tallyVoteWinner();
        address loser = tallyVoteLoser();
        address runnerUp = tallyRunnerUp();
        refToken1 = IBEP20(winner);
        refToken2 = IBEP20(runnerUp);
        refToken3 = IBEP20(loser);
        voteInProgress = false;
        counter++;
        emit VoteResults(winner, runnerUp, loser);
    } 

    ///@notice Set reward tokens manually.
    function emergencySetTokens(address token1, address token2, address token3) public onlyOwner {
        refToken1 = IBEP20(token1);
        refToken2 = IBEP20(token2);
        refToken3 = IBEP20(token3);
    } 

}
