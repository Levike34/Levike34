import logo from './logo.svg';
import React, { useState, useHook, useEffect } from "react";
import { Contract, ethers } from "ethers";
import './App.css';
import getWeb3dos from './getWeb3dos.js';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import addBNB from './addTestnet';
import { BreadTile, CornTile, MushroomTile, StrawberryTile, ChickenTile, FishTile, FishTileBig, CheeseTile, CheeseTileBig,
	SteakTile, SalmonTile, WheatTile, ChocolateDonutTile, ChocolateTile, StrawberryCakeTile, CinnamonRollTile, Tile, PixelTile,
  CornTileBig, MushroomTileBig, StrawberryTileBig, ChickenTileBig, 
	SteakTileBig, SalmonTileBig, WheatTileBig, BreadTileBig, ChocolateDonutTileBig, ChocolateTileBig, StrawberryCakeTileBig, CinnamonRollTileBig, TileBig, PixelTileBig,
   } from "./tiles";
import { ShowRecipes, ShowRecipes2 } from "./recipes";
import HTMLFlipBook from "react-pageflip";
import Popup from 'reactjs-popup';

const resourceABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_pixel",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "TransferBatch",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "TransferSingle",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "value",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "URI",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DIAMOND_RINGS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DUAL_POTIONS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FOOD",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "GEMS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "HEALTH_POTIONS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "METAL",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "REPAIR_HAMMER",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SKELETON_BONES",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "STAMINA_POTIONS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "STONE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WOOD",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      }
    ],
    "name": "balanceOfBatch",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "resourceId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountToBuy",
        "type": "uint256"
      }
    ],
    "name": "buyResources",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "chopWood",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "faucet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "got",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "harvestFood",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "lootSkeleton",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "makeDiamondRing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "makeDualPotion",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "makeGem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "makeHealthPotion",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "makeRepairHammer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "makeStaminaPotion",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "master",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mineStone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pixel",
    "outputs": [
      {
        "internalType": "contract Pixel",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeBatchTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "uri",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const pixelABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "authorize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "unAuthorize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const resourceAddr = "0xe75a544AB6327bDb50e2914985A3aDb5Ef127921";
const pixelAddr = "0xa4d2D4373d4f0EAc642dB50abdcF2969F8213D3F";
const DECIMALS = 10e18;

function Slider() {
  return (
    <AwesomeSlider>
      <div><ShowRecipes/></div>
      <div><ShowRecipes2/></div>
    </AwesomeSlider>
  );
} 


function App() {
  const [connected, setConnected] = useState();
  const [mainPage, setMainPage] = useState(false);
  const [accounts, setAccounts] = useState(['0xAccount']);
  const [ethBal, setEthBal] = useState('');
  const [pixelBal, setPixelBal] = useState();
  const [pixel, setPixel] = useState();
  const [resources, setResources] = useState();          
  const [resourceBalances, setResourceBalances] = useState([
	  100,//0    bread
	  50,//1    corn
	  50,//2    mushroom
	  50,//3    strawberry
	  10,//4    salmon
	  40,//5    chicken
	  5,//6    steak
	  500,//7    wheat
	  2,//8    chocolate
	  0,//9    chocolate donut
	  0//10    strawberry cake
	]);
  const [amount, setAmount] = useState(1);
  const [item1, setItem1] = useState(null);
  const [item2, setItem2] = useState(null);
  const [item3, setItem3] = useState(null);
  const [pair, setPair] = useState('a');
  const [tracker, setTracker] = useState(null);
  const [buyTracker, setBuyTracker] = useState(null);
  const [amountToBuy, setAmountToBuy] = useState('');
  const [showBook, setShowBook] = useState(false);
  const [mainItem, setMainItem] = useState(<BreadTileBig />);
  const [craftReq, setCraftReq] = useState([null,null,null]);
  const [calc, setCalc] = useState([null,null,null]);
  const [itemText, setItemText] = useState("Food is for eating and crafting."); 
  const [reqResources, setReqResources] = useState([null,null,null]);
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [slidePage, setSlidePage] = useState(0);
  const [craftingPage, setCraftingPage] = useState(false);
  const [artifactStylePair, setArtifactStylePair] = useState(['artifactGlow', 'artifact' ]);

async function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
}
useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange());
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange());
    }
}, []);


