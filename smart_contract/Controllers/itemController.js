const itemModel = require('../Models/itemModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
//const { default: Item } = require('../../client/src/pages/Item');


const createToken = (_itemId) => {

    const jwtkey = process.env.JWT_SECRET_KEY; // 토큰 생성

    return jwt.sign({ _itemId }, jwtkey, { expiresIn: "3d" });
};

    
const registerItem = async (req, res) => {

    try {
        /*
        const newItem = new Item({
            ownerName: req.body.ownerName,
            zipCode: req.body.zipCode,
            houseAddress: req.body.houseAddress,
            location: req.body.location,
            ownerId: req.body.ownerId,
            housePrice: req.body.housePrice,
            memo: req.body.memo,
            type: req.body.type,
            isContract: req.body.isContract,
            bedSize: req.body.bedSize,
            hasItems: req.body.hasItems,
            hasAgent :  req.body.hasItems,

        })*/
       const{ownerName, zipCode, houseAddress, location, area, ownerId, housePrice, memo, type, isContract, bedSize, hasItems } = req.body;

        console.log("Received data:", {ownerName, location });

        let itemExists = await userModel.findOne({ _itemId });

        if (itemExists) return res.status(400).json("item already exists... ");
      

        Item = new itemModel({ 
            ownerName, zipCode, houseAddress, location, area, ownerId, housePrice, memo, type, isContract, bedSize, hasItems });


        await Item.save();

        const token = createToken(Item._itemId); // id 받아서 토큰 생성

        res.status(200).json({ 
            _itemId: Item._itemId,  
            ownerName: Item.ownerName, 
            zipCode: Item.zipCode, 
            houseAddress: Item.houseAddress, 
            location: Item.location, 
            area: Item.area, 
            ownerId: Item.ownerId, 
            housePrice: Item.housePrice, 
            memo: Item.memo, 
            type: Item.type, 
            isContract: Item.isContract, 
            bedSize: Item.bedSize, 
            hasItems: Item.hasItems,
            token });

    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};




const findItem = async(req, res) =>{
    const itemId = req.params.itemId;
    try{
        const item = await itemModel.findById(itemId);
        res.status(200).json(item); 

    }catch(error){
        console.log(error); 
        res.status(500).json(error);
    }
};



const getItems = async(req, res) =>{
    try{
        const items = await itemModel.find();
        res.status(200).json(items ); 

    }catch(error){
        console.log(error); 
        res.status(500).json(error);
    }
};

module.exports = { registerItem, findItem, getItems };