import React, { useState, useHook, useEffect } from "react";
import AMZN from "./pages/Amazon.js";

import getWeb3 from "./getWeb3";
import getWeb3dos from "./getWeb3dos.ts";
import addMATIC from "./chains/addMATIC";
import addBNB from "./chains/addBNB";
import addETH from "./chains/addETH";
import addTEST from "./chains/addTEST";
import addAVAX from "./chains/addAVAX";
import addFTM from "./chains/addFTM";
import About from "./components/About.js";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FcDown } from "react-icons/fc";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "./App.css";


const ROUTERS = {
    ETH: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    BNBMain: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    MATIC: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    TEST: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
    AVAX: "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106",
    FTM: "0xF491e7B69E4244ad4002BC14e878a34207E38c29",
    TJOE: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"
}

const WRAPPED = {
    ETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    BNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    MATIC: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    TEST: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
    AVAX: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    FTM: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
}

const TOKENS = [
  { //BSC 0
    BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    SUSHI: "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4",
    LINK: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
    DAI: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",    //BASED
    USDT: "0x55d398326f99059fF775485246999027B3197955",
    FRAX: "0x90C97F71E18723b0Cf0dfa30ee176Ab653E89F40",
    COMP: "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8",
    USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    AAVE: "0xfb6115445Bff7b52FeB98650C87f44907E58f802"
  },
 { //AVAX + TJOE 1
    BUSD: "0x9610b01AAa57Ec026001F7Ec5CFace51BfEA0bA6",  //  BASED
    SUSHI: "0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc", //
    LINK: "0x5947bb275c521040051d82396192181b413227a3",  //
    DAI: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",    //
    USDT: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",  //
    FRAX: "0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98",  //
    COMP: "0xc3048E19E76CB9a3Aa9d77D8C03c29Fc906e2437",  //
    USDC: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",  //
    AAVE: "0x8ce2dee54bb9921a2ae0a63dbb2df8ed88b91dd9"   //
  },
  { //ETH 2
    BUSD: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",  //
    SUSHI: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",  //
    LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",  //
    DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",  //
    USDT: "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",    //
    FRAX: "0x853d955acef822db058eb8505911ed77f175b99e",  //
    COMP: "0xc00e94Cb662C3520282E6f5717214004A7f26888",   //
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  //
    AAVE: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"  //BASED
  }, 
 { //MATIC 3
    USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",   //
    SUSHI: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",  //
    LINK: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",   //
    DAI: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",    //
    USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",   //  BASED
    FRAX: "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89",   //
    COMP: "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c",   //
    USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",  //
    AAVE: "0xd6df932a45c0f255f85145f286ea0b292b21c90b"   //
  },
 { //TESTNET 4
  BUSD: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
  SUSHI: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
  LINK: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
  DAI: "0x8a9424745056Eb399FD19a0EC26A14316684e274",     //BASED For TESTING
  USDT: "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
  FRAX: "0xC001BBe2B87079294C63EcE98BdD0a88D761434e",
  COMP: "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8",
  USDC: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
  AAVE: "0xfb6115445Bff7b52FeB98650C87f44907E58f802"
  },
  { //SPOOKYSWAP + SPIRITSWAP 5
    FRAX: "0xaf319E5789945197e365E7f7fbFc56B130523B33",
    USDC: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    DAI: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
    LINK: "0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8",
    AAVE: "0x6a07A792ab2965C72a5B8088d3a069A7aC3a993B", //BASED
    WBTC: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
    SUSHI: "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC",
    CRV: "0x1E4F97b9f9F913c46F1632781732927B9019C68b",
    SNX: "0x56ee926bD8c72B2d5fa1aF4d9E4Cbb515a1E3Adc"

  }
]

