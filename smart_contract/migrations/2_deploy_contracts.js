const SmartContract = artifacts.require("SmartContract");
const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

console.log("Loaded MongoDB URI:", process.env.MONGO_URI);

// const Web3 = require("web3");
// const web3 = new Web3("http://127.0.0.1:8545"); 

const reqmodels = require("../../server/Models/reqModel");
const users = require("../../server/Models/userModel");
const items = require("../../server/Models/itemModel");

module.exports = async function (deployer) {

    try {
        // const response = await axios.get("http://localhost:5000/api/contracts");
        // const contractData = response.data;
        
        if (!mongoURI) {
            throw new Error("MongoDB URI is not defined. Check your .env file.");
        }
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        });
        /*
        await mongoose.connect("mongodb+srv://Chat:1234@cluster0.vcpbx.mongodb.net/Chat?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 서버 선택 타임아웃 30초로 설정
        });
        */

        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully.");
        });
        
        mongoose.connection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log("MongoDB disconnected.");
        });
        

        const krwtoether = (krwAmount) => krwAmount / 400;

        // 아이템 찾기
        const itemID = "1732431629264";
        const itemData = await items.findOne({ itemID });
        if (!itemData) {
            console.error(`Item not found: ${itemID}`);
            throw new Error(`No item found for itemID: ${itemID}`);
        }
        console.log("Item Data:", itemData);
        
        // 거래 정보 찾기
        const reqData = await reqmodels.findOne({ itemID });
        if (!reqData) {
            console.error(`Request not found for itemID: ${itemID}`);
            throw new Error(`No request found for itemID: ${itemID}`);
        }
        console.log("Request Data:", reqData);

        // 임차인 찾기
        const tenantID = reqData.senderId;
        const tenantData = await users.findOne({ _id : tenantID });
        if (!tenantData) {
            console.error(`Tenant not found: ${tenantID}`);
            throw new Error(`No user found for tenantID: ${tenantID}`);
        }
        console.log("Tenant Data:", tenantData);

        // 임대인 찾기
        const lessorID = reqData.ownerId;
        const lessorData = await users.findOne({ _id : lessorID });
        if (!lessorData) {
            console.error(`Lessor not found: ${lessorID}`);
            throw new Error(`No user found for lessorID: ${lessorID}`);
        }
        console.log("Lessor Data:", lessorData);

        // 임대인 identityNumber 생성
        const lessorIdentityNumber = `${lessorData.birth}-${lessorData.identityNum}`;

        // 임차인 identityNumber 생성
        const tenantIdentityNumber = `${tenantData.birth}-${tenantData.identityNum}`;

        // 1. 임대인 정보
        const lessor = {
            name: lessorData._id,
            phoneNumber: lessorData.phoneNumber,
            identityNumber: lessorIdentityNumber,
            addr: lessorData.metaMaskAdd,
        };
        
        // 2. 임차인 정보
        const tenant = {
            name : tenantData._id,
            phoneNumber : tenantData.phoneNumber,
            identityNumber : tenantIdentityNumber,
            addr: tenantData.metaMaskAdd,
        };

        // 3. 임대인 은행 정보
        const lessorBankDetails = {
            ownerName: lessorData.name,
            bankName: "First Bank",
            account: lessorData.account,
        };

        // 4. 임차인 은행 정보
        const tenantBankDetails = {
            ownerName: tenantData.name,
            bankName: "Second Bank",
            account: tenantData.account,
        };

        // 5. 렌탈 정보
        const rentalDetails = {
            houseID: itemID,
            deposit: web3.utils.toWei(krwtoether(itemData.deposit).toString(), "ether"), // 보증금
            cost: web3.utils.toWei(krwtoether(itemData.housePrice).toString(), "ether"), // 월세
            startDate: Math.floor(reqData.start / 1000), // 현재 시간
            period: reqData.period, // 1년 계약 (365일)
            endDate: Math.floor(reqData.end / 1000), // 종료 날짜 (초 단위)
            status: 0, // ContractStatus.Pending
        };

        // 6. 배포
        await deployer.deploy(SmartContract, lessor, tenant, lessorBankDetails, tenantBankDetails, rentalDetails);
        console.log(`SmartContract deployed successfully for houseID: ${itemID}`);
    } catch (error) {
        console.error("Error fetching or deploying contracts:", error);
    } finally {
        mongoose.connection.close();
    }
};
