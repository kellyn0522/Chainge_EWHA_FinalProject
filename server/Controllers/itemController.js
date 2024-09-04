const itemModel = require('../Models/itemModel');
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");


    const createItem = (_itemId) => {

        const jwtkey = process.env.JWT_SECRET_KEY; // 토큰 생성
    
        return jwt.sign({_itemId }, jwtkey, { expiresIn: "3d" });
    };

    const registerItem = async(req,res) => {
        try{

        }catch{}

    }
