const express = require("express");
const {createReq, findUserSendReq, findUserReceivedReq, findReq} = require("../Controllers/reqController");
const router = express.Router();

router.post("/", createReq);
router.get("/s/:userId", findUserSendReq);
router.get("/r/:userId", findUserReceivedReq);
router.get("/find/:reqId", findReq);

module.exports = router;