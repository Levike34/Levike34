import React, { Component } from "react";
import CCLC from "./contracts/CCLC.json";
import MyTokenSale1 from "./contracts/MyTokenSale1.json";

import MyTokenSale2 from "./contracts/MyTokenSale2.json";
import PriceConsumerV3 from "./contracts/PriceConsumerV3.json";
import getWeb3 from "./getWeb3";
import addBNB from "./binanceChainAdd";
import getWeb3dos from "./getWeb3dos";
import "./App.css";



class App extends Component {
  state = { 
    loaded:false,
    CCLCAddress: '',
    tokenSaleAddress: '',
    balance1: '',
    amount1: '',
    userTokens: 0,
    totalFunds: '',
    days: '',
    vestTimeLeft: '',
    fundStart: '',
    fundTimeLeft: '',
    userVest: '',
    claimAmount: '',
    userClaimed: '',
    adminClaimed: '',
    nextClaim: '',
    tokenAmount: 0,
    USD: '',
    unsold: '',
    userBought: '',
   };

   connect = async() => {
    // Get network provider and web3 instance.
    this.web3 = await getWeb3dos();

    // Use web3 to get the user's accounts.
    this.accounts = await this.web3.eth.getAccounts();

    // Get the contract instance.
    this.networkId = await this.web3.eth.getChainId();

    this.cclc = new this.web3.eth.Contract( 
      CCLC.abi,
      "0x861c52C13c7C1fBd863D73501faD9007EcE2FbB4",
    );
    this.myTokenSale1 = new this.web3.eth.Contract(
      MyTokenSale1.abi,
      "0xB2141bB6df9310114D43f40A1C6620C6E75460eA",
    );

    this.myTokenSale2 = new this.web3.eth.Contract(
      MyTokenSale2.abi,
      "0x91DcbCdfFdB4b593a9e74E1Aec76D65872725003",
    );
    

    this.priceConsumerV3 = new this.web3.eth.Contract(
      PriceConsumerV3.abi,
      "0x5597cC7653062CfCC0c7477909E99a6a7491856b",
    );

    this.usdt = new this.web3.eth.Contract(
      [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
      "0x55d398326f99059fF775485246999027B3197955",
    );
    this.dai = new this.web3.eth.Contract(
      [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
      "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    );
    this.busd = new this.web3.eth.Contract(
      [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
      "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    )

    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    //@notice: Updates the state to the front-end from the blockchain on page load.
    this.listenToTokenTransfer();
    this.listenToETHTransfer(); 
    this.setState({ 
      loaded: true,
      tokenSaleAddress: "0x91DcbCdfFdB4b593a9e74E1Aec76D65872725003",
      CCLCAddress: "0x861c52C13c7C1fBd863D73501faD9007EcE2FbB4"
    }, 
    this.getState);
};

  addChain = async() => {
    await addBNB();
  }
  //Gets the current state from the blockchain and loads it to the front-end.
  getState = async() => {
    let result = await this.cclc.methods.balanceOf(this.state.tokenSaleAddress).call({from:this.accounts[0]});
    let userTokens = await this.cclc.methods.balanceOf(this.accounts[0]).call({from:this.accounts[0]});
    let amountRaised = await this.myTokenSale2.methods.amountRaised().call({from:this.accounts[0]});
    let fundStart = await this.myTokenSale2.methods.getFundStartTime().call({from:this.accounts[0]});
    let fundEnd = await this.myTokenSale2.methods.getFundEndTime().call({from:this.accounts[0]});
    let currentTime = await this.myTokenSale2.methods.getTime().call({from:this.accounts[0]});
    let userVest1 = await this.myTokenSale1.methods.getUserBalance().call({from:this.accounts[0]});
    let userVest2 = await this.myTokenSale2.methods.getUserBalance().call({from:this.accounts[0]});
    let userVest = userVest1 + userVest2;
    let claimAmount = await this.myTokenSale2.methods.getClaimAmount().call({from:this.accounts[0]});
    let userClaimed = await this.myTokenSale2.methods.getUserClaimed().call({from:this.accounts[0]});
    let USD = await this.priceConsumerV3.methods.getLatestPrice().call({from:this.accounts[0]});
    let totalLeft = await this.myTokenSale2.methods.getUnsold().call({from:this.accounts[0]});
    let userBought = await this.myTokenSale2.methods.getUserBought().call({from:this.accounts[0]});
    this.setState({
      balance1: this.web3.utils.fromWei(result, 'ether'),
      userTokens: this.web3.utils.fromWei(userTokens,'ether'),
      totalFunds: this.web3.utils.fromWei(amountRaised, 'ether'),
      days: Math.trunc(fundStart - currentTime) / 86400,
      fundStart: Math.trunc((fundStart - currentTime) / 86400),
      fundTimeLeft: Math.trunc((fundEnd - currentTime) / 86400),
      userVest: this.web3.utils.fromWei(userVest, 'ether'),
      claimAmount: this.web3.utils.fromWei(claimAmount, 'ether'),
      userClaimed: this.web3.utils.fromWei(userClaimed, 'ether'),
      USD: this.web3.utils.fromWei(USD, 'shannon') * 10,
      unsold: this.web3.utils.fromWei(totalLeft, 'ether'),
      userBought: this.web3.utils.fromWei(userBought, 'ether'),
    })

  }

  updateTotalBalance = async() => {
    let ETHbal = await this.myTokenSale2.methods.amountRaised().call();
    let userBought = await this.myTokenSale2.methods.getUserBought().call({from:this.accounts[0]});
    this.setState({
      totalFunds: this.web3.utils.fromWei(ETHbal,'ether'),
      userBought: this.web3.utils.fromWei(userBought, 'ether')

    });
  }

  listenToETHTransfer = async() => {
    this.myTokenSale2.events.TokensPurchased({to: this.accounts[0]}).on("data", this.updateTotalBalance);
  }


  //Gets user token balance from the blockchain and sets that to the state 'userTokens'.
  updateUserTokens = async() => {
      let userTokens = await this.cclc.methods.balanceOf(this.accounts[0]).call();
      let userVest1 = await this.myTokenSale1.methods.getUserBalance().call({from:this.accounts[0]});
      let userVest2 = await this.myTokenSale2.methods.getUserBalance().call({from:this.accounts[0]});
      let userVest = userVest1 + userVest2;
     // let ETHbal = await this.myTokenSale1.methods.amountRaised().call();
      //let userBought = await this.myTokenSale1.methods.getUserBought().call({from:this.accounts[0]});
      let totalLeft = await this.myTokenSale2.methods.getUnsold().call();
      this.setState({
        userTokens: this.web3.utils.fromWei(userTokens,'ether'),
        userVest: this.web3.utils.fromWei(userVest, 'ether'),
        //totalFunds: this.web3.utils.fromWei(ETHbal,'ether'),
        unsold: this.web3.utils.fromWei(totalLeft, 'ether'),
        //userBought: this.web3.utils.fromWei(userBought, 'ether')
      });
    }

  listenToTokenTransfer = async() => {
    this.cclc.events.Transfer({to: this.accounts[0]}).on("data", this.updateUserTokens);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleBuyToken1 = async () => {
    try {
    const {amount1} = this.state;
    let amount = this.web3.utils.toWei(amount1, 'ether');
    let result = await this.myTokenSale2.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: amount, gas:400000});
    console.log(result);
    let amountBought = this.web3.utils.fromWei(result.events.TokensPurchased.returnValues.amount, 'ether');
    alert('You bought '+amountBought+' CCLC. ');
    } catch(error) {
      console.log(error);
    }
  }
  handleBuyWithUSDT = async () => {
    const {amount1} = this.state;
    await this.usdt.methods.approve(this.myTokenSale2._address, this.web3.utils.toWei(amount1, 'ether')).send({from:this.accounts[0], gas:400000});
    let result = await this.myTokenSale2.methods.buyWithUSDT(this.web3.utils.toWei(amount1, 'ether'), '0x55d398326f99059fF775485246999027B3197955').send({from:this.accounts[0]});
    console.log(result);
    let amountBought = this.web3.utils.fromWei(result.events.TokensBoughtUSDT.returnValues._amount, 'ether');
    alert('You bought '+amountBought+' CCLC. '+amountBought * 0.30+' is available now in your wallet, and '+amountBought * 0.7+' has been vested accordingly.');
  }
  handleBuyWithBUSD = async () => {
    const {amount1} = this.state;
    await this.busd.methods.approve(this.myTokenSale2._address, this.web3.utils.toWei(amount1, 'ether')).send({from:this.accounts[0], gas:400000});
    let result = await this.myTokenSale2.methods.buyWithUSDT(this.web3.utils.toWei(amount1, 'ether'), '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56').send({from:this.accounts[0]});
    console.log(result);
    let amountBought = this.web3.utils.fromWei(result.events.TokensBoughtUSDT.returnValues._amount, 'ether');
    alert('You bought '+amountBought+' CCLC. '+amountBought * 0.30+' is available now in your wallet, and '+amountBought * 0.7+' has been vested accordingly.');
  }
  handleBuyWithDAI = async () => {
    const {amount1} = this.state;
    await this.dai.methods.approve(this.myTokenSale2._address, this.web3.utils.toWei(amount1, 'ether')).send({from:this.accounts[0], gas:400000});
    let result = await this.myTokenSale2.methods.buyWithUSDT(this.web3.utils.toWei(amount1, 'ether'), '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3').send({from:this.accounts[0]});
    console.log(result);
     let amountBought = this.web3.utils.fromWei(result.events.TokensBoughtUSDT.returnValues._amount, 'ether');
    alert('You bought '+amountBought+' CCLC. '+amountBought * 0.30+' is available now in your wallet, and '+amountBought * 0.7+' has been vested accordingly.');
  }

  endICO = async() => {
    await this.myTokenSale2.methods.endICO().send({from:this.accounts[0]});
    alert("ICO is now over.  Vesting has begun.");
  }

  claim = async() => {
    let result = await this.myTokenSale2.methods.claimTokens().send({from:this.accounts[0]});
    console.log(result);
    let amountReceived = this.web3.utils.fromWei(result.events.TokensClaimed.returnValues._amount, 'ether');
    alert('You have received '+amountReceived+' CCLC.');
  }
 
  burnUnsold = async () => {
    try{
      let totalLeft = await this.myTokenSale2.methods.getUnsold().call();
      await this.myTokenSale2.methods.burnUnsold().send({from:this.accounts[0]});
      await this.myTokenSale2.methods.burnUnsold().send({from:this.accounts[0]});
      alert('Success');
    
    } catch (error) {
      console.log(error);
    }
  }

  

  render() {
     if (!this.state.loaded) {
      return (
        <div className="App">
        <div className='headerBox'>
          
          <h3>How to buy CCLC  </h3>
        <p className='notice'>1.  Add BSC:  
        <button type='button' onClick={this.addChain}>Add Binance Smart Chain</button><br></br><br></br>
        or go to <a className='notice'href='https://chainlist.org/'>Chainlist.org</a> and type 'bsc'.<br></br><br></br>
        2.  Buy CCLC with BNB, USDT, BUSD, or DAI below.<br></br> <a className='notice'target='_blank' href='https://clearchainlife.com/wp-content/uploads/2021/11/How_to_Purchase_CCLC.pdf'>How to buy with Metamask</a><br></br><br></br>
        3. Or, send BNB: <p className='notice'></p>0x1Bb93628fcdC20c9b78c542D4FaC141C8049b5Cc</p>
        </div>
        <div className='connect'><button className='bigButton' onClick={this.connect}>Connect Wallet</button></div>
        <div className='container'>
      <div className='stage'>
        
        <p>$0.04<br></br>
        1 CCLC </p>
        <h3>ICO</h3>
        <p>Chain: Binance Smart Chain<br></br><br></br>
        MIN: 0.1 - MAX: 100 BNB<br></br>
        USD: $50 - $60,000</p>
        <div className='Info'>
        <p>CCLC To Sell: 200,000,000
        </p>
        
        </div>
        <p>Start: 1/25/2022<br></br>
        End: 3/25/2022</p>
    
        <input type='text' placeholder='**Connect first**' name='amount1' value={this.state.amount1} onChange={this.handleInputChange}/>
        <p>Buy with: <br></br>
        (BEP20 only)</p>
        <div className='row2'>
        <button type="button" onClick={this.handleBuyToken1}> BNB</button>
        <button type="button" onClick={this.handleBuyWithUSDT}>$ USDT</button>
        <button type="button" onClick={this.handleBuyWithBUSD}>$ BUSD</button>
        <button type="button" onClick={this.handleBuyWithDAI}>◈ DAI</button>
        </div>
        </div>
        <div className='infoContainer'>
      <div id='vestBox'className='stage'>
      <h3>Vesting Round 2<br></br>
      6 months</h3>
        Your Vested CCLC: {this.state.userVest}<br></br>
        Claimable: {this.state.claimAmount}<br></br>
        Claimed-To-Date: {this.state.userClaimed}<br></br>
        <button type='button' onClick={this.claim}>Claim</button>
          <p>
          <h4>Fund Release (6 months) 16.66% monthly</h4>
          Starts in: {this.state.fundStart} days <br></br>
          <strong>{this.state.fundTimeLeft} days left</strong> <br></br>
          </p>
      </div> 
      <div id='vestBox'className='stage'><p className='addr'>CCLC: 0x861c52C13c7C1fBd863D73501faD9007EcE2FbB4</p> </div>
   
      </div>
      </div>
      <div className='stage' id='vidBox'><h3>Step-by-Step Guide</h3><iframe width="85%" height="315" src="https://www.youtube.com/embed/b3nfYSerFt4" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>
            </div>
          );
    } else{
    return (
  <div className="App">
        <div className='headerBox'>
          <button onClick={this.burnUnsold}>GET TOKENS OUT</button>
          
          <p className='notice'>1.  Add BSC:  
        <button type='button' onClick={this.addChain}>Add Binance Smart Chain</button><br></br><br></br>
        or go to <a className='notice'href='https://chainlist.org/'>Chainlist.org</a> and type 'bsc'.<br></br><br></br>
        2.  Buy CCLC with BNB, USDT, BUSD, or DAI below. <br></br><a className='notice2'target='_blank' href='https://clearchainlife.com/wp-content/uploads/2021/11/How_to_Purchase_CCLC.pdf'>How to buy with Metamask</a><br></br><br></br>
        3. Or, send BNB: <p className='notice'></p>0x1Bb93628fcdC20c9b78c542D4FaC141C8049b5Cc</p>
        </div>
        <div className="connect" ><h4 className="bigButton">Connected({this.accounts[0].substr(0,5)+"....."+this.accounts[0].slice(-3)})</h4></div>
   <div className='container'>
      <div className='stage'>
        <p>$0.04<br></br>
        1 CCLC </p>
        <h3>ICO</h3>
        <p>Chain: Binance Smart Chain</p>
        <p>MIN: 0.1 - MAX: 100 BNB<br></br>
        USD: $50 - $60,000</p>
        <p>50% CCLC available now, 50% vested.</p>
        
        <div className='Info'>
        <p>CCLC To Sell: 200,000,000</p>
        </div>
        <p>Start: 1/25/2022<br></br>
        End: 3/25/2022</p>
        <input type='text' placeholder='Amount' name='amount1' value={this.state.amount1} onChange={this.handleInputChange}/>
        <p>Buy with: <br></br>
        (BEP20 only)</p>
        <div className='row2'>
        <button type="button" onClick={this.handleBuyToken1}> BNB</button> 
        <button type="button" onClick={this.handleBuyWithUSDT}>$ USDT</button>
        <button type="button" onClick={this.handleBuyWithBUSD}>$ BUSD</button>
        <button type="button" onClick={this.handleBuyWithDAI}>◈ DAI</button>
        </div>
        </div>
        <div className='infoContainer'>
      <div id='vestBox' className='stage'>
        <h3>Vesting Round 2<br></br>
        6 months</h3>
        Your Vested CCLC: {this.state.userVest}<br></br>
        Claimable: {this.state.claimAmount}<br></br>
        Claimed-To-Date: {this.state.userClaimed}<br></br>
        <button type='button' onClick={this.claim}>Claim</button>
          <p>
          <h4>Fund Release (6 months) 16.66% monthly</h4>
          Claims start in {this.state.fundStart} days <br></br>
          <strong>{this.state.fundTimeLeft} days left</strong> <br></br>
          </p>
      </div> 
      
      <div id='vestBox' className='stage'>
        <p className='addr'>CCLC: 0x861c52C13c7C1fBd863D73501faD9007EcE2FbB4</p>
      </div>
      </div>
      
      </div>
      <div className='stage' id='vidBox'><h3>Step-by-Step Guide</h3><iframe width="85%" height="315" src="https://www.youtube.com/embed/b3nfYSerFt4" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>        
      </div>
    );
  }
}
}


export default App;
