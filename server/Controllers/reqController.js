const reqModel = require('../Models/reqModel');

const createReq = async(req,res) =>{
    const {senderId, itemId, ownerId} = req.body;
    console.log()
    try{
        const newReq = new reqModel({
            senderId:senderId, 
            itemId: itemId, 
            ownerId: ownerId
        });

        const response = await newReq.save();

        res.status(200).json(response);
        console.log(response);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};


//getMessages 
const getMessages = async(req,res)=>{
    const {chatId} = req.params;

    try{
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

};


//id가 존재하면 해당 채팅 찾는 기능 
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

module.exports ={createReq, findUserSendReq, findUserReceivedReq, findReq};

