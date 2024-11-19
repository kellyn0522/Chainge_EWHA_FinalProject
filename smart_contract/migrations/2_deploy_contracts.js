const SmartContract = artifacts.require("SmartContract");

module.exports = function (deployer) {
    // 1. 임대인 정보
    const lessor = {
        name: "John Doe",
        phoneNumber: "010-1234-5678",
        identityNumber: "123456-7890123",
        addr: "0x44e2AfFCFAD498c14eBd1C042d9B2c72A0dF8BF5", // Ganache 첫 번째 계정
    };

    // 2. 임차인 정보
    const tenant = {
        name: "Jane Smith",
        phoneNumber: "010-9876-5432",
        identityNumber: "987654-3210987",
        addr: "0x8230197520ebbe69624a7eeacca70129e37f2b4b", // Ganache 두 번째 계정
    };

    // 3. 임대인 은행 정보
    const lessorBankDetails = {
        ownerName: "John Doe",
        bankName: "First Bank",
        account: "123-4567-8901",
    };

    // 4. 임차인 은행 정보
    const tenantBankDetails = {
        ownerName: "Jane Smith",
        bankName: "Second Bank",
        account: "987-6543-2109",
    };

    // 5. 렌탈 정보
    const rentalDetails = {
        houseID: "12345",
        deposit: web3.utils.toWei("1", "ether"), // 1 ETH 보증금
        cost: web3.utils.toWei("0.1", "ether"), // 0.1 ETH 월세
        startDate: Math.floor(Date.now() / 1000), // 현재 시간
        period: 365, // 1년 계약 (365일)
        endDate: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1년 후 종료
        status: 0, // ContractStatus.Pending
    };

    // 6. 전자 서명 정보
    const signature = {
        signer: "0x8230197520ebbe69624a7eeacca70129e37f2b4b", // 임차인 주소
        messageHash: web3.utils.keccak256("Sample Message"),
        signature: "0x",
    };

    // 7. 배포
    deployer.deploy(SmartContract, lessor, tenant, lessorBankDetails, tenantBankDetails, rentalDetails, signature);
};
