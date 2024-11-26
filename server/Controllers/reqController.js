const reqModel = require('../Models/reqModel');

const createReq = async(req,res) =>{
    const {senderId, itemId, ownerId, start, end, period} = req.body;
    try{
        const newReq = new reqModel({
            senderId:senderId, 
            itemId: itemId, 
            ownerId: ownerId,
            start: start,
            end: end,
            period: period,
            accept: false,
            tenantSign: false,
            landlordSign: false,
            contractID: false,
        });

        const response = await newReq.save();

        res.status(200).json(response);
        console.log(response);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const findUserSendReq = async(req,res) =>{
    const userId = req.params.userId;
    try{
        const r = await reqModel.find({
            senderId: userId
        });
        

        res.status(200).json(r);
        console.log("RRRRRRRRRR",r);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

};

const findUserReceivedReq = async(req,res) =>{
    const userId = req.params.userId;
    console.log(userId);
    console.log('findUserReceivedReq');
    try{
        const r = await reqModel.find({
            ownerId: userId
        });
        

        res.status(200).json(r);
        console.log("RRRRRRRRRR", r);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

};

const findReq = async(req,res) =>{
    const reqId = req.params.reqId;
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!',reqId);
    try{
        const r = await reqModel.findById(reqId);
        if (!r){
            return res.status(404).json({message: '요청을 찾을 수 없습니다.'});
        }

        res.status(200).json(r);
        console.log("RRSever", r);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

};

const findReqID = async(req,res) =>{
    const itemId = req.params.itemId;
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!',itemId);
    try{
        const i = await reqModel.findById(itemId);
        if (!i){
            return res.status(404).json({message: '요청을 찾을 수 없습니다.'});
        }

        res.status(200).json(i);
        console.log("RRSever", i);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

};

const getRequsetByItem = async(req, res) =>{
    const itemID = req.params.itemID;
    try{
        const r = await reqModel.find({itemId: itemID});
        if(r.length === 0){
            return res.status(404).json({message: 'Item not found'});
        }
        res.status(200).json(r); 

    }catch(error){
        console.log(error); 
        res.status(500).json(error);
    }
};

const acceptReq = async(req,res) => {
    const reqID = req.params.reqID;
    try{
        const r = await reqModel.findById(reqID);
        if (!r){
            return res.status(404).json({message: '요청을 찾을 수 없습니다.'});
        }
    
        result = await reqModel.updateOne({_id : reqID}, {$set : {accept: true}});
        res.status(200).json(r);
        console.log("RRSever", r);

    }catch(error){
        console.log('acceptReq ERROR ', error);
        res.status(500).json(error);
    }

};

const doTenantSign = async(req,res) => {
    const reqID = req.params.reqID;
    try{
        const r = await reqModel.findById(reqID);
        if (!r){
            return res.status(404).json({message: '요청을 찾을 수 없습니다.'});
        }
    
        result = await reqModel.updateOne({_id : reqID}, {$set : {tenantSign: true}});
        res.status(200).json(r);
        console.log("RRSever", r);

    }catch(error){
        console.log('acceptReq ERROR ', error);
        res.status(500).json(error);
    }

};

const doLandlordSign = async(req,res) => {
    const reqID = req.params.reqID;
    try{
        const r = await reqModel.findById(reqID);
        if (!r){
            return res.status(404).json({message: '요청을 찾을 수 없습니다.'});
        }
    
        result = await reqModel.updateOne({_id : reqID}, {$set : {landlordSign: true}});
        res.status(200).json(r);
        console.log("RRSever", r);

    }catch(error){
        console.log('acceptReq ERROR ', error);
        res.status(500).json(error);
    }

};


const deleteReq = async(req, res) =>{
    const reqID = req.params.reqID;
    try {
        const r = await reqModel.findById(reqID);

        if (!r){
            return res.status(404).json({messege:"Request not found"});
        }
        await reqModel.deleteOne({_id:reqID});
        res.status(200).json("REQUEST DELETE"); 
        console.log("REQUEST Delete success");
    }catch(error){
        console.log('Request Delete',error); 
        res.status(500).json(error);
    }
};

const setReqContract = async (req, res) => {
    console.log('setReqContract 호출!!');
    try {
        const { reqID,contractID } = req.body;
        const r = await reqModel.findById(reqID);
        if (!r) return res.status(400).json("Request Not Found");
        result = await reqModel.updateOne({_id : reqID}, {$set : {contractID: contractID}});
        if (result.modifiedCount > 0){
            res.status(200).json(result);
            console.log("RRSever", result);
        }else{
            return res.status(400).json({error : "업데이트에 실패했습니다."});
        }
    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};


module.exports ={createReq, findUserSendReq, findUserReceivedReq, findReq, acceptReq, deleteReq, doTenantSign, doLandlordSign, setReqContract};

