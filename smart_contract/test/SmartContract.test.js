const SmartContract = artifacts.require("SmartContract");

contract("SmartContract", (accounts) => {
  let contractInstance;
  
  const lessorAddress = accounts[0];
  const tenantAddress = accounts[1];

  beforeEach(async () => {

    const lessorInfo = {
        name : "Alice",
        phoneNumber : "010-1234-5678",
        identityNumber : "900101-1234567",
        addr : lessorAddress                   // 임대인의 이더리움 주소 (accounts[0]에서 가져옴)
      };
    
      const tenantInfo = {
        name : "Bob",
        phoneNumber : "010-5678-1234",
        identityNumber : "900201-1234567",
        addr : tenantAddress                   // 임차인의 이더리움 주소 (accounts[1]에서 가져옴)
      };
    
      const rentalDetails = {
        houseID : "gaeun",
        deposit : web3.utils.toWei("1", "ether"),
        cost : web3.utils.toWei("0.1", "ether"),
        startDate : 0,
        period : 365 * 24 * 60 * 60,
        endDate : 0,
        status : 0
      };

      const messageHash = web3.utils.keccak256("Sign Contract");
      const signature = await web3.eth.sign(messageHash, tenantAddress);

      const contractSignature = {
        signer : tenantAddress,
        messageHash : messageHash,
        signature : signature
      };

    contractInstance = await SmartContract.new(
        lessorInfo,
        tenantInfo,
        rentalDetails,
        contractSignature,
        { from: lessorAddress }
      );

    await contractInstance.activateContract({ from : lessorAddress });

    await contractInstance.setContractSignedDate(Math.floor(Date.now() / 1000), { from: lessorAddress });
    
    });

  it("should initialize the contract with correct lessor and tenant", async () => {
    const storedLessor = await contractInstance.lessor();
    assert.equal(storedLessor.addr, lessorAddress, "Lessor address is incorrect");

    const storedTenant = await contractInstance.tenant();
    assert.equal(storedTenant.addr, tenantAddress, "Tenant address is incorrect");
  });

  it("should allow tenant to pay the deposit", async () => {
    const depositAmount = web3.utils.toWei("1", "ether");

    await contractInstance.payDeposit({ from: tenantAddress, value: depositAmount });
    
    const depositPaid = await contractInstance.depositPaid();
    assert.isTrue(depositPaid, "Deposit should be marked as paid");
  });


  it("should allow tenant to pay rent and mark as late if overdue", async () => {
    const rentAmount = web3.utils.toWei("0.1", "ether");

    await contractInstance.payRent({ from: tenantAddress, value: rentAmount });

    const isLate = await contractInstance.isRentLate();
    assert.isFalse(isLate, "Rent should not be marked as late if on time");

  });
/*
// 전자서명 불가능 
  it("should allow tenant to sign the contract", async () => {

    const message = "Sign Contract";
    const prefixedMessage = "\x19Ethereum Signed Message:\n" + message.length + message;
    const messageHash = web3.utils.keccak256(prefixedMessage);

    const signature = await web3.eth.sign(messageHash, tenantAddress);

    await contractInstance.signContract(messageHash, signature, { from: tenantAddress });

    const status = await contractInstance.rentalDetails.status();
    assert.equal(status.toNumber(), 1, "Contract should be active after signing");
  });


it("should allow lessor to approve termination and refund deposit", async () => {
    // 계약을 Active 상태로 설정
    // await contractInstance.activateContract({ from: lessorAddress });

    // 계약 종료 날짜를 과거로 설정하여 조건 충족
    const pastEndDate = Math.floor(Date.now() / 1000) - 10;
    await contractInstance.setEndDate2(pastEndDate, { from: lessorAddress });

    // 임차인이 계약 종료 요청
    await contractInstance.requestTermination({ from: tenantAddress });

    // 임대인이 계약 종료 및 보증금 반환 승인
    await contractInstance.isRentLate();
    const agreementReached = true;
    await contractInstance.approveTermination(agreementReached, { from: lessorAddress });

    // 계약이 종료되었는지 확인
    const finalStatus = await contractInstance.getStatus();
    assert.equal(finalStatus.toNumber(), 2, "Contract should be marked as terminated");
});





  it("should finalize the contract and transfer remaining balance to lessor", async () => {
    await contractInstance.finalizeContract({ from: lessorAddress });

    const isFinalized = await contractInstance.isFinalized();
    assert.isTrue(isFinalized, "Contract should be finalized");
  }); */
});
