const mongoose = require("mongoose");
// 이부분 수정하면 단체채팅 
const chatSchema = new mongoose.Schema({
    members: Array,

},{
    timestamps: true
});
const chatModel =mongoose.model("chat", chatSchema);

module.exports = chatModel;