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
      "https://ropsten.infura.io/v3/1efd3762721044d880f2cf78a782d08e")
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

