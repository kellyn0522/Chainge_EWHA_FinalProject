const itemModel = require('../Models/itemModel');
const jwt = require("jsonwebtoken");
//const { default: Item } = require('../../client/src/pages/Item');

const registerItem = async (req, res) => {
    const imageFile = req.file ? req.file.path : null;
    //console.log("Received data:", { ownerName, zipCode, houseAddress, location, area, ownerId, housePrice, memo, type, isContract, bedSize, hasItems });
    console.log("Received file:", imageFile);

    try {
       const{itemID, ownerName, zipCode, houseAddress, location, area, ownerId, housePrice, memo, type, isContract, bedSize, hasItems } = req.body;

        console.log("Received data:", {ownerName, location });

        let itemExists = await itemModel.findOne({ itemID });

        if (itemExists) return res.status(400).json("item already exists... ");
      

        Item = new itemModel({ 
            itemID, ownerName, zipCode, houseAddress, location, area, ownerId, housePrice, memo, type, isContract, bedSize, hasItems });


        await Item.save();

        res.status(200).json({ 
            itemID: Item.itemID,  
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
            hasItems: Item.hasItems
        });
    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};




const findItem = async(req, res) =>{
    try{
        const itemID = req.params.itemID;
        const item = await itemModel.findOne({itemID});
        if (!item){
            return res.status(404).json({messege:"Item not found"});
        }
        res.status(200).json(item); 

    }catch(error){
        console.log(error); 
        res.status(500).json(error);
    }
};



const getItems = async(req, res) =>{
    try{
        const items = await itemModel.find();
        res.status(200).json(items); 

    }catch(error){
        console.log(error); 
        res.status(500).json(error);
    }
};

module.exports = { registerItem, findItem, getItems };
