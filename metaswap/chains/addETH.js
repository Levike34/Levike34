import Web3 from "web3";


const addETH = async() => {

    try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x1',
                  chainName: 'Ethereum Mainnet',
                  rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'] /* ... */,
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
    }
}

export default addETH;