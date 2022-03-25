const Migrations = artifacts.require('Migrations');
const SsafyNFT = artifacts.require('SsafyNFT');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SsafyNFT);
};
