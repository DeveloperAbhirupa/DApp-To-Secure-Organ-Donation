var donations = artifacts.require("./donations.sol");
module.exports=function(deployer){
  deployer.deploy(donations);
}
