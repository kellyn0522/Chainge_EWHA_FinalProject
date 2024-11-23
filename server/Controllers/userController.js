const userModel = require('../Models/userModel');
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");



const createToken = (_id) => {

    const jwtkey = process.env.JWT_SECRET_KEY; // 토큰 생성

    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {

    try {
        const { name, nickName, email, phoneNumber,password, realEstateAgent } = req.body;

        console.log("Received data:", { name, nickName, email, phoneNumber, password, realEstateAgent });

        let emailExists = await userModel.findOne({ email });
        let nickNameExists = await userModel.findOne({ nickName });
        let phoneNumberExists = await userModel.findOne({ phoneNumber });

        if (emailExists) return res.status(400).json("User with the given email already exists... ");
        if (nickNameExists) return res.status(400).json("User with the given nickName already exists... ");
        if (phoneNumberExists ) return res.status(400).json("User with the given phoneNumber already exists... ");


        if (!name || !email || !password ) return res.status(400).json("All fields are required");

        if (!validator.isEmail(email)) return res.status(400).json("Email must be a valid email ");

        if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password");

        user = new userModel({ name, nickName, email, phoneNumber, password, likedItemId:[], realEstateAgent });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt); // 비밀번호 해싱
        await user.save();

        const token = createToken(user._id); // id 받아서 토큰 생성

        res.status(200).json({ _id: user._id, name: user.name, nickName: user.nickName, email: user.email, phoneNumber: user.phoneNumber, token, likedItemId: user.likedItemId, realEstateAgent:user.realEstateAgent });

    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};

// 임의로 추가
const updateUser = async (req, res) => {

    try {
        const { id, nickName, phoneNumber, password, birth,identityNum, zipCode, houseAddress } = req.body;

        console.log("Received data:", { id, nickName, phoneNumber, password, birth, identityNum, zipCode, houseAddress });

        const user = await userModel.findById( id );
        if (!user) return res.status(400).json("User Not Found");
        console.log(user);

        let nickNameExists = await userModel.findOne({ nickName });
        let phoneNumberExists = await userModel.findOne({ phoneNumber });

        if (nickNameExists && user._id !== nickNameExists._id) return res.status(400).json("User with the given nickName already exists... ");
        if (phoneNumberExists && user._id !== phoneNumberExists._id) return res.status(400).json("User with the given phoneNumber already exists... ");


        //if (!nickName || !phoneNumber || !password || !birth || !identityNum || !zipCode || !houseAddress ) return res.status(400).json("All fields are required");

        if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password");
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // 비밀번호 해싱

        result = await userModel.updateOne({_id : user._id}, {$set : {nickName, phoneNumber, hashedPassword, birth, identityNum, zipCode, houseAddress} });
        if (result.modifiedCount > 0){
            const update = await userModel.findById(user._id);
            console.log(update);
            res.status(200).json({ _id: update._id, name: update.name, nickName: update.nickName, email: update.email, phoneNumber: update.phoneNumber, birth : update.birth, identityNum : update.identityNum, zipCode : update.zipCode, houseAddress : update.houseAddress, likedItemId: update.likedItemId, realEstateAgent:update.realEstateAgent, account: update.account, metaMaskAdd: update.metaMaskAdd });
        } else{
            return res.status(400).json({error : "사용자를 찾을 수 없습니다."});
        }

    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};

const accountUpdate = async (req, res) => {
    try {
        const { id, account} = req.body;

        console.log("Received data:", { id, account });

        const user = await userModel.findById( id );
        if (!user) return res.status(400).json("User Not Found");
        console.log(user);
        result = await userModel.updateOne({_id : user._id}, {$set : {account} });
        if (result.modifiedCount > 0){
            const update = await userModel.findById(user._id);
            console.log(update);
            res.status(200).json(update);
        } else{
            return res.status(400).json({error : "사용자를 찾을 수 없습니다."});
        }

    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};

const metaMaskUpdate = async (req, res) => {
    try {
        const { id, metaMaskAdd } = req.body;

        console.log("Received data:", { id, metaMaskAdd });

        const user = await userModel.findById( id );
        if (!user) return res.status(400).json("User Not Found");
        console.log(user);
        result = await userModel.updateOne({_id : user._id}, {$set : {metaMaskAdd} });
        if (result.modifiedCount > 0){
            const update = await userModel.findById(user._id);
            console.log(update);
            res.status(200).json(update); 
        } else{
            return res.status(400).json({error : "사용자를 찾을 수 없습니다."});
        }

    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};

const updateLike = async (req, res) => {
    try {
        const { userId, itemId, liked } = req.body;
        const user = await userModel.findById( userId );
        if (!user) return res.status(400).json("User Not Found");
        let result;
        if (!liked){
            result = await userModel.updateOne({_id : user._id}, {$pull : {likedItemId: itemId}});
        } else {
            result = await userModel.updateOne({_id : user._id}, {$addToSet : {likedItemId: itemId}});
        }
        if (result.modifiedCount > 0){
            const update = await userModel.findById(user._id);
            console.log(update.likedItemId);
            res.status(200).json(update); 
        } else{
            return res.status(400).json({error : "사용자를 찾을 수 없습니다."});
        }
    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });

        console.log(user);
        if (!user) return res.status(400).json("Invalid email or password.. ");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(400).json("Invalid email or password.. ");
        const token = createToken(user._id); 

        res.status(200).json(user); 
    } catch (error) {
        console.log(error); 
        res.status(500).json(error);
    }
};

const findUser = async(req, res) =>{
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId);
        res.status(200).json(user); 

    }catch(error){
        console.log(error); 
        res.status(500).json(error);
    }
};

const deleteUser = async(req, res) =>{
    const { id } = req.body;
    try {
        const user = await userModel.findOne({ _id:id });

        if (!user){
            return res.status(404).json({messege:"User not found"});
        }
        await userModel.deleteOne({_id:id});
        res.status(200).json("Unregister"); 
        console.log("Delete success");
    }catch(error){
        console.log(error); 
        res.status(500).json(error);
    }
};

const getUsers = async(req, res) =>{
    try{
        const users = await userModel.find();
        res.status(200).json(users); 

    }catch(error){
        console.log(error); 
        res.status(500).json(error);
    }
};

module.exports = { registerUser, updateUser, loginUser, findUser, getUsers, deleteUser, updateLike, accountUpdate, metaMaskUpdate };
