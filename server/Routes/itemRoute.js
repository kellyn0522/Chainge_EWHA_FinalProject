const express = require("express");
const router = express.Router();
const {registerItem, updateItem, deleteItem, findItem, getItems } = require("../Controllers/itemController");
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

// multer 설정: 파일을 'uploads' 폴더에 저장
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 파일 저장 경로
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일명 지정 (현재 시간 + 확장자)
    }
});


// 매물 등록 시 multer 미들웨어를 추가하여 파일 처리
router.post("/createItem", upload.single('imageFile'),(req,res) => { 
    try{
        if(!req.file){
            return res.status(400).json({ error: "파일이 업로드되지 않았습니다."});
        }

        registerItem(req, res);
    } catch (error){
        console.error('Error in createItem:', error);
        res.status(500).json({error: '서버에서 오류가 발생했습니다.'});
    }
});


router.post("/createItem", registerItem);
router.post("/updateItem/:itemID", updateItem);
router.delete("/deleteItem/:itemID", deleteItem);
router.get("/find/:itemID", findItem);
router.get("/", getItems);


module.exports = router;