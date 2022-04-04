const Migrations = artifacts.require('Migrations');
const SsafyNFT = artifacts.require('SsafyNFT');
const SaleArtToken = artifacts.require('SaleArtToken');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SsafyNFT);
  deployer.deploy(SaleArtToken);
};
