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


/* 매물 등록 시 multer 미들웨어를 추가하여 파일 처리
router.post("/createItem", upload.single('imageFile'),async (req,res) => { 
    try{
        if(!req.file){
            return res.status(400).json({ error: "파일이 업로드되지 않았습니다."});
        }

        const { location, zipCode, latitude, longitude, ownerName, itemID } = req.body;
        if (!location || !zipCode || !latitude || !longitude) {
            return res.status(400).json({ error: "필수 주소 데이터가 누락되었습니다." });
        }

        await registerItem({
            location,
            zipCode,
            latitude,
            longitude,
            ownerName,
            itemID,
            imagePath: req.file.path // 업로드된 파일의 경로 추가
        }, res);

    } catch (error){
        console.error('Error in createItem:', error);
        res.status(500).json({error: '서버에서 오류가 발생했습니다.'});
    }
});*/


router.post("/createItem", upload.single('imageFile'), registerItem);
router.post("/updateItem/:itemID", updateItem);
router.post("/contract", setIsContract);
router.delete("/deleteItem/:itemID", deleteItem);
router.get("/find/:itemID", findItem);
router.get("/", getItems);


module.exports = router;