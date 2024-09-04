const mongoose = require("mongoose");
// 내용추가하기 
const itemSchema = new mongoose.Schema({
  itemName: String,   
},
    {timestamps:true});

const itemModel = mongoose.model("items",itemSchema);
module.exports = itemModel;