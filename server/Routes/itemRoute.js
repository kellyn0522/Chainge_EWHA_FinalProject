const express = require("express");
const router = express.Router();
const {registerItem, findItem, getItems } = require("../Controllers/itemController");

router.post("/createItem", registerItem);
router.get("/find/:itemId", findItem);
router.get("/", getItems);

module.exports = router;