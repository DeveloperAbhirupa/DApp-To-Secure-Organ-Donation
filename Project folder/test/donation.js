var donations=artifacts.require("../contracts/donations.sol");

contract ("donations", function(accounts){
  var donationsInstance;
  it("Contract is up and running", function() {
    return donations.deployed().then(function(instance) {

    }).then(function() {
    });
  });
})
