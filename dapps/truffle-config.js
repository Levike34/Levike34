const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");
const mnemonic = "SECRET";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ropsten:{
      provider: function() {
      return new HDWalletProvider(mnemonic,
      "https://ropsten.infura.io/v3/524e1ad6272c40c786d17fd365a2c8b6")
      },
      network_id: 3
    },
  },
  compilers:{ 
    solc: { 
      version: "^0.8.0",
      optimizer: { 
    enabled: true, 
    runs: 200,
    }}}
};
