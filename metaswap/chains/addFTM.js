
const addFTM = () => {

    window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
        chainId: '0xFA',
        chainName: 'Fantom Opera',
        nativeCurrency: {
            name: 'FANTOM',
            symbol: 'FTM',
            decimals: 18
        },
        rpcUrls: ['https://rpc.ftm.tools'],
        blockExplorerUrls: ['https://ftmscan.com']
        }]
        })
        .catch((error) => {
        console.log(error)
        }) 
    
    }
    
    export default addFTM;