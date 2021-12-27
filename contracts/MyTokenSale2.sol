pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./Crowdsale.sol";
import "./CCLC.sol";
import "./PriceConsumerV3.sol";


contract MyTokenSale2 is Crowdsale, Ownable {

    CCLC public cclc;
    PriceConsumerV3 priceFeed;

    event TokensClaimed(uint _amount);
    event TokensBoughtUSDT(uint _amount);

    //Start of ICO
    uint startTime = block.timestamp;

    //End of ICO 2 months
    uint endTime = block.timestamp + 8 weeks; //8 weeks (2 months)

    //Starts after 1 year.
    uint public fundReleaseStart = endTime + 52 weeks; //52 weeks (1 year) 

    uint public fundEnd = fundReleaseStart + 24 weeks;

    //monthly release interval 1 month used as divisor.
    uint public fundReleaseInterval = 4 weeks; //4 weeks (monthly)

    //stores investors CCLC amount.
    mapping(address => uint256) public userBalance;
    mapping(address => uint256) public claimedAmount;

    //amount bought in BNB, min = 0.5, max = 100.
    mapping(address => uint256) public boughtTotal;
    uint stableCoinAmount;
    uint public totalUnsold = 200000000000000000000000000; //200 million
    

    function getUnsold() public view returns(uint) {
        return totalUnsold;
    }

    //Front-end transfers unsoldTokens to owner, then burns.
    function burnUnsold() external onlyOwner {
        require(block.timestamp > endTime, "The ICO is still ongoing.");
        require(totalUnsold > 0, "Sold out.");
        cclc.transfer(msg.sender, totalUnsold);
        totalUnsold = 0;
    }
    function endICO() public onlyOwner {
        require(block.timestamp < endTime, "ICO is over.");
        endTime = block.timestamp;
        fundReleaseStart = block.timestamp + 52 weeks; //1 Year
        fundEnd = fundReleaseStart + 24 weeks;
    }
    

    constructor(uint256 rate, address payable wallet, CCLC token, PriceConsumerV3 _priceFeed) Crowdsale(rate, wallet, token) {
        cclc = token;
        priceFeed = _priceFeed;
    }

      function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal override view {
       super._preValidatePurchase(beneficiary, weiAmount);
       require(block.timestamp < endTime, 'ICO is over.');
       require(boughtTotal[msg.sender] + weiAmount >= 100000000000000000 && boughtTotal[msg.sender] + weiAmount <= 100000000000000000000, "Min: 0.1 BNB, Max: 100 BNB"); // can only buy 100 BNB worth.
    }

    function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal override {
        super._updatePurchasingState(beneficiary, weiAmount);
        boughtTotal[msg.sender] += weiAmount;
    }

    //sends 30% to buyer, 70% remains for vesting.
      function _deliverTokens(address beneficiary, uint256 tokenAmount) internal override {
          uint instantAmount = (tokenAmount / 100) * 30;
          uint vestedAmount = (tokenAmount / 100) * 70;
          super._deliverTokens(beneficiary, instantAmount );
          userBalance[msg.sender] += vestedAmount;
          totalUnsold -= tokenAmount;
          if(totalUnsold == 0) {
              endTime = block.timestamp;
              fundReleaseStart = block.timestamp + 52 weeks;
              fundEnd = fundReleaseStart + 24 weeks;
          }
      }
    
    //Converts ETH amount given to current USD exchange rate.
    //Multiplies dollar amount by the CCLC set price to calculate amount to give. 
      function _getTokenAmount(uint weiAmount) internal override view returns(uint256) {
          super._getTokenAmount(weiAmount);
          int currentPrice = priceFeed.getLatestPrice();
          uint currPrice = uint(currentPrice) / (1 * 10 ** 8);
          uint usdAmount = weiAmount * uint(currPrice);
          uint amountToGive = ((usdAmount) * 25) / 2;//8 cents per CCLC
          return(amountToGive);
      }

        //Used for Stablecoins DAI/USDT/BUSD
      function buyWithUSDT(uint amount, address _token) public {
          //prevents buying with other ERC20 tokens.
          require(_token == 0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3 || _token == 0x55d398326f99059fF775485246999027B3197955 || _token == 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56, 'DAI/USDT/BUSD only.');
          require(amount >= 100000000000000000000 && amount <= 60000000000000000000000, "Min: $100, Max: $60,000"); // can only buy 10 ETH worth.
          require(block.timestamp < endTime, 'ICO is over.'); 
          IERC20 usdt = IERC20(_token);
          uint amountToGive = (amount * 25) / 2; //8 cents per CCLC

          //30% instant deposit, 70% vested for 1 year to be claimed during the 6 month-release.
          uint instantAmount = (amountToGive / 100) * 30;
          uint vestedAmount = (amountToGive / 100) * 70;
          usdt.transferFrom(msg.sender, 0x56E6a6bDCea6666bEB932a2933895c628d85aeF5, amount); //transfer to CCLC Owner Address
          cclc.transfer(msg.sender, instantAmount);
          userBalance[msg.sender] += vestedAmount;

          //calculates the wei amount to keep user allocation under 10 ETH.
          int currentPrice = priceFeed.getLatestPrice(); //get ETH:USDT price.
          uint currPrice = uint(currentPrice) / (1 * 10 ** 8);
          uint weiAmount = amount / uint(currPrice); //used to keep allocation per user under 10 ETH, converts from USD:ETH price.
          require(boughtTotal[msg.sender] + weiAmount <= 100000000000000000000, "Min: 0.1 BNB, Max: 100 BNB"); // can only buy 100 worth.
          boughtTotal[msg.sender] += weiAmount;
          stableCoinAmount += weiAmount;
          totalUnsold -= amountToGive;
          if(totalUnsold == 0) {
              endTime = block.timestamp;
              fundReleaseStart = block.timestamp + 52 weeks;
              fundEnd = fundReleaseStart + 24 weeks;
          }
          emit TokensBoughtUSDT(amountToGive);
      }

    //View functions for the Front-End
      function getUserBalance() public view returns(uint256) {
          return userBalance[msg.sender];
      }
      function getUserClaimed() public view returns(uint256) {
          return claimedAmount[msg.sender];
      }

      function getUserBought() public view returns(uint256) {
          return boughtTotal[msg.sender];
      }

      
      function claimTokens() public {
          require(userBalance[msg.sender] > 0, 'You have no tokens to claim.');
          uint claimableAmount = getClaimAmount();
          uint amountToGive = claimableAmount - claimedAmount[msg.sender];
          require(claimedAmount[msg.sender] + amountToGive <= userBalance[msg.sender]);
          require(claimedAmount[msg.sender] != userBalance[msg.sender], "You have claimed all of your CCLC.");
          cclc.transfer(msg.sender, amountToGive);
          claimedAmount[msg.sender] += amountToGive;
          emit TokensClaimed(amountToGive);
      }

      function getClaimAmount() public view returns(uint256) {
          if(block.timestamp < fundReleaseStart) {
              return 0;
          } else {
          uint256 slice = getSlice(); //Slice to get the total vest amount to 1/6
          uint256 monthsCompleted = (block.timestamp - fundReleaseStart) / fundReleaseInterval;
          if (monthsCompleted >= 6) {
              uint giveAmount = slice * 6;
              return giveAmount; //Stops the claimable amount @ userTotal.
          } else{
              uint giveAmount = slice * monthsCompleted;
              return giveAmount;
          }
          }
      }

    //shows the total funds raised in wei.
      function amountRaised() public view returns(uint256) {
          uint amount = Crowdsale.weiRaised();
          uint totalAmount = amount + stableCoinAmount;//stableCoinAmount converted from wei via Chainlink Oracle.
          return totalAmount;
      }
          
    

    //divides user funds into 6 parts as per the 6 month vest-release.
      function getSlice() public view returns(uint) {
          return userBalance[msg.sender] / 6;
      }

      function getFundStartTime() public view returns(uint256) {
          uint fundReleaseStartReal = fundReleaseStart + 4 weeks;
          return fundReleaseStartReal;
      }
      function getFundEndTime() public view returns(uint256) {
          return fundEnd;
      }

      function getTime() public view returns (uint256) {
          return block.timestamp;
      }       

       function _transferOwnership(address newOwner) public onlyOwner {
        transferOwnership(newOwner);
    } 

}