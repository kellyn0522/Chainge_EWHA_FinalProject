const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// 계약 스키마 정의
const contractSchema = new mongoose.Schema({
    itemID: String,
    tenantID: String,
    tenantphoneNum: String,
    tenantBirth: String,
    tenantidentityNum: String,
    price: Number,
    deposit: Number,
});

const Contract = mongoose.model("Contract", contractSchema);

// 계약 데이터를 저장하는 엔드포인트
router.post("/", async (req, res) => {
    const newContract = new Contract(req.body);
    try {
        await newContract.save();
        res.status(200).json({ message: "Contract saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving contract", error });
    }
});

// 저장된 계약 데이터를 불러오는 엔드포인트
router.get("/", async (req, res) => {
    try {
        const contracts = await Contract.find();
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contracts", error });
    }
});

module.exports = router;
