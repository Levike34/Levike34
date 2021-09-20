import React, { Component } from "react";
import SharedWallet from "./contracts/SharedWallet.json";
import Allowance from "./contracts/Allowance.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, balance: 0, amount: 0, allowanceLeft: 0, owner: '' };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.getChainId();

      this.sharedWallet = new this.web3.eth.Contract(
        SharedWallet.abi,
        SharedWallet.networks[this.networkId] && SharedWallet.networks[this.networkId].address,
      );
  
      this.allowance = new this.web3.eth.Contract(
          Allowance.abi,
          Allowance.networks[this.networkId] && Allowance.networks[this.networkId].address,
          );
   

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded:true}, this.get_State);
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }
}

handleInputChange = (event) => {
  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  const name = target.name;
  this.setState({
    [name]: value
  });
}

handleDeposit = async() => {
  const {amount} = this.state;
  let result = await this.sharedWallet.methods.deposit().send({from: this.accounts[0], value: this.web3.utils.toWei(amount, 'ether')});
  this.setState({
    balance: this.web3.utils.fromWei(result.events.MoneyDeposited.returnValues._totalAmount, 'ether')
  })
  alert(amount+" wei deposited successfully.")
}

handleWithdraw = async() => {
  const {amount} = this.state;
  await this.sharedWallet.methods.withdraw(this.web3.utils.toWei(amount, 'ether')).send({from: this.accounts[0]});
  alert(amount+" wei withdrawn successfully.")
}

setAllowance = async() => {
  const {user, allowanceLeft} = this.state;
  let result = await this.sharedWallet.methods.setAllowance(user, this.web3.utils.toWei(allowanceLeft, "ether")).send({from: this.accounts[0]});
  console.log(result);
  
  alert(user+': allowance has been changed to '+allowanceLeft+" ETH.");
}

get_State = async() => {
  let ownResult = await this.sharedWallet.methods.getOwner().call();
  let balResult = await this.sharedWallet.methods.getBalance().call();
  let balResultEth = this.web3.utils.fromWei(balResult, 'ether');
  this.setState({owner: ownResult, balance: balResultEth});
}

  render() {
    if (!this.state.loaded) {
      return (
        <div className="App">
          <h2>***This app only works if you are connected to Metamask***</h2>
        <div className='container'>
        <h1>Shared Ropsten Ether Bank</h1>
        <p className='highlight'>Owner: {this.state.owner}</p>
        <h3>ETH Balance: {this.state.balance}</h3>
        <div className="row">
        Depsosit or Withdraw: <input type='text'name='amount'value={this.state.amount} onChange={this.handleInputChange}/>
        <button type='button' onClick={this.handleDeposit}>Deposit</button>
        <button type='button' onClick={this.handleWithdraw}>Withdraw</button>
        </div>
        
          <h2>Allowance</h2>
          
          <div className='row'>
          <input type='text'placeholder='Address'name="user"value={this.state.user} onChange={this.handleInputChange}/>
          <input type='text'placeholder='Allowance'name='allowanceLeft'value={this.state.allowanceLeft} onChange={this.handleInputChange}/>
          <button type='button' onClick={this.setAllowance}>Set</button>
          </div>
        <p>*The owner must set your allowance first before you can withdraw funds.</p>
        <p>***Staking coming soon***</p>
      </div>
      </div>
      );
    };
    
    return (
      <div className="App">
        <div className='container'>
          
        <h1>Shared Ropsten Ether Bank</h1>
        <p className='highlight'>Owner: {this.state.owner}</p>
        <h3>ETH Balance: {this.state.balance}</h3>
        <div className="row">
        Depsosit or Withdraw: <input type='text'name='amount'value={this.state.amount} onChange={this.handleInputChange}/>
        
        <button type='button' onClick={this.handleDeposit}>Deposit</button>
        <button type='button' onClick={this.handleWithdraw}>Withdraw</button>
        </div>
          <h2>Allowance</h2>
          
          <div className='row'>
          <input type='text'placeholder='Address'name="user"value={this.state.user} onChange={this.handleInputChange}/>
          <input type='text'placeholder='Allowance'name='allowanceLeft'value={this.state.allowanceLeft} onChange={this.handleInputChange}/>
          <button type='button' onClick={this.setAllowance}>Set</button>
          </div>
  
        <p>*The owner must set your allowance first before you can withdraw funds.</p>
        <p>***Staking coming soon***</p>
      </div>
      </div>
    );
  }
}

export default App;
