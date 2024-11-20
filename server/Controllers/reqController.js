const createReq = async(req,res) =>{
    const {senderId, itemId, ownerId} = req.body;
    try{
        const r = await reqModel.findOne({
            members:{$all:[senderId, itemId, ownerId] }
        });
        
        if(r) return res.status(200).json(r);
        const newReq = new reqModel({
            members:[senderId, itemId, ownerId]
        });

        const response = await newReq.save();

        res.status(200).json(response);

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
            members: { $in :[senderId] }
        });
        

        res.status(200).json(r);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

};

const findUserReceivedReq = async(req,res) =>{
    const userId = req.params.userId;
    try{
        const r = await reqModel.find({
            members: { $in :[ownerId] }
        });
        

        res.status(200).json(r);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

};

const findReq = async(req,res) =>{
    const {senderId, itemId, ownerId} = req.params;
    try{
        const r = await reqModel.find({
            members: { $all :[senderId, itemId, ownerId] }
        });

        res.status(200).json(r);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }

};

module.exports ={createReq, findUserSendReq, findUserReceivedReq, findReq};