//const isMobile = width <= 768;

  const handleChange = (event) => {
    setAmount(event.target.value);
  };
  const handleChange2 = (event) => {
    setAmountToBuy(event.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      connect();
	    //addBNB();
    }, 1000);
  
    return () => clearInterval(interval);
   
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      return;
    } else {
      connect();
    }

   
  }, [0]);

  async function connect() {
      const web3 = await getWeb3dos();
      const accounts = await web3.eth.getAccounts();

      const pixel = new web3.eth.Contract(
        pixelABI,
        pixelAddr
        //"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
        
      );
      const resources = new web3.eth.Contract(
        resourceABI,
        resourceAddr
       // "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
        );
     /// updateBalances();
     let ethBal = await web3.eth.getBalance(accounts[0]);
     let pixelBal = await pixel.methods.balanceOf(accounts[0]).call({from: accounts[0]});
     let wood = await resources.methods.balanceOf(accounts[0], 0).call({from: accounts[0]});
     let stone = await resources.methods.balanceOf(accounts[0], 1).call({from: accounts[0]});
     let food = await resources.methods.balanceOf(accounts[0], 2).call({from: accounts[0]});
     let healthPotions = await resources.methods.balanceOf(accounts[0], 3).call({from: accounts[0]});
     let staminaPotions = await resources.methods.balanceOf(accounts[0], 4).call({from: accounts[0]});
     let skeletonBones = await resources.methods.balanceOf(accounts[0], 5).call({from: accounts[0]});
     let dualPotions = await resources.methods.balanceOf(accounts[0], 6).call({from: accounts[0]});
	   let metal = await resources.methods.balanceOf(accounts[0], 7).call({from: accounts[0]});
     let gemsBal = await resources.methods.balanceOf(accounts[0], 8).call({from: accounts[0]});
	   let diamondRings = await resources.methods.balanceOf(accounts[0], 9).call({from: accounts[0]});
	   let repairHammers = await resources.methods.balanceOf(accounts[0], 10).call({from: accounts[0]});

      console.log(web3.utils.fromWei(ethBal, "ether"));
      let ethBalFixed = web3.utils.fromWei(ethBal, "ether");
      setEthBal(ethBalFixed);
      setPixelBal(pixelBal);
      setPixel(pixel);
      setResources(resources);
      setAccounts(accounts);
      setConnected(true);
      setResourceBalances([wood, stone, food, healthPotions, staminaPotions, skeletonBones, dualPotions, metal, gemsBal, diamondRings, repairHammers]);
  }
 

  async function makeHp() {
      await resources.methods.makeHealthPotion(amount).send({from: accounts[0]});
      console.log("You created a health potion");
  }
  async function makeStam() {
    await resources.methods.makeStaminaPotion(amount).send({from: accounts[0]});
    console.log("You created a Stamina potion");
  }
  async function makeDual() {
    await resources.methods.makeDualPotion(amount).send({from: accounts[0]});
    console.log("You created a Dual potion");
  }
  ///
  /// METALS
  async function makeRepairHammer() {
	await resources.methods.makeRepairHammer(amount).send({from: accounts[0]});
	console.log("You created a Repair Hammer");
}
async function makeRing() {
  await resources.methods.makeDiamondRing(amount).send({from: accounts[0]});
  console.log("You created a Diamond Ring");
}
async function makeGem() {
  await resources.methods.makeGem(amount).send({from: accounts[0]});
  console.log("You created a Gem");
}

  async function faucet() {
    if(ethBal == 0) {
      alert(" https://testnet.binance.org/faucet-smart");
    }else {
      let result = await resources.methods.faucet().send({from: accounts[0]});
      alert("Resources have been transferred to you account."+result);
    }

  }

  async function craftItem() {
    if (tracker == 0) {
      makeHp();
    } else if (tracker == 1) {
      makeStam();
    }else if (tracker == 2) {
      makeDual();
    }else if (tracker == 3) {
      await pixel.methods.approve(resourceAddr, "100000000000000000000000").send({from:accounts[0]});
      makeGem();
    }else if (tracker == 4) {
      makeRepairHammer();
    }else if (tracker == 5) {
      await pixel.methods.approve(resourceAddr, "100000000000000000000000").send({from:accounts[0]});
      makeRing();
    }
}

  function selectItem() {
    setCalc([null,null,null]);
    showInfo(<BreadTileBig/>, "Bread is bread.  What did you think it was?");
    findCreation4Real();
    setShow(false);
    setBuyTracker(0);
  }
  function selectItem2() {
    setCalc([null,null,null]);
    setTracker(null);
    showInfo(<CornTileBig/>, "Corn grows in the ground like any other plant does.");
    findCreation4Real();
    setShow(false);
    setBuyTracker(1);
  }
  function selectItem3() {
    setCalc([null,null,null]);
    showInfo(<MushroomTileBig/>, "Mushrooms are like tiny umbrellas growing out of the ground.");
    findCreation4Real();
    setShow(false);
    setBuyTracker(2);
  }
  function selectItem4() {
    setCalc([null,null,null]);
		setTracker(null);
    showInfo(<StrawberryTileBig/>, "Strawberry.  Nature's sweet gift to mankind." );
    findCreation4Real();
    setShow(false);
    setBuyTracker(3);
  }
  function selectItem5() {
    let num = [50,100,2000];
    setCalc(num);
		setTracker(3);
    showInfo(<SalmonTileBig/>, "Salmon is among the best kind of fish available.  Fully of fats and protein, it is perfect for bodybuilders.");
    findCreation4Real(3);
    setShow(true);
    setBuyTracker(4);
  }
  function selectItem6() {
    setCalc([5,10,null]);
    setTracker(4);
    showInfo(<ChickenTileBig/>, "Chicken is easy to get since chickens can't fly.  It's tasty too.");
    findCreation4Real(4);
    setShow(true);
    setBuyTracker(5);
  }
  function selectItem7() {
    setCalc([100,5,10000]);
    setTracker(5);
    showInfo(<SteakTileBig/>, "Steak comes from cows and it tastes pretty good.  Better cook it with onions and peppers for the best flavor.");
    findCreation4Real(5);
    setShow(true);
    setBuyTracker(6);
  }

  function selectItem9() {
      setCalc([10,5,null]);
      setTracker(0);
      showInfo(<WheatTileBig/>, "Wheat can be harvested and baked into a tasty loaf of bread.");
      findCreation4Real(0);
      setShow(true);
      setBuyTracker(7);
  }
  function selectItem10() {
    setCalc([null,null,null]);
    setTracker(69);
    showInfo(<ChocolateTileBig/>, "Chocolate is good for baking cakes and other items.");
    findCreation4Real();
    setShow(false);
    setBuyTracker(8);
  }
  function selectItem11() {
    setCalc([10,5,null]);
      setTracker(1);
      showInfo(<ChocolateDonutTileBig/>, "Chocolate Donuts are the best donuts.");
      findCreation4Real(1);
      setShow(true);
      setBuyTracker(9);
  }
  function selectItem12() {
    setCalc([10,10,5]);
    setTracker(2);
    showInfo(<StrawberryCakeTileBig/>, "Strawberry cake is just like normal cake, but with strawberries in it.");
    findCreation4Real(2);
    setShow(true);
    setBuyTracker(10);
  }

  function selectItem13() {
    setCalc([10,10,5]);
    setTracker(2);
    showInfo(<CinnamonRollTileBig/>, "Cinnamon Rolls are made from bread and cinnamon.");
    findCreation4Real(2);
    setShow(true);
    setBuyTracker(11);
  }

  function selectItem14() {
    setCalc([10,10,5]);
    setTracker(2);
    showInfo(<FishTileBig/>, "Fish swim in rivers and oceans and can be eaten raw or cooked.");
    findCreation4Real(2);
    setShow(true);
    setBuyTracker(12);
  }
  function selectItem15() {
    setCalc([10,10,5]);
    setTracker(2);
    showInfo(<CheeseTileBig/>, "Cheese, the best addition to any good food.");
    findCreation4Real(2);
    setShow(true);
    setBuyTracker(13);
  }

  function book() {
    let flip = !showBook;
    setShowBook(flip);
  }

  function showInfo(x, y) {
    setMainItem(x);
    setItemText(y);
  }

  async function buyResources() {
    await pixel.methods.approve(resourceAddr, pixelBal).send({from: accounts[0]}).then(async()=> {
      await resources.methods.buyResources(buyTracker, amountToBuy).send({from: accounts[0]});
    });
  }



   function findCreation4Real(t) {
    if(t == 0) {
      //await resources.methods.makeHealthPotion(1).send({from: accounts[0]});
      setItem1(<CornTile />); //10
      setItem2(<MushroomTile />); //5
      setItem3(null);
      setCraftReq([10, 5, null]);
      setReqResources([resourceBalances[2], resourceBalances[3],null]);
      //setCalc([[10, 5, null]]);
      //console.log("You created a Health Potion.");
    } else if (t == 1) {
      setItem1(<CornTile />); //10
      setItem2(<BreadTile />); //5
      setItem3(null);
      setCraftReq([10, 5, null]);
      setReqResources([resourceBalances[2], resourceBalances[0],null]);
     // setCalc([[10, 5, null]]);
    } else if (t == 2) {
      setItem1(<CornTile />); //10
      setItem2(<BreadTile />); //10
      setItem3(<StrawberryTile />); //5
      setCraftReq([10, 10, 5]);
      setReqResources([resourceBalances[2], resourceBalances[0],resourceBalances[5]]);
     // setCalc([[10, 10, 5]]);
     } else if (t == 3) {
      setItem1(<ChocolateTile />); //50
      setItem2(<MushroomTile />); //100
      setItem3(<PixelTile />); //2000
      setCraftReq([50, 100, 2000]);
      let bal = pixelBal / DECIMALS;
      setReqResources([resourceBalances[7], resourceBalances[1], bal]);
     // setCalc([[50, 100, 2000]]);
	   } else if (t == 4) {
      setItem1(<ChocolateTile />); //5
      setItem2(<BreadTile />); //10
      setItem3(null);
      setCraftReq([5, 10, null]);
      setReqResources([resourceBalances[7], resourceBalances[0], null]);
    //  setCalc([[5, 10, null]]);
		} else if (t == 5) {
      setItem1(<ChocolateTile />); //100
      setItem2(<SalmonTile />); //5
      setItem3(<PixelTile />); //10_000
      setCraftReq([50, 100, 10000]);
      let bal = pixelBal / DECIMALS;
      setReqResources([resourceBalances[7], resourceBalances[8], bal]);
     // setCalc([[50, 100, 10000]]);
		} else {
      setItem1(null); //100
      setItem2(null); //5
      setItem3(null); //10_000
      setCraftReq([null, null, null]);
      setReqResources([null,null,null]);
      setCalc([null,null,null]);
      setShow(false);
    }
    return;
  }

  function clear() {
    setCraftReq([null,null,null]);
    setCalc([null, null, null]);
    setPair(null);
    setShow(false);
  }

  function calculate() {
    let current = craftReq;
    if (craftReq[2] != null) {
      if(amount == 1) {
        setCalc(current);
      } else if (amount == 5) {
        let a = current[0] * 5;
        let b = current[1] * 5;
        let c = current[2] * 5;
        setCalc([a,b,c]);
      } else if (amount == 20) {
        let a = current[0] * 20;
        let b = current[1] * 20;
        let c = current[2] * 20;
        setCalc([a,b,c]);
      }
    } else {
      if(amount == 1) {
        setCalc(current);
      } else if (amount == 5) {
        let a = current[0] * 5;
        let b = current[1] * 5;
        let c = null;
        setCalc([a,b,c]);
      } else if (amount == 20) {
        let a = current[0] * 20;
        let b = current[1] * 20;
        let c = null;
        setCalc([a,b,c]);
      }
    }

  }

  function switchSlidePagePlus() {
      let now = slidePage + 1;
      setSlidePage(now);
  }

  function switchSlidePageMinus() {
      let now = slidePage - 1;
      setSlidePage(now);
  }

  function changeCraftPage() {
    let now = !craftingPage;
    let a = artifactStylePair[0];
    let b = artifactStylePair[1];
    setCraftingPage(now);
    setArtifactStylePair([b, a]);
  }

  function handleMainPage() {
    let now = !mainPage;
    setMainPage(now);
  }

