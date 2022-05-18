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
    uint endTime = block.timestamp + 80 weeks; //8 weeks (2 months)

    //stores investors CCLC amount.
    mapping(address => uint256) public userBalance;

    //amount bought in BNB, min = 0.5, max = 100.
    mapping(address => uint256) public boughtTotal;
    uint stableCoinAmount;
    uint public totalUnsold = 200_000_000_000000000000000000; //200 million

    //Front-end transfers unsoldTokens to owner, then burns.
    function burnUnsold() external onlyOwner {
        require(block.timestamp > endTime, "The ICO is still ongoing.");
        require(totalUnsold > 0, "Sold out.");
        cclc.transfer(0x56E6a6bDCea6666bEB932a2933895c628d85aeF5, totalUnsold);
        totalUnsold = 0;
    }
    function endICO() public onlyOwner {
        require(block.timestamp < endTime, "ICO is over.");
        endTime = block.timestamp;
    }
    

    constructor(uint256 rate, address payable wallet, CCLC token, PriceConsumerV3 _priceFeed) Crowdsale(rate, wallet, token) {
        cclc = token;
        priceFeed = _priceFeed;
    }

      function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal override view {
       super._preValidatePurchase(beneficiary, weiAmount);
       require(block.timestamp < endTime, 'ICO is over.');
    }

    function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal override {
        super._updatePurchasingState(beneficiary, weiAmount);
        boughtTotal[msg.sender] += weiAmount;
    }

    //sends 50% to buyer, 50% remains for vesting.
      function _deliverTokens(address beneficiary, uint256 tokenAmount) internal override {
          super._deliverTokens(beneficiary, tokenAmount );
          totalUnsold -= tokenAmount;
      }
    
    //Converts ETH amount given to current USD exchange rate.
    //Multiplies dollar amount by the CCLC set price to calculate amount to give. 
      function _getTokenAmount(uint weiAmount) internal override view returns(uint256) {
          super._getTokenAmount(weiAmount);
          int currentPrice = priceFeed.getLatestPrice();
          uint currPrice = uint(currentPrice) / (1 * 10 ** 8);
          uint usdAmount = weiAmount * uint(currPrice);
          uint amountToGive = (usdAmount) * 25;//4 cents per CCLC
          return(amountToGive);
      }

        //Used for Stablecoins DAI/USDT/BUSD
      function buyWithUSDT(uint amount, address _token) public {
          //prevents buying with other ERC20 tokens.
          require(_token == 0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3 || _token == 0x55d398326f99059fF775485246999027B3197955 || _token == 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56, 'DAI/USDT/BUSD only.');
          require(amount >= 50000000000000000000 && amount <= 60000000000000000000000, "Min: $50, Max: $60,000"); // can only buy 10 ETH worth.
         // require(block.timestamp < endTime, 'ICO is over.'); 
          IERC20 usdt = IERC20(_token);
          uint amountToGive = amount * 25; //4 cents per CCLC

          usdt.transferFrom(msg.sender, 0x56E6a6bDCea6666bEB932a2933895c628d85aeF5, amount); //transfer to CCLC Owner Address
          cclc.transfer(msg.sender, amountToGive);

          //calculates the wei amount to keep user allocation under 10 ETH.
          int currentPrice = priceFeed.getLatestPrice(); //get ETH:USDT price.
          uint currPrice = uint(currentPrice) / (1 * 10 ** 8);
          uint weiAmount = amount / uint(currPrice); //used to keep allocation per user under 10 ETH, converts from USD:ETH price.
          require(boughtTotal[msg.sender] + weiAmount <= 100000000000000000000, "Min: 0.1 BNB, Max: 100 BNB"); // can only buy 100 worth.
          boughtTotal[msg.sender] += weiAmount;
          stableCoinAmount += weiAmount;
          totalUnsold -= amountToGive;
          emit TokensBoughtUSDT(amountToGive);
      }

    //View functions for the Front-End
      function getUserBalance() public view returns(uint256) {
          return userBalance[msg.sender];
      }

      function getUserBought() public view returns(uint256) {
          return boughtTotal[msg.sender];
      }


    //shows the total funds raised in wei.
      function amountRaised() public view returns(uint256) {
          uint amount = Crowdsale.weiRaised();
          uint totalAmount = amount + stableCoinAmount;//stableCoinAmount converted from wei via Chainlink Oracle.
          return totalAmount;
      }

       function _transferOwnership(address newOwner) public onlyOwner {
        transferOwnership(newOwner);
    } 

}