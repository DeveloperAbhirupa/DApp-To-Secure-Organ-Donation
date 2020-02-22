pragma solidity 0.5.16;

contract donations {
  //Read/write donor


  //Constructor
  constructor () public{
    donor="Donor 1";

  }

  struct donor{
    string public donor;//Donor name;
    string donor_id; // random generated hashcode (String unique id)
    string organ_id;//random generated hashcode (String unique id)
    string organ; //Type of organ
    string bg; //Donor blood group
    uint status; //(not yet donted-0/only donated-1/implanted-2)
    uint hosp_id;  //random generated hashcode (String unique id)
  }

  function init_donor(string memory _donor, string memory _organ, string memory _bg, uint status, uint hosp_id ) public
  {
    //Note: Memory keyword denotes call by value for String
  }


  //Module wise division:
  /**1. Hospital requests for creation of a block of data
     2. Continuosly track the data and update the location
     3. Update status.
     4. Receiving hospital search for suited donor and update status.**/
}
