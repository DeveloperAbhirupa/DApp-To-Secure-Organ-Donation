var $=require('jquery');
$('#test').text('browserify working');

const db= require('bigchaindb-driver')
console.log(db)
console.log("BCDB pretty much working :)")

var min=20000;
var max=99999;
$("#submitbtn"). click(function(){
    console.log("Button clicked");
    //Create an asset for bigchaindb
    var name = $("#name").val();
    var did=Math.random()*(max-min)+min;
    var organ = $("#organ").val();
    var oid=Math.random()*(max-min)+min;
    var bg = $("#bg").val();
    var hosp = $("#hospital").val();
    var status = $("#status").val();
    alert("New Block created. Transaction Entered."+"\nDonor ID:"+did);
    location.reload(true);
});
