const SmartContract = artifacts.require("SmartContract");
const axios = require("axios");

module.exports = async function (deployer) {

    try {
        // 거래 번호 (ID)
        const contractID = "6742bbbea98d722cf1f3b36f";
        console.log("Contract Num:", contractID);
        
        // 거래 정보 찾기
        const contractData = await fetchContractData(contractID);
        console.log("Fetched contract data:", contractData);

        // 아이템 찾기
        const itemData = await fetchItemData(contractData.itemId);
        console.log("Item Data:", itemData);

        // 임차인 찾기 
        const tenantData = await fetchUserData(contractData.senderId);
        console.log("Tenant Data:", tenantData);

        // 임대인 찾기
        const lessorData = await fetchUserData(contractData.ownerId);
        console.log("Lessor Data:", lessorData);

        // 환율 변환 
        const krwtoether = (krwAmount) => (krwAmount / 400).toFixed(18);

        // 스마트 컨트랙트에 전달할 데이터 구성
        const lessor = createPerson(lessorData, "0x44e2AfFCFAD498c14eBd1C042d9B2c72A0dF8BF5");
        const tenant = createPerson(tenantData, "0x8230197520ebbe69624a7eeacca70129e37f2b4b");
        const lessorBankDetails = createBankDetails(lessorData, "First Bank");
        const tenantBankDetails = createBankDetails(tenantData, "Second Bank");
        const rentalDetails = createRentalDetails(contractData, itemData, krwtoether);

        await deployer.deploy(SmartContract, lessor, tenant, lessorBankDetails, tenantBankDetails, rentalDetails);
        console.log(`SmartContract deployed successfully for houseID: ${contractData.itemId}`);
    } catch (error) {
        console.error("Error fetching or deploying contracts:", error);
    }
};

// 거래 데이터 가져오기
async function fetchContractData(contractID) {
    return await fetchDataFromAPI(`/itemReq/find/${contractID}`, "contract data");
};

// 아이템 데이터 가져오기
async function fetchItemData(itemID) {
    return await fetchDataFromAPI(`/items/find/${itemID}`, "item data");
}

// 사용자 데이터 가져오기
async function fetchUserData(userID) {
    return await fetchDataFromAPI(`/users/find/${userID}`, "user data");
}

// API 호출 유틸리티 함수
async function fetchDataFromAPI(endpoint, dataType) {
    const BASE_URL = "http://localhost:5000/api"; // API 서버 URL
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch ${dataType} from ${endpoint}: ${error.message}`);
    }
}

// Person 객체 생성
function createPerson(userData, metamaskAdd) {
    return {
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        identityNumber: `${userData.birth}-${userData.identityNum}`,
        addr: metamaskAdd,
    };
}

// BankDetails 객체 생성
function createBankDetails(userData, bankName) {
    return {
        ownerName: userData.name,
        bankName: bankName,
        account: userData.account,
    };
}

// RentalDetails 객체 생성
function createRentalDetails(contractData, itemData, krwToEther) {
    const startDate = Math.floor(new Date(contractData.start).getTime() / 1000); // 시작일
    const endDate = Math.floor(new Date(contractData.end).getTime() / 1000); // 종료일

    return {
        houseID: contractData.itemId,
        deposit: web3.utils.toWei(krwToEther(itemData.deposit), "ether"),
        cost: web3.utils.toWei(krwToEther(itemData.housePrice), "ether"),
        startDate: startDate,
        period: contractData.period,
        endDate: endDate,
        status: 0, // ContractStatus.Pending
    };
}

