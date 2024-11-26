const express = require("express");
const router = express.Router();
const deployController = require("../Controllers/deployController");

router.post("/deploy", deployController.deployContract);
console.log("11111111111111111111111");

module.exports = router;
