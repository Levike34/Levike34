import React, { Component } from "react";
import VaxProtocol from "./contracts/VaxProtocol.json";
import Registrar from "./contracts/Registrar.json";
import getWeb3 from "./getWeb3";

import "./App.css";
class App extends Component {
  state = { name: "", check: false, personID: "", vaxxed: false, loaded: false };
  

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await this.web3.eth.net.getId();

      this.vaxProtocol = new this.web3.eth.Contract(
        VaxProtocol.abi,
        VaxProtocol.networks[networkId] && VaxProtocol.networks[networkId].address
      );
      this.registrar = new this.web3.eth.Contract(
          Registrar.abi,
          Registrar.networks[networkId] && Registrar.networks[networkId].address,
          );

      
          
         

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded:true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
      [name]: value
      });
  }

  handleSubmit = async () => {
    const {name, personID} = this.state;
    let result = await this.vaxProtocol.methods.register(name).send({from: this.accounts[0]});
    const address = result.events.vaxStatus.returnValues._personAddress;
    console.log(result);
    console.log(address);
    this.setState({
      name: name,
      [personID]: address
    });
    alert("You have successfully registered.  Your registration ID is:  " +address);
  }

  handleSubmit2 = async () => {
    const {name, check} = this.state;
    let result = await this.vaxProtocol.methods.getInfo(name).call();
    this.setState({
      [check]: result
    });
    if(result == true){
      alert(name+" is fully vaccinated.");
    } else {
      alert(name+" is not vaccinated.")
    }

  }

  handleVax1 = async () => {
    const {name} = this.state;
    let result = await this.vaxProtocol.methods.firstVax(name).send({from: this.accounts[0]});
    console.log(result);
  }

  handleVax2 = async () => {
    const {name} = this.state;
    let result = await this.vaxProtocol.methods.secondVax(name).send({from: this.accounts[0]});
    console.log(result);
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>
        <h1 className="title">Vaccination Tracker</h1>
        <h2>Type your name below to register:</h2>
          Name: <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
        <button type='button' onClick={this.handleSubmit}>Register</button>
        </div>
          <div>
        <h3>Type your name to receive your vaccine: </h3>
          Name: <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
        <button type='button' onClick={this.handleVax1}>Receive 1st Vaccination</button>
        <button type='button' onClick={this.handleVax2}>Receive 2nd Vaccination</button>
         </div>
         <div>
        <h2>Check someone's vaccination status:</h2>
          Name: <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
        <button type='button' onClick={this.handleSubmit2}>Check</button>
        </div>
          
      </div>
    );
  }
}

export default App;
