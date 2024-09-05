const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    nickName: { type: String, required: true, minlength: 3, maxlength: 30 , unique: true},
    email: { type: String, required: true, minlength: 3, maxlength: 200, unique: true },
    phoneNumber: {type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3, maxlength: 1024 },
    birth : { type: String, required: true, match: /^[0-9]{6}$/ },
    identityNum : { type: String, required: true, match: /^[1-4][0-9]{7}$/ },
    zipCode : { type: String, required: true, match: /^[0-9]{5}$/ },
    //ownItem : { type: String, required: true, minlength: 3, maxlength: 30 },
    //likedItemId : { type: String, required: true, minlength: 3, maxlength: 30 },
    //contracts : { type: String, required: true, minlength: 3, maxlength: 30 },
    houseAddress : { type: String, required: true, minlength: 3, maxlength: 30 },
}, {
    timestamps: true,
}
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;