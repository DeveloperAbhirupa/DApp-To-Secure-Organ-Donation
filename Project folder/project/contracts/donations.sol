pragma solidity 0.5.16;
contract donations {
//  event createDonor(string name, uint did, string msg);
  struct donor{
    string donr;//Donor name;
    uint donor_id; // random generated hashcode (String unique id)
    uint organ_id;//random generated hashcode (String unique id)
    string organ; //Type of organ
    string bg; //Donor blood group
    uint status; //(not yet donted-0/only donated-1/implanted-2)
    uint hosp_id;  //random generated hashcode (String unique id)
  }
  uint length;
  donor[] public donorArray;
  constructor() public{
    length=0;
  }
  function initDonor(string memory _donor, uint _did ,string memory _organ, uint _oid, string memory _bg , uint _hosp, uint _status) public
  {
    //Note: Memory keyword denotes call by value for String
    //uint did = _generateRandomID(_donor);
    //uint oid = _generateRandomID(_organ);

    length = donorArray.push(donor(_donor, _did, _oid,_organ,_bg,_status, _hosp))- 1;
    string memory msg = "Donor has been succesfully created.";
    //emit createDonor(_donor, did, msg);

  }
  function _generateRandomID(string memory _str) private view returns (uint) {
      uint rand = uint(keccak256(abi.encodePacked(_str)));
      return rand % 10;
   }
}
