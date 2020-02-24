var donations = artifacts.require("./donations.sol");

contract("donations", function(accounts) {
  it("contract is up and running", function() {
    return donations.deployed().then(function(instance) {

    }).then(function() {
    });
  });


});
