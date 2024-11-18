const SmartContract = artifacts.require("SmartContract");

module.exports = function (deployer) {
  // 임의의 데이터 추가
  const lessorInfo = {
    name : "Alice",
    phoneNumber : "010-1234-5678",
    identityNumber : "900101-1234567",
    zipCode : "12345",
    houseAddress : "St.123",
    email : "alice@chainge.ac.kr",
    addr : lessor                   // 임대인의 이더리움 주소 (accounts[0]에서 가져옴)
  };

  const tenantInfo = {
    name : "Bob",
    phoneNumber : "010-5678-1234",
    identityNumber : "900201-1234567",
    zipCode : "54321",
    houseAddress : "St.456",
    email : "bob@chainge.ac.kr",
    addr : tenant                   // 임차인의 이더리움 주소 (accounts[1]에서 가져옴)
  };

  const listingDetails = {
    ownerName : "Alice",
    zipCode : "13579",
    houseAddress : "St.789",
    area : 100
  };

  const lessorBankDetails = {
    ownerName : "Alice",
    bankName : "Bank A",
    account : "1-2-3"
  };

  const tenantBankDetails = {
    ownerName : "Bob",
    backName : "Bank B",
    account : "4-5-6"
  };

  const rentalDetails = {
    deposit : web3.utils.toWei("1", "ether"),
    cost : web3.utils.toWei("0.1", "ether"),
    startDate : Math.floor(Date.now() / 1000),
    period : 365 * 24 * 60 * 60,
    endDate : 0,
    status : 0
  };

  const houseDetails = {
    hasBed : true,
    bedSize : "Queen",
    hasWasher : true,
    hasDryer : true,
    hasTV : true,
    hasAirConditioner : true,
    hasHeater : true,
    hasBlind : true,
    hasRefrigerator : true,
    hasMicrowave : true
  };

  // deployer.deploy(SmartContract, lessorInfo, tenantInfo, listingDetails, lessorBankDetails, tenantBankDetails, rentalDetails, houseDetails);
};
