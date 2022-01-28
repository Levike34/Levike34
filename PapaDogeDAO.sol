//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PapaDoge.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 



contract PapaDogeDAO is Ownable {

    //USDT 0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684
    //DAI 0x8a9424745056Eb399FD19a0EC26A14316684e274
    //BUSD 0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7
    //LINK 0x84b9b910527ad5c03a9ca831909e21e236ea7b06

    function getTok1() public view returns(IBEP20) {
        return refToken1;
    }
    function getTok2() public view returns(IBEP20) {
        return refToken2;
    }
    function getTok3() public view returns(IBEP20) {
        return refToken3;
    }

    IBEP20 public refToken1;
    IBEP20 public refToken2;
    IBEP20 public refToken3;

    IBEP20 public PAPA;

    event VoteResults(address winner, address loser);

    ///tracks the current vote status.
    bool public voteInProgress;
    uint public counter;
    uint public endTime;

    //track individual voter status for the current vote.
    mapping(uint => mapping(address => bool)) public voted;

    constructor(address _papaAddress) {
        counter = 1;
        PAPA = IBEP20(_papaAddress);
       // PapaDoge papadoge = PapaDoge(_papaAddress);
        refToken1 = IBEP20(0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684);
        refToken2 = IBEP20(0x8a9424745056Eb399FD19a0EC26A14316684e274);
        refToken3 = IBEP20(0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7);
        transferOwnership(0x65F7dbC2082A9571f3d49bC27975Ce6F26B60eb7); //transfer ownership from PAPA to specified address.
       // papadoge.authorize(papadoge.owner());
    }

    //Vote data
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

    //choose 3 candidates for a vote and set the time frame.
    //@@ add time period.
    function openTokenVote(address _token1, address _token2, address _token3) public onlyOwner {
        require(voteInProgress == false, "Vote in progress.");
        candidates[counter].token1 = _token1;
        candidates[counter].token2 = _token2;
        candidates[counter].token3 = _token3;
        candidates[counter].id = counter;
        voteInProgress = true;
    }

    //choose from 3 tokens, tallies will rank which ones get the higher percentages for PAPA distribution.
    //address _token1(1), address _token2(2), address _token3(3)
    function vote(uint _choice) public { 
        require(PAPA.balanceOf(msg.sender) >= 1000000000 && voted[counter][msg.sender] == false, "You are not allowed.");
        require(_choice > 0 && _choice <= 3, "Choose from the list.");
        if(_choice == 1) {
            candidates[counter].token1count += 1;
        }else if(_choice == 2) {
            candidates[counter].token2count += 1;
        }else if(_choice == 3) {
            candidates[counter].token3count += 1;
         }
        voted[counter][msg.sender] = true;
    }

    function tallyUp() public view returns(address, address, address) {
        address winner = tallyVoteWinner();
        address runnerUp = tallyRunnerUp();
        address loser = tallyVoteLoser();
        return(winner, runnerUp, loser);
    }

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

    function execute() public {
        address winner = tallyVoteWinner();
        address loser = tallyVoteLoser();
        address runnerUp = tallyRunnerUp();
        refToken1 = IBEP20(winner);
        refToken2 = IBEP20(runnerUp);
        refToken3 = IBEP20(loser);
        voteInProgress = false;
        counter++;
    }

  

}