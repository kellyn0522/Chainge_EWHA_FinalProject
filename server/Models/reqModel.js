const mongoose = require("mongoose");
const reqSchema = new mongoose.Schema({
    members: Array,
}, {
    timestamps: true,
}
);

const reqModel = mongoose.model("ReqModel", reqSchema);
module.exports = reqModel;