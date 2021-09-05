var VaxProtocol = artifacts.require("./VaxProtocol.sol");

module.exports = function(deployer) {
  deployer.deploy(VaxProtocol);
};
