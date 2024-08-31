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
        const { name, nickName, email, phoneNumber,password } = req.body;

        console.log("Received data:", { name, nickName, email, phoneNumber, password });

        let emailExists = await userModel.findOne({ email });
        let nickNameExists = await userModel.findOne({ nickName });
        let phoneNumberExists = await userModel.findOne({ phoneNumber });

        if (emailExists) return res.status(400).json("User with the given email already exists... ");
        if (nickNameExists) return res.status(400).json("User with the given nickName already exists... ");
        if (phoneNumberExists ) return res.status(400).json("User with the given phoneNumber already exists... ");


        if (!name || !email || !password ) return res.status(400).json("All fields are required");

        if (!validator.isEmail(email)) return res.status(400).json("Email must be a valid email ");

        if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password");

        user = new userModel({ name, nickName, email, phoneNumber, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt); // 비밀번호 해싱
        await user.save();

        const token = createToken(user._id); // id 받아서 토큰 생성

        res.status(200).json({ _id: user._id, name: user.name, nickName: user.nickName, email: user.email, phoneNumber: user.phoneNumber, token });

    } catch (error) {
        console.log(error); // 에러 로그
        res.status(500).json(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });

        if (!user) return res.status(400).json("Invalid email or password.. ");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(400).json("Invalid email or password.. ");
        const token = createToken(user._id); 

        res.status(200).json({ _id: user._id, name: user.name , email, token });

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

const getUsers = async(req, res) =>{
    try{
        const users = await userModel.find();
        res.status(200).json(users); 

    }catch(error){
        console.log(error); 
        res.status(500).json(error);
    }
};

module.exports = { registerUser, loginUser, findUser, getUsers };
