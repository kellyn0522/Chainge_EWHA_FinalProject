const express = require("express");
const router = express.Router();
const {registerUser, loginUser, findUser, getUsers, updateUser, deleteUser, updateLike, accountUpdate, metaMaskUpdate} = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.post("/update", updateUser);
router.post("/account", accountUpdate);
router.post("/metaMask", metaMaskUpdate);
router.delete("/unregister", deleteUser);
router.post("/updateLike", updateLike);
router.get("/", getUsers);

module.exports = router;
