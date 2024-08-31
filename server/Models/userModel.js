const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    nickName: { type: String, required: true, minlength: 3, maxlength: 30 , unique: true},
    email: { type: String, required: true, minlength: 3, maxlength: 200, unique: true },
    phoneNumber: {type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3, maxlength: 1024 },

}, {
    timestamps: true,
}
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;