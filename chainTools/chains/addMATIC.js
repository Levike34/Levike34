import Web3 from "web3";


const addMATIC = () => {

    window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
        chainId: '0x89',
        chainName: 'Polygon',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
        }]
        })
        .catch((error) => {
        console.log(error)
        }) 
    
    }
    
    export default addMATIC;