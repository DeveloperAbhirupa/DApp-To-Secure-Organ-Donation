pragma solidity 0.5.16;

contract donations {
  //Read/write donor

  event createDonor(string name, uint did, string msg);

  struct donor{
    string donor;//Donor name;
    uint donor_id; // random generated hashcode (String unique id)
    uint organ_id;//random generated hashcode (String unique id)
    string organ; //Type of organ
    string bg; //Donor blood group
    uint status; //(not yet donted-0/only donated-1/implanted-2)
    address hosp_id;  //random generated hashcode (String unique id)
  }

  donor[] public donorArray;

  /**In Solidity, functions are public by default. This means anyone (or any other contract) can call your contract's function and execute its code.
  Obviously this isn't always desirable, and can make your contract vulnerable to attacks.
  Thus it's good practice to mark your functions as private by default, and then only make public the
  functions you want to expose to the world.**/

  function _initDonor(string memory _donor, string memory _organ, string memory _bg , uint _status) private
  {
    //Note: Memory keyword denotes call by value for String
    uint did = _generateRandomID(_donor);
    uint oid = _generateRandomID(_organ);
    uint length = donorArray.push(donor(_donor, did, oid,_organ,_bg,_status, msg.sender))- 1;
    string memory msg = "Donor has been succesfully created.";
    emit createDonor(_donor, did, msg);

  }

  //keccak256 isnt a totally secure approach, anything else? Think later.

  function _generateRandomID(string memory _str) private view returns (uint) {
      uint rand = uint(keccak256(abi.encodePacked(_str)));
      return rand % 10;
   }

   //We are going to set the ownership of the organ to the hospital the current hospital or associated donation bank

  //Module wise division:
  /**1. Hospital requests for creation of a block of data
     2. Continuosly track the data and update the location
     3. Update status.
     4. Receiving hospital search for suited donor and update status.**/
}
