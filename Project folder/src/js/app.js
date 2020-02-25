abi=[
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "did",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "msg",
        "type": "string"
      }
    ],
    "name": "createDonor",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "donorArray",
    "outputs": [
      {
        "internalType": "string",
        "name": "donr",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "donor_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "organ_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "organ",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "bg",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "status",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "hosp_id",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]




//fetch data from frontend


var cryptoZombies

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },
/**Set up web3: web3.js is a javascript library that allows our client-side application
to talk to the blockchain. We configure web3 inside the "initWeb3" function.**/

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("donations.json", function(donations) {    //----------------------> NOTE THIS PART CHANGED!!!
      // Instantiate a new truffle contract from the artifact
      App.contracts.donations = TruffleContract(donations);
      // Connect provider to interact with contract
      App.contracts.donations.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var donationsInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.donations.deployed().then(function(instance) {
      donationsInstance = instance;
      return donationsInstance.length;
    }).then(function(l) {
      var info = $("#info");

      info.empty();
      var data="Length:"+l;
      info.append(data);
      loader.hide();
      content.show();


      //Code goes in here
      //Now we are going to create transactions, for this we require a transaction object
      var contractAddress = "0xAC6aE32a28e98eF7726212B9962bc7F4d51b4b2a";
      txobj = new web3.eth.contract(abi, contractAddress);
      console.log(txobj);

      //Send data to smart contract on click
      $("#submitbtn"). click(function(){
        console.log("Button clicked");
        var name = $("#name").val();
        var organ = $("#organ").val();
        var bg = $("#bg").val();
        var status = $("#status").val();
        console.log(txobj);
        txobj.methods._initDonor(name, organ, bg ,status).send();
        //txobj.methods
      }

      );
      //Code ends






    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
