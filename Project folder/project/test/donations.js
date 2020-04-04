var donations = artifacts.require("./donations.sol");

contract("donations", function(accounts) {
  it("Contract is up and running. Initial length is 0", function() {
    return donations.deployed().then(function(instance) {
      return donations.length;
    }).then(function(l) {
       assert.equal(l, 0, "Works");
    });
  });


});
