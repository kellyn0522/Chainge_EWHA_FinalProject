const express = require("express");
const router = express.Router();
const {registerItem, updateItem, deleteItem, findItem, getItems, setIsContract } = require("../Controllers/itemController");
const multer = require('multer');
const path = require('path');


// multer 설정: 파일을 'uploads' 폴더에 저장
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 파일 저장 경로
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일명 지정 (현재 시간 + 확장자)
    }
});


const upload = multer({ storage: storage });

router.post("/createItem", upload.single('imageFile'), registerItem);
router.post("/updateItem/:itemID", updateItem);
router.post("/contract", setIsContract);
router.delete("/deleteItem/:itemID", deleteItem);
router.get("/find/:itemID", findItem);
router.get("/", getItems);


module.exports = router;