if(!isMobile) {
  return(
    <div>
      {!mainPage ?
      <div className='Main'>
        <div className="HeaderBar">
          <div className='title'>
          <h1>Pixelland</h1>
          </div>
          <div className='navBar'>
         
            <button className='buttonpic' onClick={handleMainPage} type='button'>Craft</button>
            </div>
            </div>
         
        </div>
 
      : 

      <div className='column'>
      <div className="HeaderBar">
        <div className="column">
      <img className='infoUi'src='Component 26.png'></img>
      <button className='buttonpic' onClick={handleMainPage} type='button'>Home</button>
    </div>
    <div className='mask'>
      <div className='column'>
    <div className='infoUi2'>
      <div className='column columnPicUi'>
        <p>User: Jonny</p>
        <p>Pixel: {pixelBal / DECIMALS}</p>
        </div>

        </div>
        <Popup trigger={<button className='buttonpic' type='button'>Resource Faucet</button>} position="left center">
          {ethBal > 0 ?
          <div className='popupper'>
          <h3>1 per account.</h3>
         <button onClick={faucet} className='buttonpic'>Get Resources and $PIXEL</button>
          </div> 
          
          : 
          
          <div className='popupper'>
                       <h3>You have no testnet BNB.  Please click below to go to the testnet faucet first.</h3>
                       <a href='https://testnet.binance.org/faucet-smart' target='_blank'><button className='buttonpic'>Get BNB</button></a>
                       </div>}

                     </Popup>
    </div>
    </div>
    

      </div>
     
      <div className='App2'>
      <HTMLFlipBook className='Book' disableFlipByClick={true} padding-bottom={200} width={500} height={700}>
      <div id='page 1' className='column'>
      <img className='artifact'src='artifact.png' />
                      <div className='rowOfThree'>
                      <div className='column'> <button className='tilepic' onClick={selectItem} ><BreadTile/></button>
                      {resourceBalances[0]}
                      </div>
                      <div className='column'> <button className='tilepic' onClick={selectItem2} ><CornTile /></button>
                      {resourceBalances[2]}
                      </div>
                      <div className='column'> <button className='tilepic' onClick={selectItem3} ><MushroomTile /></button>
                      {resourceBalances[1]}
                      </div>   
                      <div className='column'><button className='tilepic' onClick={selectItem7} ><SteakTile /></button>
                        {resourceBalances[9]}
                        </div>
  
                        </div>
						<div className='rowOfThree'>
                        <div className='column'><button className='tilepic' onClick={selectItem5} ><SalmonTile/>
						</button>
					            	{resourceBalances[8]}</div>
                        <div className='column'><button className='tilepic' onClick={selectItem10}><ChocolateTile /></button>
						            {resourceBalances[7]}</div>
                        <div className='column'><button className='tilepic' onClick={selectItem4} ><StrawberryTile /></button>
                        {resourceBalances[5]}
                        </div>  
                        <div className='column'><button className='tilepic' onClick={selectItem6} ><ChickenTile/>
                        </button>
                        {resourceBalances[10]}
                        </div>
                         
                      </div>
                      <div className='rowOfThree'>
                        <div className='column'><button  className='tilepic' onClick={selectItem9}><WheatTile/>
                        </button>
                        {resourceBalances[3]}
                        </div>
                        <div className='column'><button className='tilepic' onClick={selectItem11}><ChocolateDonutTile /></button>
                        {resourceBalances[4]}
                        </div>
                        <div className='column'><button className='tilepic'  onClick={selectItem12}><StrawberryCakeTile/></button>
                        {resourceBalances[6]}
                        </div> 
                        <div className='column'><button className='tilepic' onClick={selectItem7}><SteakTile/></button>
                        {0}
                        </div>      
                      </div>
                      <div className='rowOfThree'>
                        <div className='column'><button  className='tilepic'  onClick={selectItem12}><StrawberryCakeTile/>
                        </button>
                        {0}
                        </div>
                        <div className='column'><button className='tilepic' onClick={selectItem13}><CinnamonRollTile /></button>
                        {0}
                        </div>
                        <div className='column'><button className='tilepic' onClick={selectItem14}><FishTile/></button>
                        {0}
                        </div> 
                        <div className='column'><button className='tilepic' onClick={selectItem15}><CheeseTile/></button>
                        {0}
                        </div>      
                      </div>
                      </div>               
      <div id='page 2' className='column'>
        <div className='column'> 
        <button className='tilepicBig' onClick={selectItem} >{mainItem}</button>
        </div>
        <div className='infoBlock column'> 
        <p>{itemText}</p>
      
        </div>
        <Popup trigger={<button className='buttonpic' type='button'>Buy Resource</button>} position="top center">
                     <div className='popupper'>
                       <h3>How many do you want to buy?</h3>
                       {mainItem}
                       <input className='inputSpec'type='text' value={amountToBuy} onChange={handleChange2}></input>
                       <button className='buttonpic' onClick={buyResources}>Submit</button>
                       </div>
                     </Popup>
        </div> 
      <div id='page 3' className='crafting'>
      <img className='artifact'src='crafting.png' />                    
                      <div className='rowOfThree'>
                      <div className='column'> <button className='tilepic' onClick={selectItem} ><BreadTile/></button>
                      {resourceBalances[0]}
                      </div>
                      <div className='column'> <button className='tilepic'  onClick={selectItem2}><CornTile /></button>
                      {resourceBalances[2]}
                      </div>
                      <div className='column'> <button className='tilepic'  onClick={selectItem3}><MushroomTile /></button>
                      {resourceBalances[1]}
                      </div>   
                      <div className='column'><button className='tilepic'  onClick={selectItem7}><SteakTile /></button>
                        {resourceBalances[9]}
                        </div>
  
                        </div>
						<div className='rowOfThree'>
                        <div className='column'><button className='tilepic'   onClick={selectItem5}><SalmonTile/>
						</button>
						{resourceBalances[8]}</div>
                        <div className='column'><button className='tilepic' onClick={selectItem10} ><ChocolateTile /></button>
						{resourceBalances[7]}</div>
                        <div className='column'><button className='tilepic'   onClick={selectItem4}><StrawberryTile /></button>
                        {resourceBalances[5]}
                        </div>  
                        <div className='column'><button className='tilepic'  onClick={selectItem6}><ChickenTile/>
                        </button>
                        {resourceBalances[10]}
                        </div>
                         
                      </div>
                      <div className='rowOfThree'>
                        <div className='column'><button  className='tilepic'  onClick={selectItem9}><WheatTile/>
                        </button>
                        {resourceBalances[3]}
                        </div>
                        <div className='column'><button className='tilepic'  onClick={selectItem11}><ChocolateDonutTile /></button>
                        {resourceBalances[4]}
                        </div>
                        <div className='column'><button className='tilepic'  onClick={selectItem12}><StrawberryCakeTile /></button>
                        {resourceBalances[6]}
                        </div> 
                        <div className='column'><button className='tilepic'  onClick={selectItem7}><SteakTile/></button>
                        {0}
                        </div>      
                      </div>
                      <div className='rowOfThree'>
                        <div className='column'><button  className='tilepic' onClick={selectItem13}><CinnamonRollTile/>
                        </button>
                        {0}
                        </div>
                        <div className='column'><button className='tilepic'  onClick={selectItem14}><FishTile /></button>
                        {0}
                        </div>
                        <div className='column'><button className='tilepic'  onClick={selectItem15}><CheeseTile/></button>
                        {0}
                        </div> 
                        <div className='column'><button className='tilepic'  onClick={selectItem12}><StrawberryCakeTile /></button>
                        {0}
                        </div>      
                      </div>
                
      </div>
      
    <div id='page 4'className='column'>
    <div className='column'> 
        <button className='tilepicBig' >{mainItem}</button>
        </div>
        <div className='infoBlock2 row'> 
        <div className='column'>
        {show ? <h3>Required</h3> : 'Uncraftable.'}
        <div >{item1}{calc[0]}</div>
        <div >{item2}{calc[1]}</div>
        <div >{item3}{calc[2]}</div>
        </div>
        <div className='column'>
        {show ? <h3>Balance</h3> : ''}
        <div >{item1}{reqResources[0]}</div>
        <div >{item2}{reqResources[1]}</div>
        <div >{item3}{reqResources[2]}</div>
        </div>
        <div className='column'>
                      <FormControl>
                       <FormLabel id="demo-controlled-radio-buttons-group"><h2>Amount</h2></FormLabel>
                             <RadioGroup
                             aria-labelledby="demo-controlled-radio-buttons-group"
                             name="controlled-radio-buttons-group"
                             value={amount}
                             onChange={handleChange}
                             >                           
                      <FormControlLabel value="1" control={<Radio />} label="1" />
                      <FormControlLabel value="5" control={<Radio />} label="5" />
                       <FormControlLabel value="20" control={<Radio />} label="20" />
                      </RadioGroup>
                       </FormControl>
                       </div>  
        </div>
     
    <div className='rowOfThree'>
            <button className='buttonpic' onClick={craftItem}>Craft</button>
            <button className='buttonpic' onClick={calculate}>Check</button>
            <button className='buttonpic' onClick={clear}>Clear</button>
						  </div>                                        
    </div>
    </HTMLFlipBook>
    </div>
    </div>

  }

   </div>
  )
} else if (isMobile){
  return (
      <div className="column">
        <div className="HeaderBar">
          <div className='column'>
        <img className='profilePic' src='Component 26.png'></img>
        <button type='buttonpic'onClick={connect}>Connect</button>
        <Popup trigger={<button className='buttonpic' type='button'>Resource Faucet</button>} position="right bottom">
          {ethBal > 0 ?
          <div className='popupper2'>
          <h3>1 per account.</h3>
         <button onClick={faucet} className='buttonpic'>Get Resources and $PIXEL</button>
          </div> 
          
          : 
          
          <div className='popupper2'>
                       <h3>You have no testnet BNB.  Please click below to go to the testnet faucet first.</h3>
                       <a href='https://testnet.binance.org/faucet-smart' target='_blank'><button className='buttonpic'>Get BNB</button></a>
                       </div>}

                     </Popup>
        </div>
      <div className='row infoUi2'>
        <div className='column'>
        <p>User: Jonny</p>
        <p>Pixel: {pixelBal / DECIMALS} </p>
        </div>
      
        <div className='column'> {mainItem}  
        {craftingPage ? 
        

        <Popup trigger={<button className='buttonpic' type='button'>Craft</button>} >
        <div className='popupper'>
        <p>{itemText}</p>
          {mainItem}
          <h3>How many do you want to craft?</h3>
          <div id='page 4'className='column'>
        <div className='infoBlock2 row'> 
        <div className='column'>
        {show ? <h3>Required</h3> : "Uncraftable."}
        <div >{item1}{calc[0]}</div>
        <div >{item2}{calc[1]}</div>
        <div >{item3}{calc[2]}</div>
        </div>
        <div className='column'>
        {show ? <h3>Balance</h3> :  ""}
        <div >{item1}{reqResources[0]}</div>
        <div >{item2}{reqResources[1]}</div>
        <div >{item3}{reqResources[2]}</div>
        </div>
 
        </div>
                                       
    </div>    
          <div className='row'>
                      <FormControl>
                       <FormLabel id="demo-controlled-radio-buttons-group"><h2>Amount</h2></FormLabel>
                             <RadioGroup
                             aria-labelledby="demo-controlled-radio-buttons-group"
                             name="controlled-radio-buttons-group"
                             value={amount}
                             onChange={handleChange}
                             >     
                             <div className='row'>                      
                      <FormControlLabel value="1" control={<Radio />} label="1" />
                      <FormControlLabel value="5" control={<Radio />} label="5" />
                       <FormControlLabel value="20" control={<Radio />} label="20" />
                       </div>
                      </RadioGroup>
                       </FormControl>
                       </div> 
            <div className='rowOfThree'>
            <button className='buttonpic' onClick={craftItem}>Craft</button>
            <button className='buttonpic' onClick={calculate}>Check</button>
            <button className='buttonpic' onClick={clear}>Clear</button>
						  </div>      

          </div>
        </Popup>
        : 
                <Popup trigger={<button className='buttonpic' type='button'>Buy</button>} postion='left center'>
                <div className='popupper'>
                <p>{itemText}</p>
                  {mainItem}
                  <h3>How many do you want to buy?</h3>
                  <input className='inputSpec'type='text' value={amountToBuy} onChange={handleChange2}></input>
                  <button className='buttonpic' onClick={buyResources}>Submit</button>
                  </div>
                </Popup>
        }    
</div>
        </div> 
  
      </div>
      <div className='App2'>
     

      <div id='page 1' className='crafting'>
      <div className='row headerRow'>
     <img onClick={changeCraftPage} className={artifactStylePair[0]} src='artifact.png' />
     <img onClick={changeCraftPage} className={artifactStylePair[1]} src='crafting.png' />
      </div>
 
                      <div className='rowOfThree'>
                      <div className='column'> <button className='tilepic' onClick={selectItem} ><BreadTile/></button>
                      {resourceBalances[0]}
                      </div>
                      <div className='column'> <button className='tilepic' onClick={selectItem2} ><CornTile /></button>
                      {resourceBalances[2]}
                      </div>
                      <div className='column'> <button className='tilepic' onClick={selectItem3} ><MushroomTile /></button>
                      {resourceBalances[1]}
                      </div>   
                      <div className='column'><button className='tilepic' onClick={selectItem7} ><SteakTile /></button>
                        {resourceBalances[9]}
                        </div>
  
                        </div>
						<div className='rowOfThree'>
                        <div className='column'><button className='tilepic' onClick={selectItem5} ><SalmonTile/>
						</button>
					            	{resourceBalances[8]}</div>
                        <div className='column'><button className='tilepic' onClick={selectItem10}><ChocolateTile /></button>
						            {resourceBalances[7]}</div>
                        <div className='column'><button className='tilepic' onClick={selectItem4} ><StrawberryTile /></button>
                        {resourceBalances[5]}
                        </div>  
                        <div className='column'><button className='tilepic' onClick={selectItem6} ><ChickenTile/>
                        </button>
                        {resourceBalances[10]}
                        </div>
                         
                      </div>
                      <div className='rowOfThree'>
                        <div className='column'><button  className='tilepic' onClick={selectItem9}><WheatTile/>
                        </button>
                        {resourceBalances[3]}
                        </div>
                        <div className='column'><button className='tilepic' onClick={selectItem11}><ChocolateDonutTile /></button>
                        {resourceBalances[4]}
                        </div>
                        <div className='column'><button className='tilepic' ><StrawberryCakeTile onClick={selectItem12}/></button>
                        {resourceBalances[6]}
                        </div> 
                        <div className='column'><button className='tilepic' onClick={selectItem7} ><SteakTile/></button>
                        {0}
                        </div>      
                      </div>
                      <div className='rowOfThree'>
                        <div className='column'><button  className='tilepic' onClick={selectItem13} ><CinnamonRollTile/>
                        </button>
                        {0}
                        </div>
                        <div className='column'><button className='tilepic' onClick={selectItem14}><FishTile /></button>
                        {0}
                        </div>
                        <div className='column'><button className='tilepic' onClick={selectItem15}><CheeseTile/></button>
                        {0}
                        </div> 
                        <div className='column'><button className='tilepic' ><Tile/></button>
                        {0}
                        </div>      
                      </div>
                      </div>               
      <div id='page 2' className='crafting'>
   
               
                      <div className='rowOfThree'>
                      <div className='column'> <button className='tilepic' onClick={selectItem} ><BreadTile/></button>
                      {resourceBalances[0]}
                      </div>
                      <div className='column'> <button className='tilepic'  onClick={selectItem2}><CornTile /></button>
                      {resourceBalances[2]}
                      </div>
                      <div className='column'> <button className='tilepic'  onClick={selectItem3}><MushroomTile /></button>
                      {resourceBalances[1]}
                      </div>   
                      <div className='column'><button className='tilepic'  onClick={selectItem7}><SteakTile /></button>
                        {resourceBalances[9]}
                        </div>
  
                        </div>
						<div className='rowOfThree'>
                        <div className='column'><button className='tilepic'   onClick={selectItem5}><SalmonTile/>
						</button>
						{resourceBalances[8]}</div>
                        <div className='column'><button className='tilepic' onClick={selectItem10} ><ChocolateTile /></button>
						{resourceBalances[7]}</div>
                        <div className='column'><button className='tilepic'   onClick={selectItem4}><StrawberryTile /></button>
                        {resourceBalances[5]}
                        </div>  
                        <div className='column'><button className='tilepic'  onClick={selectItem6}><ChickenTile/>
                        </button>
                        {resourceBalances[10]}
                        </div>
                         
                      </div>
                      <div className='rowOfThree'>
                        <div className='column'><button  className='tilepic'  onClick={selectItem9}><WheatTile/>
                        </button>
                        {resourceBalances[3]}
                        </div>
                        <div className='column'><button className='tilepic'  onClick={selectItem11}><ChocolateDonutTile /></button>
                        {resourceBalances[4]}
                        </div>
                        <div className='column'><button className='tilepic'  onClick={selectItem12}><StrawberryCakeTile /></button>
                        {resourceBalances[6]}
                        </div> 
                        <div className='column'><button className='tilepic'  onClick={selectItem7}><SteakTile/></button>
                        {0}
                        </div>      
                      </div>
                      <div className='rowOfThree'>
                        <div className='column'><button  className='tilepic'  onClick={selectItem13}><CinnamonRollTile/>
                        </button>
                        {0}
                        </div>
                        <div className='column'><button className='tilepic'  onClick={selectItem14}><FishTile /></button>
                        {0}
                        </div>
                        <div className='column'><button className='tilepic'  onClick={selectItem15}><CheeseTile/></button>
                        {0}
                        </div> 
                        <div className='column'><button className='tilepic'  onClick={selectItem}><Tile/></button>
                        {0}
                        </div>      
                      </div>
                
      </div>
    </div>

    </div>
   
  )
}
}


export default App;
