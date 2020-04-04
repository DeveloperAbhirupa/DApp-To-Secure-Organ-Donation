const BigchainDB = require('bigchaindb-driver')

const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)
console.log("bigdb")
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
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_fName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      }
    ],
    "name": "setInstructor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_donor",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_organ",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_bg",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_status",
        "type": "uint256"
      }
    ],
    "name": "initDonor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]



//fetch data from frontend
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
        App.account = "0x841d7Ae343694941Fb68B9b8dC3EB0dF289FD8cC";
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
      web3.eth.defaultAccount = web3.eth.accounts[1];
      balance = web3.eth.getBalance("0x841d7Ae343694941Fb68B9b8dC3EB0dF289FD8cC");
      console.log("Balance:"+balance)


      var contractaddress = "0x0f42c50a89162AB87716e2c7B49a50e4E8AcBde3";
      var myAbi = web3.eth.contract(abi);
      var myfunction = myAbi.at(contractaddress);
      console.log(myfunction)




      // Instantiate myContract



      //Send data to smart contract on click
      $("#submitbtn"). click(function(){

        console.log("Button clicked");

        //Create an asset for bigchaindb
        var min=20000;
        var max=99999;
        var name = $("#name").val();
        var did=Math.random()*(max-min)+min;
        var organ = $("#organ").val();
        var oid=Math.random()*(max-min)+min;
        var bg = $("#bg").val();
        var hosp = $("#hospital").val();
        var status = $("#status").val();
        donationsInstance.initDonor(name,did,organ,oid,bg,hosp,status);

        /**Create const here
        const asset_organ = {
            A_name:name,
            A_did:did,
            A_organ:organ,
            A_oid:oid,
            A_bg:bg,
            A_hosp:hosp,
            A_status:status
          }
        //Const asset created.......**/

        alert("New Block created. Transaction Entered."+"\nDonor ID:"+did);
        location.reload(true);
      }

      );
      console.log("Still works")

      //Create a transaction on BigchainDB
      function createAsset() {
        // Construct a transaction payload
        const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
          // Asset field
          {
              asset_organ,
          },
          // Metadata field, contains information about the transaction itself (can be `null` if not needed)
          {
            datetime: new Date().toString(),
              location: 'India',
              value: {
                  value_eur: 'null',
                  value_btc: 'null',
              }
          },
          // Output. For this case we create a simple Ed25519 condition
          [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction.makeEd25519Condition(donor.publicKey))],
          // Issuers
          donor.publicKey
        )
        // The owner of the painting signs the transaction
        const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint,donor.privateKey)
        // Send the transaction off to BigchainDB
        conn.postTransactionCommit(txSigned).then(res => {
            txid = assetCreateTxSigned.id
            console.log("Transaction id:",txid)
            document.body.innerHTML += '<h3>Transaction created</h3>';
            document.body.innerHTML += txSigned.id
            // txSigned.id corresponds to the asset id of the painting
        })
      }

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
