const mongoose = require("mongoose");
const reqSchema = new mongoose.Schema({
    senderId: String, 
    itemId: String, 
    ownerId: String,
    start: Date,
    end: Date,
    period: Number,
    accept: Boolean,
    tenantSign: Boolean,
    landlordSign: Boolean,
    contractID: String,
}, {
    timestamps: true,
}
);

const reqModel = mongoose.model("ReqModel", reqSchema, "reqmodels");
module.exports = reqModel;