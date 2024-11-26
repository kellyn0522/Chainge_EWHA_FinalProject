const express = require("express");
const {createReq, findUserSendReq, findUserReceivedReq, findReq, acceptReq, deleteReq, doTenantSign, doLandlordSign, setReqContract, getRequsetByItem} = require("../Controllers/reqController");
const router = express.Router();

router.post("/", createReq);
router.get("/s/:userId", findUserSendReq);
router.get("/r/:userId", findUserReceivedReq);
router.get("/find/:reqId", findReq);
router.get("/getRequestByItem/:itemID", getRequsetByItem);
router.post("/update/:reqID", acceptReq);
router.post("/tSign/:reqID", doTenantSign);
router.post("/lSign/:reqID", doLandlordSign);
router.post("/contract", setReqContract);
router.delete("/delete/:reqID", deleteReq);

module.exports = router;