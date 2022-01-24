import React, { useState, useHook } from "react";
import Gladiators from "./contracts/Gladiators.json";
import Colleseum from "./contracts/Colleseum.json";
import Lobby from "./contracts/Lobby.json";

import getWeb3 from "./getWeb3";
import getWeb3dos from "./getWeb3dos";
import addBNB from "./binanceChainAdd";
import Modal from '@mui/material/Modal';


import "./App.css";

function App () {
  const [loaded, setLoaded] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState();
  const [gladiators, setGladiators] = useState();
  const [colleseum, setColleseum] = useState();
  const [lobby, setLobby] = useState();
  const [fighter1, setFighter1] = useState([]);
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [name, setName] = useState();
  const [contenders, setContenders] = useState([]);
  const [gameLobby, setGameLobby] = useState([]);
  const [page, setPage] = useState(0);
  const [num, setNum] = useState();
  const [id, setId] = useState();
  const [searchGlad, setSearchGlad] = useState([]);
  
  async function getWeb3() {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
  

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const networkId = await web3.eth.getChainId();

   const gladiators = new web3.eth.Contract(
        Gladiators.abi,
        "0x3B080682A45878E6774Fd34b2517cf4D76dd77fC",
    );
   const colleseum = new web3.eth.Contract(
     Colleseum.abi,
     "0x38b7334b337e7460298b22Fcbd2efd70e09AC51F",
 );
   const lobby = new web3.eth.Contract(
     Lobby.abi,
     "0xA6F9f66134BaFCbCB7B5D173108D275Bd2f09038",
);
    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    let result = await gladiators.methods.findGladiator(accounts[0]).call({from:accounts[0]});
    let myFighter = await gladiators.methods.gladiators(result).call();
   
    let lob = await lobby.methods.getArr().call();
    let arr = [];
    let player1 = await colleseum.methods.fighters(accounts[0]).call();
    let target = colleseum.methods.findOpponent().call({from:accounts[0]});
    console.log(target);
    let player2 = await colleseum.methods.fighters("0xAab517e3Eff347e6436c36246E8c71ddef1BEE98").call({from:accounts[0]});
    arr.push(player1);
    arr.push(player2);
    setContenders(arr);
    setPlayer1(arr[0]);
    setPlayer2(arr[1]);
    setGameLobby(lob);
    console.log(gameLobby);
    setFighter1(myFighter);
    setLoaded(true);
    setWeb3(web3);
    setAccounts(accounts);
    setGladiators(gladiators);
    setColleseum(colleseum);
    setLobby(lobby);
   // Set web3, accounts, and contract to the state, and then proceed with an
   // example of interacting with the contract's methods.
   setLoaded(true);

 }

  async function connect() {
     // Get network provider and web3 instance.
     const web3 = await getWeb3dos();
   

     // Use web3 to get the user's accounts.
     const accounts = await web3.eth.getAccounts();
 
     // Get the contract instance.
     const networkId = await web3.eth.getChainId();
 
    const gladiators = new web3.eth.Contract(
         Gladiators.abi,
         "0x3B080682A45878E6774Fd34b2517cf4D76dd77fC",
     );
    const colleseum = new web3.eth.Contract(
      Colleseum.abi,
      "0x38b7334b337e7460298b22Fcbd2efd70e09AC51F",
  );
    const lobby = new web3.eth.Contract(
      Lobby.abi,
      "0xA6F9f66134BaFCbCB7B5D173108D275Bd2f09038",
);
     // Set web3, accounts, and contract to the state, and then proceed with an
     // example of interacting with the contract's methods.
     let result = await gladiators.methods.findGladiator(accounts[0]).call({from:accounts[0]});
     let myFighter = await gladiators.methods.gladiators(result).call();
    
     let lob = await lobby.methods.getArr().call();
     let arr = [];
     let player1 = await colleseum.methods.fighters(accounts[0]).call();
     let target = colleseum.methods.findOpponent().call({from:accounts[0]});
     console.log(target);
     let player2 = await colleseum.methods.fighters("0xAab517e3Eff347e6436c36246E8c71ddef1BEE98").call({from:accounts[0]});
     arr.push(player1);
     arr.push(player2);
     setContenders(arr);
     setPlayer1(arr[0]);
     setPlayer2(arr[1]);
     setGameLobby(lob);
     console.log(gameLobby);
     setFighter1(myFighter);
     setLoaded(true);
     setWeb3(web3);
     setAccounts(accounts);
     setGladiators(gladiators);
     setColleseum(colleseum);
     setLobby(lobby);
    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    setLoaded(true);

  }
  function handleInputChange(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setName(value);
  }
  function handleInputChangeId(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setId(value);
  }
  function GameQueue() {
    for(let i = 0; i <= gameLobby.length; i++){
    return(
      <p>{gameLobby[i]}</p>
    )
    }
  }
  async function readyUp() {
    await lobby.methods.readyUp().send({from:accounts[0]});
    let lob = await lobby.methods.getArr().call();
     setGameLobby(lob);
  }

  async function initiate() {
    //target
    await colleseum.methods.initiate("0xC570214c3A924cEaE0559710dc4B2A3DB451d111").send({from:accounts[0]});
    update();
    alert("Fight started.");
  }
  async function attack() {
    await colleseum.methods.attack().send({from:accounts[0]});
    update();

  }

  async function heal() {
    await colleseum.methods.heal().send({from:accounts[0]});
    alert("HP + 40");
    update();
  }
  async function mintNFT() {
    await gladiators.methods.mintNFT(name).send({from:accounts[0]});
  }
  async function mintHOP() {
    await gladiators.methods.mintHOP(name).send({from:accounts[0]});
  }
  async function equipGladiator() {
    await gladiators.methods.equipGladiator(id).send({from:accounts[0]});
    let myFighter = await gladiators.methods.gladiators(id).call();
    setFighter1(myFighter);
  }

  async function update() {
    let arr = [];
    let player1 = await colleseum.methods.fighters(accounts[0]).call();
    let target = colleseum.methods.findOpponent().call({from:accounts[0]});
    let player2 = await colleseum.methods.fighters("0xAab517e3Eff347e6436c36246E8c71ddef1BEE98").call();
    arr.push(player1);
    arr.push(player2);
    setContenders(arr);
    setPlayer1(arr[0]);
    setPlayer2(arr[1]);
    console.log(arr);
  }
  async function search(){
    let glad = await gladiators.methods.gladiators(id).call();
    setSearchGlad(glad);
    console.log(glad);

  }

  function lobbyPage() {
    setPage(2);
  }
  function home() {
    setPage(0);
  }
  function armory(){
    setPage(1);
  }

    if (!loaded) {
      return <div>
        <p>1. Switch to the binance smart chain then connect.</p>
        <button type="button" onClick={addBNB}>Add Binance Test Chain</button><br></br>
        <button type='button' onClick={connect}>Connect</button>
        </div>;
    } else if(page == 2){
      return (
        <div className='App'>
          <button type='button' onClick={home}>Home</button>
           <h1>Connected as {accounts[0].slice(0,4) + '..' + accounts[0].slice(-4)}</h1>
           <h2>Lobby</h2>
           <p>1. Copy and paste to battle.</p>
           <button type='button' onClick={readyUp}>Ready Up</button>
           <div className='container'>
          
             <div className='lobby'>
             <GameQueue/>
             <p>{gameLobby[1]}</p>
             <p>{gameLobby[2]}</p>
             <p>{gameLobby[3]}</p>
             <p>{gameLobby[4]}</p>
             <p>{gameLobby[5]}</p>
             <p>{gameLobby[6]}</p>
                
             </div>
           
           </div>
        </div>
      )
    }else if(page == 1) {
      return (
        <div className="App">
          <button type='button' onClick={home}>Home</button>
          <h1>Armory</h1>
          <h2>Create Gladiator</h2>
          <p>1. Choose your name: </p>
          <input type='text' placeholder='Name' name='name' value={name} onChange={handleInputChange} />
          <p>2. Choose your class: </p>
          <div className='container'>
          <div className='characterSlot'>
            <h3>Murmillo </h3>
            <img src="https://gateway.pinata.cloud/ipfs/QmZgtSwhCyFhE5Prk9kRMy7H6pL3vkppeH9YrEX1vwydPp"/>
            <p> HP: 100 <br></br>
            Attack: 20 <br></br>
            Critical: 5 <br></br>
            Dodge: 10 <br></br>
            Buff: Heal       
            </p>
            <button type='button' onClick={mintNFT} >Create Gladiator NFT (Murmillo)</button>
          </div>
          <div className='characterSlot'>
            <h3>Hoplomachus </h3>
            <img src="https://gateway.pinata.cloud/ipfs/QmTXtJjrsApe9DhKSwAscvqiBd2JkzRNBLEy2aaawigQkw"/>
             <p> HP: 91 <br></br>
            Attack: 24 <br></br>
            Critical: 8 <br></br>
            Dodge: 8 <br></br>
            Buff: Heavy Strike       
            </p>
            <button type='button' onClick={mintHOP} >Create Gladiator NFT (Hoplomachus)</button>
          </div>
          </div>
          <div className='myNFTs'>
            <h2>Search Gladiators</h2>
            <input type='text' placeholder='Search Gladiators by ID'name='id' value={id} onChange={handleInputChangeId}/>
            <button type='button' onClick={search}>Search</button>
            <button type='button' name='gladiator' onClick={equipGladiator}>Equip</button>
            <div className='characterSlot'>
            <p>Name: {searchGlad[0]}<br></br>
            Owner: {searchGlad[1]}<br></br>
            HP: {searchGlad[2]}<br></br>
            LVL: {searchGlad[3]}<br></br>
            Attack: {searchGlad[4]} <br></br>
            Critical: {searchGlad[5]} <br></br>
            Dodge: {searchGlad[6]}
            </p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="App">
        <div className='row'>
        <button type='button' onClick={lobbyPage}>Lobby</button>
        <button type='button' onClick={armory}>Armory</button>
        </div>  
          <h1>Colleseum</h1>
          <div className='headerBox'>
          <p>1. Go to "Armory" to create and equip your NFT.</p>
          <p>2. Go to "Lobby" to challenge or ready up.</p>
          <p>3. Battle in the "Home" tab!</p>
          </div>
          <div className='container' >
             <div className='fighter'>
                <h3>{player1[0]}</h3>
                <img src="https://gateway.pinata.cloud/ipfs/QmZgtSwhCyFhE5Prk9kRMy7H6pL3vkppeH9YrEX1vwydPp"/>
                <p>Dominus: {player1[1].slice(0,4) + '..' + player1[1].slice(-4)}</p>
                <p>HP: {player1[2]}<br></br>
                ATK: {player1[3]}<br></br>
                CRIT: {player1[4]}</p>
             </div>
             <div className='arena'>
             <div className='row'>
               <p>{player1[2]} VS. {player2[2]}</p>
               </div>
               <button type='button' onClick={initiate}>Battle</button>
               <button type='button' onClick={attack}>Attack</button>
               <button type='button' onClick={heal}>Heal</button>
             </div>
             <div className='fighter'>
             <h3>{player2[0]}</h3>
            
             <img src="https://gateway.pinata.cloud/ipfs/QmTXtJjrsApe9DhKSwAscvqiBd2JkzRNBLEy2aaawigQkw"/>
                <p>Dominus: {player2[1].slice(0,4) + '..' + player2[1].slice(-4)}</p>
                <p>HP: {player2[2]}<br></br>
                ATK: {player2[3]}<br></br>
                CRIT: {player2[4]}</p>
             </div>

          </div>
     
      </div>
    );
  };


export default App;
