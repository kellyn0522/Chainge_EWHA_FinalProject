const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    itemID: {type: String, required: true},
    ownerName: { type: String, required: true, maxlength: 30 },
    zipCode:{ type: String, required: true, match: /^[0-9]{5}$/  },
    houseAddress:{ type: String, required: true, maxlength: 30 },
    location :{ type: String, required: true, maxlength: 30 },
    area :{ type: String, required: true, maxlength: 30 },
    ownerId : { type: String, required: true, minlength: 3, maxlength: 30 },
    housePrice: { type: String, required: true, maxlength: 30 },
    memo : { type: String, required: true, maxlength: 500 },
    type : { type: String, required: true, maxlength: 30 },
    isContract: {type : String,required: true, maxlength: 30 },
    bedSize: {type : String,required: false, maxlength: 10 },
    hasItems: {type : Object,required: true, maxlength: 30 },
    hasAgent: {type : Boolean,required: false, maxlength: 3 },
    imageFime: {type: String, required: false}
}, {
    timestamps: true,
}
);

const itemModel = mongoose.model("Item", itemSchema);
module.exports = itemModel;