import Web3 from "web3";

const addAVAX = () => {

    window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
        chainId: '0xA86A',
        chainName: 'Avalanche C-chain',
        nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18
        },
        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://snowtrace.io']
        }]
        })
        .catch((error) => {
        console.log(error)
        }) 
    
    }
    
    export default addAVAX;