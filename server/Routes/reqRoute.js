const express = require("express");
const {createReq, findUserSendReq, findUserReceivedReq, findReq, acceptReq, deleteReq} = require("../Controllers/reqController");
const router = express.Router();

router.post("/", createReq);
router.get("/s/:userId", findUserSendReq);
router.get("/r/:userId", findUserReceivedReq);
router.get("/find/:reqId", findReq);
router.post("/update/:reqID", acceptReq);
router.delete("/delete/:reqID", deleteReq);

module.exports = router;