import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


const getWeb3dos = async () => {
        
const providerOptions = {
 
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
             56: `https://bsc-dataseed.binance.org/`, // required
             97: `https://data-seed-prebsc-1-s1.binance.org:8545`
          },
        }
      }
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

const provider = await web3Modal.connect();

const web3 = new Web3(provider);
return web3;
}

export default getWeb3dos;