function App () {
  const [loaded, setLoaded] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState();
  const [swap, setSwap] = useState();
  const [networkId, setNetworkId] = useState();
  const [index, setIndex] = useState(0);
  const [wrappedAddr, setWrappedAddr] = useState();
  const [amountETH, setAmountETH] = useState();
  const [amountETH2, setAmountETH2] = useState();
  const [amountETH3, setAmountETH3] = useState();
  const [amountETH4, setAmountETH4] = useState();
  const [amountETH5, setAmountETH5] = useState();
  const [amountETH6, setAmountETH6] = useState();
  const [amountETH7, setAmountETH7] = useState();

  const [amountTokens, setAmountTokens] = useState();
  const [coin, setCoin] = useState();
  const [coin2, setCoin2] = useState();
  const [balance, setBalance] = useState(0.0);

  const [deadline, setDeadline] = useState();
  const [net, setNet] = useState('');
  const [amountToGet, setAmountToGet] = useState();
  const [amountToGet2, setAmountToGet2] = useState();
  const [amountToGet3, setAmountToGet3] = useState();
  const [amountToGet4, setAmountToGet4] = useState();
  const [amountToGet5, setAmountToGet5] = useState();
  const [amountToGet6, setAmountToGet6] = useState();
  const [amountToGet7, setAmountToGet7] = useState();
  const [page, setPage] = useState(0);
  const [greenDot, setGreenDot] = useState(["blank.png",'blank.png','blank.png','blank.png','blank.png','blank.png']);
  const on = "earth.png";
  const off = "blank.png";
  const [about, setAbout] = useState(false);
  const [sellSide, setSellSide] = useState(false);
  

async function connectBNBTest() {
     // Get network provider and web3 instance.
     const web3 = await getWeb3dos();
   

     // Use web3 to get the user's accounts.
     const accounts = await web3.eth.getAccounts();
 
     // Get the contract instance.
     const networkId = await web3.eth.getChainId();
 
 
     const swap = new web3.eth.Contract(
          [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
         ROUTERS.TEST,
     );
 
  
     setWeb3(web3);
     setAccounts(accounts);
     setSwap(swap);
     setWrappedAddr(WRAPPED.TEST);
     addBNBTestChain();
     setIndex(4);
     setGreenDot([off,off,off,off,on,off]);
     setAmountToGet5('');
     let balance = await web3.eth.getBalance(accounts[0]);
     let newBal = web3.utils.fromWei(balance, 'ether');
     setBalance(newBal);
    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.

  }
async function connectBNBMain() {
    // Get network provider and web3 instance.
    const web3 = await getWeb3dos();
  

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const networkId = await web3.eth.getChainId();


    const swap = new web3.eth.Contract(
        [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
        ROUTERS.BNBMain,
    );

 
    setWeb3(web3);
    setAccounts(accounts);
    setSwap(swap);
    setWrappedAddr(WRAPPED.BNB);
    addBNBChain();
    setIndex(0);
    setGreenDot([on,off,off,off,off,off]);
    let balance = await web3.eth.getBalance(accounts[0]);
     let newBal = web3.utils.fromWei(balance, 'ether');
     setBalance(newBal);
    setAmountToGet('');

   // Set web3, accounts, and contract to the state, and then proceed with an
   // example of interacting with the contract's methods.
 }

async function connectETH() {
  // Get network provider and web3 instance.
  const web3 = await getWeb3dos();


  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.getChainId();


  const swap = new web3.eth.Contract(
     [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
      ROUTERS.ETH,
  );


  setWeb3(web3);
  setAccounts(accounts);
  setSwap(swap);
  setWrappedAddr(WRAPPED.ETH);
  addETHChain();
  setIndex(2);
  setGreenDot([off,off,on,off,off,off]);
  let balance = await web3.eth.getBalance(accounts[0]);
  let newBal = web3.utils.fromWei(balance, 'ether');
  setBalance(newBal);
  setAmountToGet3('');
 // Set web3, accounts, and contract to the state, and then proceed with an
 // example of interacting with the contract's methods.

}

async function connectMATIC() {
  // Get network provider and web3 instance.
  const web3 = await getWeb3dos();


  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.getChainId();


  const swap = new web3.eth.Contract(
     [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
      ROUTERS.MATIC,
  );


  setWeb3(web3);
  setAccounts(accounts);
  setSwap(swap);
  setWrappedAddr(WRAPPED.MATIC);
  addMATICChain();
  setIndex(3);
  setGreenDot([off,off,off,on,off,off]);
  let balance = await web3.eth.getBalance(accounts[0]);
  let newBal = web3.utils.fromWei(balance, 'ether');
  setBalance(newBal);
  setAmountToGet4('');
 // Set web3, accounts, and contract to the state, and then proceed with an
 // example of interacting with the contract's methods.

}

async function connectAVAX() {
  // Get network provider and web3 instance.
  const web3 = await getWeb3dos();


  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.getChainId();


  const swap = new web3.eth.Contract(
     [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WAVAX","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WAVAX","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAXSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapAVAXForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAXSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
      ROUTERS.AVAX,
  );


  setWeb3(web3);
  setAccounts(accounts);
  setSwap(swap);
  setWrappedAddr(WRAPPED.AVAX);
  addAVAXChain();
  setIndex(1);
  setGreenDot([off,on,off,off,off,off]);
  let balance = await web3.eth.getBalance(accounts[0]);
  let newBal = web3.utils.fromWei(balance, 'ether');
  setBalance(newBal);
  setAmountToGet2('');
 // Set web3, accounts, and contract to the state, and then proceed with an
 // example of interacting with the contract's methods.

}
async function connectFTM() {
  // Get network provider and web3 instance.
  const web3 = await getWeb3dos();


  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.getChainId();


  const swap = new web3.eth.Contract(
     [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
      ROUTERS.FTM,
  );


  setWeb3(web3);
  setAccounts(accounts);
  setSwap(swap);
  setWrappedAddr(WRAPPED.FTM);
  addFTMChain();
  setIndex(5);
  setGreenDot([off,off,off,off,off,on]);
  let balance = await web3.eth.getBalance(accounts[0]);
  let newBal = web3.utils.fromWei(balance, 'ether');
  setBalance(newBal);
  setAmountToGet6('');
 
 // Set web3, accounts, and contract to the state, and then proceed with an
 // example of interacting with the contract's methods.

}
async function connectTJOE() {
  // Get network provider and web3 instance.
  const web3 = await getWeb3dos();


  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.getChainId();


  const swap = new web3.eth.Contract(
     [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WAVAX","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WAVAX","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAXSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapAVAXForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAXSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
      ROUTERS.TJOE,
  );


  setWeb3(web3);
  setAccounts(accounts);
  setSwap(swap);
  setWrappedAddr(WRAPPED.AVAX);
  addAVAXChain();
  setIndex(6);
  setGreenDot([off,off,off,off,on,off]);
  let balance = await web3.eth.getBalance(accounts[0]);
  let newBal = web3.utils.fromWei(balance, 'ether');
  setBalance(newBal);
  setAmountToGet7('');
 // Set web3, accounts, and contract to the state, and then proceed with an
 // example of interacting with the contract's methods.

}
async function connect() {
  const web3 = await getWeb3dos();


  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();

  // Get the contract instance.
  const networkId = await web3.eth.getChainId();

  setWeb3(web3);
  setAccounts(accounts);
  let balance = await web3.eth.getBalance(accounts[0]);
  let newBal = web3.utils.fromWei(balance, 'ether');
  setBalance(newBal);
}
window.ethereum.on('accountsChanged', function () {
  connect();
});

function addBNBChain() {
    addBNB();
    setNetworkId(56);
    setDeadline(16442130200 * 2); 
    setNet("Pancakeswap"); 
  }
function addBNBTestChain() {
    addTEST();
    setNetworkId(97);
    setDeadline(16442130200 * 2);
    setNet("Pancakeswap test"); 

}
function addMATICChain() {
    addMATIC();
    setNetworkId(137);
    setDeadline(1644213020 * 2);
    setNet("Quickswap"); 

}
function addETHChain() {
    addETH();
    setNetworkId(1);
    setDeadline(1644305727 * 2);
    setNet("Uniswap"); 

}

function addAVAXChain() {
  addAVAX();
  setNetworkId(43114);
  setDeadline(16442130200 * 2);
  setNet("Pangolinswap"); 

}
function addFTMChain() {
  addFTM();
  setNetworkId(250);
  setDeadline(1644303297 * 2);
  setNet("SpookySwap"); 

}

function handleInputChange(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH(value);
    setAmountToGet('');
    setSellSide(false);

  }
  function handleInputChange2(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH2(value);
    setAmountToGet2('');
    setSellSide(false);
  }

  function handleInputChange3(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH3(value);
    setAmountToGet3('');
    setSellSide(false);
  }

  function handleInputChange4(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH4(value);
    setAmountToGet4('');
    setSellSide(false);
  }

  function handleInputChange5(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH5(value);
    setAmountToGet5('');
    setSellSide(false);
  }

  function handleInputChange6(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH6(value);
    setAmountToGet6('');
    setSellSide(false);
  }
  function handleInputChange7(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH7(value);
    setAmountToGet7('');
    setSellSide(false);
  }

  //sell side
  function handleInputChangeSellSide(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH('');
    setAmountToGet(value);
    setSellSide(true);
  }
  function handleInputChangeSellSide2(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH2('');
    setAmountToGet2(value);
    setSellSide(true);
  }
  function handleInputChangeSellSide3(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH3('');
    setAmountToGet3(value);
    setSellSide(true);
  }
  function handleInputChangeSellSide4(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH4('');
    setAmountToGet4(value);
    setSellSide(true);
  }
  function handleInputChangeSellSide5(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH5('');
    setAmountToGet5(value);
    setSellSide(true);
  }
  function handleInputChangeSellSide6(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountETH6('');
    setAmountToGet6(value);
    setSellSide(true);
  }



  function handleInputChangeToken(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmountTokens(value);
  }
  function handleInputChangeCoin(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setCoin(value);
  }
  function handleInputChangeCoin2(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setCoin2(value);
  }
  

  //converts to the correct decimal places based on which coin/chain is being used.
  //USDC and USDT are always 6, but on BSC they USDC is 18.
  //WBTC = 8.
  function decimator() {
    if(sellSide == false) {
      let x = amounter();
      const amnt = x;
      if(index == 0 && coin == TOKENS[index].USDC) {
        const amount = web3.utils.toWei(amnt+'', "ether");
        return amount;
      } else if(coin == TOKENS[5].WBTC) {
        const amount = amnt * 100000000 //8 decimals
        return amount;
      } else if (index == 4) {
        const amount = web3.utils.toWei(amnt+'', "ether"); //Testnet
        return amount;
      } else if (coin == TOKENS[index].USDC || coin == TOKENS[index].USDT) {
        const amount = amnt * 1000000; //6 decimals
        return amount;
      }  else {
        const amount = web3.utils.toWei(amnt+'', "ether");
        return amount;
      }
    } else {
      let x = amounterSell();
      const amnt = x;
      if(index == 0 && coin == TOKENS[index].USDC) {
        const amount = web3.utils.toWei(amnt+'', "ether");
        return amount;
      } else if(coin == TOKENS[5].WBTC) {
        const amount = amnt * 100000000 //8 decimals
        return amount;
      } else if (index == 4) {
        const amount = web3.utils.toWei(amnt+'', "ether"); //Testnet
        return amount;
      } else if (coin == TOKENS[index].USDC || coin == TOKENS[index].USDT) {
        const amount = amnt * 1000000; //6 decimals
        return amount;
      }  else {
        const amount = web3.utils.toWei(amnt+'', "ether");
        return amount;
      }
    }
   
  }

  //
  // sets input state to the correct input field.
  //
  function amounter() {
    if(index == 0) {
      return amountETH;
    } else if(index == 1) {
      return amountETH2;
    }else if(index == 2) {
      return amountETH3;
    }else if(index == 3) {
      return amountETH4;
    } else if(index == 4) {
      return amountETH5;
    } else if(index == 5) {
      return amountETH6;
    }
  }
  function amounterSell() {
    if(index == 0) {
      return amountToGet;
    } else if(index == 1) {
      return amountToGet2;
    }else if(index == 2) {
      return amountToGet3;
    }else if(index == 3) {
      return amountToGet4;
    } else if(index == 4) {
      return amountToGet5;
    } else if(index == 5) {
      return amountToGet6;
    }
  }


  function outPutSelector(res) {
    if (sellSide == false) {
      if(index == 0) {
        setAmountToGet(res);
      } else if(index == 1) {
        setAmountToGet2(res);
      }else if(index == 2) {
        setAmountToGet3(res);
      }else if(index == 3) {
        setAmountToGet4(res);
      } else if(index == 4) {
        setAmountToGet5(res);
      } else if(index == 5) {
        setAmountToGet6(res);
      } else if(index == 6) {
        setAmountToGet7(res);
      }
    } else {
      if(index == 0) {
        setAmountETH(res);
      } else if(index == 1) {
        setAmountETH2(res);
      }else if(index == 2) {
        setAmountETH3(res);
      }else if(index == 3) {
        setAmountETH4(res);
      } else if(index == 4) {
        setAmountETH5(res);
      } else if(index == 5) {
        setAmountETH6(res);
      } else if(index == 6) {
        setAmountETH7(res);
      }
    }
    
  }

  async function getOutput() {
    //function getAmountsIn(uint amountOut, address[] memory path) internal view returns (uint[] memory amounts);  } Router functions
    //function getAmountsOut(uint amountIn, address[] memory path) internal view returns (uint[] memory amounts);  }
    const amount = decimator(); 
    let result = await swap.methods.getAmountsIn(amount, [coin, coin2]).call({from:accounts[0]});
    if(coin == TOKENS[index].USDC || coin == TOKENS[index].USDT) {
      let res = result[0] * 1000000;
      outPutSelector(res);
    } else {
      let res = web3.utils.fromWei(result[0], 'ether');
      console.log(res);
      outPutSelector(res);
    }
  }

//buyside
async function swapETHforExactTokens(x) {
    let amount = decimator();
    const block = web3.eth.getBlock('latest')
    block.then(console.log);
    const pair = [x, coin2];

    let gas = await swap.methods.getAmountsIn(amount, pair).call({from:accounts[0]});
    if(networkId == 43114) {
      await swap.methods.swapAVAXForExactTokens(amount, pair, accounts[0], deadline).send({from:accounts[0], value: gas[0]});
     } else {
      await swap.methods.swapETHForExactTokens(amount, pair, accounts[0], deadline).send({from:accounts[0], value: gas[0]});

     }
}

//sellside
async function swapExactTokensForETH(x) {
  //function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
 // external
 // returns (uint[] memory amounts);
 let amount = decimator();
 const pair = [coin, x];
 
 if(networkId == 43114) {
  await swap.methods.swapExactTokensForAVAX(amount, 1, pair, accounts[0], deadline).send({from:accounts[0]}); //AVAX changed 'ETH' to AVAX in function name.
 } else {
  await swap.methods.swapExactTokensForETH(amount, 1, pair, accounts[0], deadline).send({from:accounts[0]});
 }
}

//sellside
async function swapExactETHForTokens(x) {

//function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) returns (uint[] memory amounts);
  let amount = decimator();
  const pair = [x, coin];

  if(networkId == 43114) {
    await swap.methods.swapExactAVAXForTokens(amount, pair, accounts[0], deadline).send({from:accounts[0]}); //AVAX changed 'ETH' to AVAX in function name.
   } else {
    await swap.methods.swapExactETHForTokens(amount, pair, accounts[0], deadline).send({from:accounts[0]});
   }
} 
//buyside
async function swapTokensForExactTokens() {
  let amount = decimator();
  const pair = [coin, coin2];

  let amountIn = await swap.methods.getAmountsIn(amount, [coin, coin2]).call({from:accounts[0]});
  await swap.methods.swapTokensForExactTokens(amount, amountIn[0], pair, accounts[0], deadline).send({from:accounts[0]});
}
//sellside
async function swapExactTokensForTokens() {
  let amount = decimator();
  const pair = [coin, coin2];

  let amountIn = await swap.methods.getAmountsIn(amount, [coin, coin2]).call({from:accounts[0]});
  await swap.methods.swapExactTokensForTokens(amountIn[0], 1, pair, accounts[0], deadline).send({from:accounts[0]});
}
//buyside
async function swapTokensForExactETH(x) {
  //function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
  //external
  //returns (uint[] memory amounts);
  let amount = decimator();
  const pair = [coin, x];
  const result = await swap.methods.getAmountsIn(amount, [coin, coin2]).call({from:accounts[0]});  
  
  if(networkId == 43114) {
   await swap.methods.swapTokensForExactAVAX(amount, result[0], pair, accounts[0], deadline).send({from:accounts[0]}); //AVAX changed 'ETH' to AVAX in function name.
  } else {
   await swap.methods.swapTokensForExactETH(amount, result[0], pair, accounts[0], deadline).send({from:accounts[0]});
  }
}


//swap directory
async function swap_master0() {
  connectBNBMain();
  if(sellSide == false) {
    if(coin2 == WRAPPED.BNB) {
      swapTokensForExactETH(WRAPPED.BNB);
    } else if(coin == WRAPPED.BNB) {
      swapETHforExactTokens(WRAPPED.BNB);  //typo f not F
    } else {
      swapTokensForExactTokens();
    }
  } else {
    if(coin2 == WRAPPED.BNB) {
      swapExactTokensForETH(WRAPPED.BNB);  //Based
    } else if(coin == WRAPPED.BNB) {
      swapExactETHForTokens(WRAPPED.BNB); //Based
    } else {
      swapExactTokensForTokens();
    }
  }
}
async function swap_master1() {
  connectAVAX();
  if(sellSide == false) {
    if(coin2 == WRAPPED.AVAX) {
      swapTokensForExactETH(WRAPPED.AVAX);
    } else if(coin == WRAPPED.AVAX) {
      swapETHforExactTokens(WRAPPED.AVAX);
    } else {
      swapTokensForExactTokens();
    }
  } else {
    if(coin2 == WRAPPED.AVAX) {
      swapExactTokensForETH(WRAPPED.AVAX);  //Based
    } else if(coin == WRAPPED.TEST) {
      swapExactETHForTokens(WRAPPED.AVAX);
    } else {
      swapExactTokensForTokens();
    }
  }
}
async function swap_master2() {
  connectETH();
  if(sellSide == false) {
    if(coin2 == WRAPPED.ETH) {
      swapTokensForExactETH(WRAPPED.ETH);
    } else if(coin == WRAPPED.ETH) {
      swapETHforExactTokens(WRAPPED.ETH);
    } else {
      swapTokensForExactTokens();
    }
  } else {
    if(coin2 == WRAPPED.ETH) {
      swapExactTokensForETH(WRAPPED.ETH);  //Based
    } else if(coin == WRAPPED.ETH) {
      swapExactETHForTokens(WRAPPED.ETH);
    } else {
      swapExactTokensForTokens();
    }
  }
}
async function swap_master3() {
  connectMATIC();
  if(sellSide == false) {
    if(coin2 == WRAPPED.MATIC) {
      swapTokensForExactETH(WRAPPED.MATIC);
    } else if(coin == WRAPPED.MATIC) {
      swapETHforExactTokens(WRAPPED.MATIC);
    } else {
      swapTokensForExactTokens();
    }
  } else {
    if(coin2 == WRAPPED.MATIC) {
      swapExactTokensForETH(WRAPPED.MATIC);  //Based
    } else if(coin == WRAPPED.MATIC) {
      swapExactETHForTokens(WRAPPED.MATIC);
    } else {
      swapExactTokensForTokens();
    }
  }
}
async function swap_master4() {
  connectBNBTest();
  if(sellSide == false) {
    if(coin2 == WRAPPED.TEST) {
      swapTokensForExactETH(WRAPPED.TEST);
    } else if(coin == WRAPPED.TEST) {
      swapETHforExactTokens(WRAPPED.TEST);
    } else {
      swapTokensForExactTokens();
    }
  } else {
    if(coin2 == WRAPPED.TEST) {
      swapExactTokensForETH(WRAPPED.TEST);  //Based
    } else if(coin == WRAPPED.TEST) {
      swapExactETHForTokens(WRAPPED.TEST);
    } else {
      swapExactTokensForTokens();
    }
  }
    
}
async function swap_master5() {
  connectFTM();
  if(sellSide == false) {
    if(coin2 == WRAPPED.FTM) {
      swapTokensForExactETH(WRAPPED.FTM);
    } else if(coin == WRAPPED.FTM) {
      swapETHforExactTokens(WRAPPED.FTM);
    } else {
      swapTokensForExactTokens();
    }
  } else {
    if(coin2 == WRAPPED.FTM) {
      swapExactTokensForETH(WRAPPED.FTM);  //Based
    } else if(coin == WRAPPED.FTM) {
      swapExactETHForTokens(WRAPPED.FTM);
    } else {
      swapExactTokensForTokens();
    }
  }
}

function flip() {
  setCoin2(coin);  //need to visualize this change on the front end.
  setCoin(coin2);
}
function handlePage() {
  setPage(0);
}
function handlePage2() {
  setPage(1);
}
function handlePage3() {
  setPage(2);
}
function handleTabs() {
  if(about == false) {
    setAbout(true);
  } else {
    setAbout(false);
  }
 
}



    if (page == 0) {
      return (
        <div className="App">
          <div className='header'>
        
            <img id='title' src='AmazonLogo.png'/>
          
          <div className='mid'>
          <Tabs id='navbar'sx={{borderStyle: "solid", borderRadius: 15, borderColor: "white", marginTop: 0}} value={page} onChange={handlePage} centered>
          <Tab sx={{backgroundColor: 'white'}} label="Miniswap" onClick={handlePage} />
          <Tab sx={{backgroundColor: 'white'}} label="$AMZN" onClick={handlePage2}/>
          <Tab sx={{backgroundColor: 'white'}} label="DAO" onClick={handlePage3} />
          </Tabs>
          </div>
        
          <div className='end'>
            <Tabs id='userInfo' sx={{borderStyle: "solid", borderRadius: 15, borderColor: "white", marginRight: 0}}>
         
              <Tab sx={{ backgroundColor: 'white'}}  label={(balance + '').slice(0, 5)} disabled />
              <Tab sx={{ backgroundColor: 'white'}}  label={(accounts[0] + '').slice(0, 3)+'...'+(accounts[0] + '').slice(-4, -1)} onClick={connect}/>
              </Tabs>
              </div>
           
          </div>
          <div className="column">
      
      <div className='row'>
     <CardContent id='quickswap' sx={{ padding: 0, margin: 3, backgroundColor: "white", textAlign: "center"}}>
       <div className='cardHeader2'>
         <img className='logo' src='pancakeswap.png'/>
      <Typography  sx={{ fontSize: 20, color: "darkBlue", marginBottom: 2 }} color="text.secondary">
        Pancakeswap <img src={greenDot[0]}/>
      </Typography>
      <Typography sx={{ fontSize: 5, color: "darkBlue" }} color="text.secondary">
      </Typography> 
    
     
      <Tabs id='minitabs'sx={{backgroundColor: 'white', borderColor: "white", marginBottom: 0, paddingBottom: 0}} value={page}  centered>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 8, margin: 0}} label="Swap" onClick={handleTabs} />
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 8, margin: 0}} label="About" onClick={handleTabs}/>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 8, margin: 0}} label="Charts" onClick={handleTabs} />
          </Tabs>
         
         
      </div>
      <div className='cardFooter'>
     
      <Typography sx={{ marginTop: 0 }}  variant="h5" component="div" >
      <div className='row'>
      <TextField
          id="filled-search"
          placeholder="From"
          type="text"
          variant="filled"
          sx={{borderRadius: 12, borderStyel: 'solid'}}
          name='amountETH' value={amountToGet} onChange={handleInputChangeSellSide}
        />
        <FormControl onClick={connectBNBMain} sx={{width: 150}}>
          <InputLabel ><img src="bnb.png" /> Choose</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin}
              label="BNB"
              onChange={handleInputChangeCoin}
             >
             <input type='text' placeholder='Search Address' name='coin' value={coin} onChange={handleInputChangeCoin}/>
             <MenuItem value={coin}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.BNB}><img src="bnb.png" /> BNB</MenuItem>
             <MenuItem value={TOKENS[0].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[0].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[0].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[0].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[0].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[0].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[0].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[0].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[0].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <FcDown />
      </Typography>
      <Typography variant='h5' component='div'>
      <Typography sx={{ fontSize: 5, color: "darkBlue" }} color="text.secondary">
       
      </Typography>
      <div className='row'>
      <TextField
          id="filled-search"
          type="text"
          placeholder="To"
          value={amountETH}
          variant="filled"
          name='amountTokens' value={amountETH} onChange={handleInputChange}
        />
        <FormControl onClick={connectBNBMain} sx={{width: 150}}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin2}
              label="Token"
              onChange={handleInputChangeCoin2}
             >
              <input type='text' placeholder='Search Address' name='coin' value={coin2} onChange={handleInputChangeCoin2}/>
             <MenuItem value={coin2}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.BNB}><img src="bnb.png" /> BNB</MenuItem>
             <MenuItem value={TOKENS[0].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[0].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[0].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[0].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[0].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[0].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[0].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[0].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[0].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <img className='SwapButton' sx={{height: 100, width:150}} src="swap.png"  onClick={swap_master0}></img>
        <img className='PriceTag'src="price-tag.png" onClick={getOutput}/>
      </Typography>
      </div>
    </CardContent>
    <CardContent id='quickswap' sx={{ padding: 0, margin: 3, backgroundColor: "white", textAlign: "center"}}>
    <div className='cardHeader3'>
    <img className='logo' src='pangolin.png'/>
      <Typography sx={{ fontSize: 20, color: "darkBlue" }} color="text.secondary">
        Pangolinswap <img src={greenDot[1]}/>
      </Typography>
      <Tabs id='minitabs'sx={{backgroundColor: 'white', borderColor: "white", marginBottom: 0, paddingBottom: 0}} value={page}  centered>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Swap" onClick={handlePage} />
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="About" onClick={handlePage2}/>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Charts" onClick={handlePage3} />
          </Tabs>
      </div>
      <div className='cardFooter'>
      <Typography  sx={{ marginTop: 3 }} variant="h5" component="div" >
    
      <div className='row'>
      <TextField
          id="filled-search"
          placeholder="From"
          type="text"
          variant="filled"
          name='amountETH' value={amountToGet2} onChange={handleInputChangeSellSide2}
        />
        <FormControl onClick={connectAVAX} sx={{width: 150}}>
        <InputLabel ><img src="avax.jpg" /> AVAX</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin}
              label="Token"
              onChange={handleInputChangeCoin}
             >
             <input type='text' placeholder='Search Address' name='coin' value={coin} onChange={handleInputChangeCoin}/>
             <MenuItem value={coin}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.AVAX}><img src="avax.jpg" /> AVAX</MenuItem>
             <MenuItem value={TOKENS[1].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[1].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[1].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[1].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[1].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[1].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[1].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[1].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[1].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <FcDown onClick={flip}/>
      </Typography>
      <Typography variant='h5' component='div'>
      <div className='row'>
      <TextField
          id="filled-search"
          placeholder="To"
          type="text"
          value={amountETH2}
          variant="filled"
          name='amountTokens' value={amountETH2} onChange={handleInputChange2}
        />
        <FormControl onClick={connectAVAX} sx={{width: 150}}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin2}
              label="Token"
              onChange={handleInputChangeCoin2}
             >
              <input type='text' placeholder='Search Address' name='coin' value={coin2} onChange={handleInputChangeCoin2}/>
             <MenuItem value={coin2}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.AVAX}><img src="avax.jpg" /> AVAX</MenuItem>
             <MenuItem value={TOKENS[1].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[1].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[1].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[1].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[1].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[1].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[1].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[1].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[1].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <img className='SwapButton' sx={{height: 100, width:150}} src="swap.png"  onClick={swap_master1}></img>
        <img className='PriceTag'src="price-tag.png" onClick={getOutput}/>
      </Typography>
      </div>
    </CardContent>
    
   
    <CardContent id='quickswap' sx={{ padding: 0, margin: 3, backgroundColor: "white", textAlign: "center"}}>
    <div className='cardHeader'>
    <img className='logo' src='uniswap.png'/>
      <Typography sx={{ fontSize: 20, color: "darkBlue" }} color="text.secondary">
        Uniswap <img src={greenDot[2]}/>
      </Typography>
      <Tabs id='minitabs'sx={{backgroundColor: 'white', borderColor: "white", marginBottom: 0, paddingBottom: 0}} value={page}  centered>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Swap" onClick={handlePage} />
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="About" onClick={handlePage2}/>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Charts" onClick={handlePage3} />
          </Tabs>
      </div>
      <div className='cardFooter'>
      <Typography  sx={{ marginTop: 3 }} variant="h5" component="div" >
    
      <div className='row'>
      <TextField
          id="filled-search"
          placeholder="From"
          type="text"
          variant="filled"
          name='amountETH' value={amountToGet3} onChange={handleInputChangeSellSide3}
        />
        <FormControl onClick={connectETH} sx={{width: 150}}>
        <InputLabel ><img src="eth.jpg" /> ETH</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin}
              label="Token"
              onChange={handleInputChangeCoin}
             >
             <input type='text' placeholder='Search Address' name='coin' value={coin} onChange={handleInputChangeCoin}/>
             <MenuItem value={coin}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.ETH}><img src="eth.jpg" /> ETH</MenuItem>
             <MenuItem value={TOKENS[2].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[2].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[2].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[2].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[2].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[2].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[2].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[2].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[2].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <FcDown onClick={flip} />
      </Typography>
      <Typography variant='h5' component='div'>
      <div className='row'>
      <TextField
          id="filled-search"
          placeholder="To"
          type="text"
          value={amountETH3}
          variant="filled"
          name='amountTokens' value={amountETH3} onChange={handleInputChange3}
        />
        <FormControl onClick={connectETH} sx={{width: 150}}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin2}
              label="Token"
              onChange={handleInputChangeCoin2}
             >
             <input type='text' placeholder='Search Address' name='coin' value={coin2} onChange={handleInputChangeCoin2}/>
             <MenuItem value={coin2}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.ETH}><img src="eth.jpg" /> ETH</MenuItem>
             <MenuItem value={TOKENS[2].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[2].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[2].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[2].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[2].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[2].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[2].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[2].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[2].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <img className='SwapButton' sx={{height: 100, width:150}} src="swap.png"  onClick={swap_master2}></img>
        <img className='PriceTag'src="price-tag.png" onClick={getOutput}/>
      </Typography>
      </div>
    </CardContent>
    </div>
    <div className='row'>
    <CardContent id='quickswap' sx={{padding: 0, margin: 3, backgroundColor: "white", textAlign: "center"}}>
    <div className='cardHeader4'>
    <img className='logo' src='quickswap.jpg'/>
      <Typography sx={{ fontSize: 20, color: "darkBlue" }} color="text.secondary">
        Quickswap <img src={greenDot[3]}/>
      </Typography>
      <Tabs id='minitabs'sx={{backgroundColor: 'white', borderColor: "white", marginBottom: 0, paddingBottom: 0}} value={page}  centered>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Swap" onClick={handlePage} />
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="About" onClick={handlePage2}/>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Charts" onClick={handlePage3} />
          </Tabs>
      </div>
      <div className='cardFooter'>
      <Typography  sx={{ marginTop: 3 }} variant="h5" component="div" >
    
      <div className='row'>
      <TextField
          id="filled-search"
          placeholder="From"
          type="text"
          variant="filled"
          name='amountETH' value={amountToGet4} onChange={handleInputChangeSellSide4}
        />
        <FormControl onClick={connectMATIC} sx={{width: 150}}>
        <InputLabel ><img src="matic.jpg" /> MATIC</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin}
              label="Token"
              onChange={handleInputChangeCoin}
             >
             <input type='text' placeholder='Search Address' name='coin' value={coin} onChange={handleInputChangeCoin}/>
             <MenuItem value={coin}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.MATIC}><img src="matic.jpg" /> MATIC</MenuItem>
             <MenuItem value={TOKENS[3].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[3].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[3].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[3].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[3].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[3].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[3].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[3].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[3].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <FcDown />
      </Typography>
      <Typography variant='h5' component='div'>
      <div className='row'>
      <TextField
          id="filled-search"
          placeholder="To"
          type="text"
          value={amountETH4}
          variant="filled"
          name='amountTokens' value={amountETH4} onChange={handleInputChange4}
        />
        <FormControl onClick={connectMATIC} sx={{width: 150}}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin2}
              label="Token"
              onChange={handleInputChangeCoin2}

             >
              <input type='text' placeholder='Search Address' name='coin' value={coin2} onChange={handleInputChangeCoin2}/>
             <MenuItem value={coin2}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.MATIC}><img src="matic.jpg" /> MATIC</MenuItem>
             <MenuItem value={TOKENS[3].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[3].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[3].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[3].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[3].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[3].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[3].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[3].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[3].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>

        <img className='SwapButton' sx={{height: 100, width:150}} src="swap.png"  onClick={swap_master3}></img>
        <img className='PriceTag'src="price-tag.png" onClick={getOutput}/>

      </Typography>
      </div>
    </CardContent>
    
  

    <CardContent id='quickswap' sx={{ padding: 0, margin: 3, backgroundColor: "white", textAlign: "center"}}>
    <div className='cardHeader'>
    <img className='logo' src='pancakeswap.png'/>
      <Typography sx={{ fontSize: 20, color: "darkBlue" }} color="text.secondary">
        Testnet <img src={greenDot[4]}/>
      </Typography>
      <Tabs id='minitabs'sx={{backgroundColor: 'white', borderColor: "white", marginBottom: 0, paddingBottom: 0}} value={page}  centered>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Swap" onClick={handlePage} />
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="About" onClick={handlePage2}/>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Charts" onClick={handlePage3} />
          </Tabs>
      </div>
      <div className='cardFooter'>
      <Typography  sx={{ marginTop: 3 }} variant="h5" component="div" >
    
      <div className='row'>
      <TextField
          id="filled-search"
          placeholder="From"
          type="text"
          variant="filled"
          name='amountETH' value={amountToGet5} onChange={handleInputChangeSellSide5}
        />
        <FormControl onClick={connectBNBTest} sx={{width: 150}}>
        <InputLabel ><img src="1.png" /> tBNB</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin}
              label="Token"
              onChange={handleInputChangeCoin}
             >
             <input type='text' placeholder='Search Address' name='coin' value={coin} onChange={handleInputChangeCoin}/>
             <MenuItem value={coin}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.TEST}><img src="1.png" /> tBNB</MenuItem>
             <MenuItem value={TOKENS[4].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[4].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[4].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[4].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[4].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[4].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[4].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[4].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[4].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <FcDown onClick={flip} />
      </Typography>
      <Typography variant='h5' component='div'>
      <div className='row'>
      <TextField 
          id="filled-search"
          placeholder="To"
          type="text"
          value={amountETH5}
          variant="filled"
          name='amountTokens' value={amountETH5} onChange={handleInputChange5}
        />
        <FormControl onClick={connectBNBTest} sx={{width: 150}}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin2}
              label="Token"
              onChange={handleInputChangeCoin2}
             >
           
             <input type='text' placeholder='Search Address' name='coin' value={coin2} onChange={handleInputChangeCoin2}/>
             <MenuItem value={coin2}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.TEST}><img src="1.png" /> tBNB</MenuItem>
             <MenuItem value={TOKENS[4].BUSD}><img src="1.png" /> BUSD</MenuItem>
             <MenuItem value={TOKENS[4].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[4].USDT}><img src="usdt.png" /> USDT</MenuItem>
             <MenuItem value={TOKENS[4].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[4].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[4].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[4].COMP}><img src="comp.png" /> COMP</MenuItem>
             <MenuItem value={TOKENS[4].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[4].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <img className='SwapButton' sx={{height: 100, width:150}} src="swap.png"  onClick={swap_master4}></img>
        <img className='PriceTag'src="price-tag.png" onClick={getOutput}/>
      </Typography>
      </div>
    </CardContent>

    <CardContent id='quickswap' sx={{padding: 0, margin: 3, backgroundColor: "white", textAlign: "center"}}>
    <div className='cardHeader6'>
    <img className='logo' src='spookyswap.jpg'/>
      <Typography sx={{ fontSize: 20, color: "darkBlue" }} color="text.secondary">
        SpookySwap <img src={greenDot[5]}/>
      </Typography>
      <Tabs id='minitabs'sx={{backgroundColor: 'white', borderColor: "white", marginBottom: 0, paddingBottom: 0}} value={page}  centered>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Swap" onClick={handlePage} />
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="About" onClick={handlePage2}/>
          <Tab sx={{backgroundColor: 'white', padding: 0, height: 5, width: 15, fontSize: 12, margin: 0}} label="Charts" onClick={handlePage3} />
          </Tabs>
    </div>
    <div className='cardFooter'>
      <Typography  sx={{ marginTop: 3 }} variant="h5" component="div" >
    
      <div className='row'>
      <TextField
          id="filled-search"
          placeholder="From"
          type="text"
          variant="filled"
          name='amountETH' value={amountToGet6} onChange={handleInputChangeSellSide6}
        />
        <FormControl onClick={connectFTM} sx={{width: 150}}>
        <InputLabel ><img src="fantom.png" /> FTM</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin}
              label="Token"
              onChange={handleInputChangeCoin}
             >
             <input type='text' placeholder='Search Address' name='coin' value={coin} onChange={handleInputChangeCoin}/>
             <MenuItem value={coin}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.FTM}><img src="fantom.png" /> FTM</MenuItem>
             <MenuItem value={TOKENS[5].WBTC}><img src="wbtc.png" /> WBTC</MenuItem>
             <MenuItem value={TOKENS[5].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[5].CRV}><img src="crv.png" /> CRV</MenuItem>
             <MenuItem value={TOKENS[5].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[5].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[5].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[5].SNX}><img src="snx.png" /> SNX</MenuItem>
             <MenuItem value={TOKENS[5].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[5].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <FcDown onClick={flip} />
      </Typography>
      <Typography variant='h5' component='div'>
      <div className='row'>
      <TextField 
          id="filled-search"
          placeholder='To'
          type="text"
          value={amountETH6}
          variant="filled"
          name='amountTokens' value={amountETH6} onChange={handleInputChange6}
        />
        <FormControl onClick={connectFTM} sx={{width: 150}}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={coin2}
              label="Token"
              onChange={handleInputChangeCoin2}
             >
              <input type='text' placeholder='Search Address' name='coin' value={coin2} onChange={handleInputChangeCoin2}/>
             <MenuItem value={coin2}>Use Custom </MenuItem>
             <MenuItem value={WRAPPED.FTM}><img src="fantom.png" /> FTM</MenuItem>
             <MenuItem value={TOKENS[5].WBTC}><img src="wbtc.png" /> WBTC</MenuItem>
             <MenuItem value={TOKENS[5].DAI}><img src="dai.jpg" /> DAI</MenuItem>
             <MenuItem value={TOKENS[5].CRV}><img src="crv.png" /> CRV</MenuItem>
             <MenuItem value={TOKENS[5].LINK}><img src="chainlink.jpg" /> LINK</MenuItem>
             <MenuItem value={TOKENS[5].FRAX}><img src="frax.png" /> FRAX</MenuItem>
             <MenuItem value={TOKENS[5].SUSHI}><img src="sushi.png" /> SUSHI</MenuItem>
             <MenuItem value={TOKENS[5].SNX}><img src="snx.png" /> SNX</MenuItem>
             <MenuItem value={TOKENS[5].USDC}><img src="usdc.png" /> USDC</MenuItem>
             <MenuItem value={TOKENS[5].AAVE}><img src="aave.jpg" /> AAVE</MenuItem>
            </Select>
           </FormControl>
       
        </div>
        <img className='SwapButton' sx={{height: 100, width:150}} src="swap.png"  onClick={swap_master5}></img>
        <img className='PriceTag'src="price-tag.png" onClick={getOutput}/>
      </Typography>
      </div>
    </CardContent>
    </div>
    </div>
  
        </div>
      );
    } else if(page == 1) {
      return (
      <div className="App">
        <div className='header'>
        
        <img id='title' src='AmazonLogo.png'/>
      
      <div className='mid'>
      <Tabs id='navbar'sx={{borderStyle: "solid", borderRadius: 15, borderColor: "white", marginTop: 0}} value={page} onChange={handlePage} centered>
      <Tab sx={{backgroundColor: 'white'}} label="Miniswap" onClick={handlePage} />
      <Tab sx={{backgroundColor: 'white'}} label="$AMZN" onClick={handlePage2}/>
      <Tab sx={{backgroundColor: 'white'}} label="DAO" onClick={handlePage3} />
      </Tabs>
      </div>
    
      <div className='end'>
        <Tabs id='userInfo' sx={{borderStyle: "solid", borderRadius: 15, borderColor: "white", marginRight: 0}}>
     
          <Tab sx={{ backgroundColor: 'white'}}  label={(balance + '').slice(0, 5)} disabled />
          <Tab sx={{ backgroundColor: 'white'}}  label={(accounts[0] + '').slice(0, 3)+'...'+(accounts[0] + '').slice(-4, -1)} onClick={connect} />
          </Tabs>
          </div>
       
      </div>
           <AMZN/>
        </div>)
    } else if(page == 2) {
      return (
      <div className="App">
        <div className='header'>
        
        <img id='title' src='AmazonLogo.png'/>
      
      <div className='mid'>
      <Tabs id='navbar'sx={{borderStyle: "solid", borderRadius: 15, borderColor: "white", marginTop: 0}} value={page} onChange={handlePage} centered>
      <Tab sx={{backgroundColor: 'white'}} label="Miniswap" onClick={handlePage} />
      <Tab sx={{backgroundColor: 'white'}} label="$AMZN" onClick={handlePage2}/>
      <Tab sx={{backgroundColor: 'white'}} label="DAO" onClick={handlePage3} />
      </Tabs>
      </div>
    
      <div className='end'>
        <Tabs id='userInfo' sx={{borderStyle: "solid", borderRadius: 15, borderColor: "white", marginRight: 0}}>
     
          <Tab sx={{ backgroundColor: 'white'}}  label={(balance + '').slice(0, 5)} disabled />
          <Tab sx={{ backgroundColor: 'white'}}  label={(accounts[0] + '').slice(0, 3)+'...'+(accounts[0] + '').slice(-4, -1)} onClick={connect} />
          </Tabs>
          </div>
       
      </div>
           <AMZN/>
        </div>)
    }
  };


export default App;