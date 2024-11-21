//const { default: Item } = require('../../client/src/pages/Item');
const itemModel = require('../Models/itemModel');
const jwt = require("jsonwebtoken");

const registerItem = async (req, res) => {
    const imageFile = req.file ? req.file.path : null;
    console.log("Received data:", { ownerName, zipCode, houseAddress, location, area, ownerId, housePrice, memo, type, isContract, bedSize, hasItems });
    console.log("Received file:", imageFile);

    try {
       const{
        itemID,
        zipCode,
        houseAddress,
        location,
        latitude, // 위도
        longitude, // 경도
        area,
        ownerId,
        housePrice,
        deposit,
        memo,
        type,
        isContract,
        bedSize,
        hasItems,
        hasAgent,
        imageFile,
        buildingName,
        floor,
        duplexAvailability,
        exclusiveArea,
        contractArea,
        room,
        bathroom,
        facing,
        elevator,
        petFriendly,
        number_of_units_in_the_given_area,
        total_number_of_units,
        parkingSpace,
        availableMoveInDate
        } = req.body;


        let itemExists = await itemModel.findOne({ itemID });

        if (itemExists) return res.status(400).json("item already exists... ");
      

        const Item = new itemModel({ 
            itemID,
            zipCode,
            houseAddress,
            location,
            latitude, // 위도
            longitude, // 경도
            area,
            ownerId,
            housePrice,
            deposit,
            memo,
            type,
            isContract,
            bedSize,
            hasItems,
            hasAgent,
            imageFile,
            buildingName,
            floor,
            duplexAvailability,
            exclusiveArea,
            contractArea,
            room,
            bathroom,
            facing,
            elevator,
            petFriendly,
            number_of_units_in_the_given_area,
            total_number_of_units,
            parkingSpace,
            availableMoveInDate
        });


        await Item.save();

        console.log("!!!!!!!!!!");
        res.status(200).json({ 
            itemID: Item.itemID,
            zipCode: Item.zipCode, 
            houseAddress: Item.houseAddress, 
            location: Item.location, 
            latitude: Item.latitude,
            longitude: Item.longitude,
            area: Item.area, 
            ownerId: Item.ownerId, 
            housePrice: Item.housePrice, 
            memo: Item.memo, 
            type: Item.type, 
            isContract: Item.isContract, 
            bedSize: Item.bedSize, 
            hasItems: Item.hasItems,
            hasAgent: Item.hasAgent,
            floor: Item.floor,
            duplexAvailability: Item.duplexAvailability,
            exclusiveArea: Item.exclusiveArea,
            contractArea: Item.contractArea,
            room: Item.room,
            bathroom: Item.bathroom,
            facing: Item.facing,
            elevator: Item.elevator,
            petFriendly: Item.petFriendly,
            number_of_units_in_the_given_area: Item.number_of_units_in_the_given_area,
            total_number_of_units: Item.total_number_of_units,
            parkingSpace: Item.parkingSpace,
            availableMoveInDate: Item.availableMoveInDate,
            deposit: Item.deposit
        });
    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};

const updateItem = async (req, res) => {
    try {
        const itemID = req.params.itemID;
        const {  
            housePrice, 
            memo,
            bedSize, 
            hasItems,
            hasAgent,
            duplexAvailability,
            exclusiveArea,
            contractArea,
            room,
            bathroom,
            facing,
            elevator,
            petFriendly,
            number_of_units_in_the_given_area,
            total_number_of_units,
            parkingSpace,
            availableMoveInDate,
            deposit
         } = req.body;

        const item = await itemModel.findOne( {itemID} );
        if (!item) return res.status(400).json("Item Not Found");

        result = await itemModel.updateOne({itemID : item.itemID}, {$set : {
            housePrice, 
            memo,
            bedSize, 
            hasItems,
            hasAgent,
            duplexAvailability,
            exclusiveArea,
            contractArea,
            room,
            bathroom,
            facing,
            elevator,
            petFriendly,
            number_of_units_in_the_given_area,
            total_number_of_units,
            parkingSpace,
            availableMoveInDate,
            deposit
        } });
        if (result.modifiedCount > 0){
            const update = await itemModel.findOne({itemID : item.itemID});
            console.log(update);
            res.status(200).json('update success');
        } else{
            return res.status(400).json({error : "매물을 찾을 수 없습니다."});
        }

    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};

const deleteItem = async(req, res) =>{
    const itemID = req.params.itemID;
    console.log("Item Delete Called");
    try {
        const item = await itemModel.findOne( {itemID} );

        if (!item){
            return res.status(404).json({messege:"Item not found"});
        }
        await itemModel.deleteOne({itemID:itemID});
        res.status(200).json("Delete success"); 
        console.log("Delete success");
    }catch(error){
        console.log(error); 
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

module.exports = { registerItem, updateItem, deleteItem, findItem, getItems };
