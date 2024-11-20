const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    itemID: {type: String, required: true},
    ownerName: { type: String, required: true, maxlength: 30 },// 삭제하기
    zipCode:{ type: String, required: true, match: /^[0-9]{5}$/  },
    houseAddress:{ type: String, required: true, maxlength: 30 },
    location :{ type: String, required: true, maxlength: 30 },
    latitude: { type: Number, required: true }, // 위도
    longitude: { type: Number, required: true }, // 경도
    area :{ type: String, required: true, maxlength: 30 },
    ownerId : { type: String, required: true, minlength: 3, maxlength: 30 },
    housePrice: { type: String, required: true, maxlength: 30 },
    deposit: {type: Number, required: false},
    memo : { type: String, required: true, maxlength: 500 },
    type : { type: String, required: true, maxlength: 30 },
    isContract: {type : String,required: true, maxlength: 30 },
    bedSize: {type : String,required: false, maxlength: 10 },
    hasItems: {type : Object,required: true, maxlength: 30 },
    hasAgent: {type : Boolean,required: false, maxlength: 3 },
    imageFile: {type: String, required: false},
    buildingName:{type: String, required: false},
    floor: {type: Number, required: false},
    duplexAvailability: {type: Boolean, required: false},
    exclusiveArea: {type: Number, required: false},
    contractArea: {type: Number, required: false},
    room: {type: Number, required: false},
    bathroom: {type: Number, required: false},
    facing: {type: String, required: false},
    elevator:{type: Boolean, required: false},
    petFriendly:{type: Boolean, required: false},
    number_of_units_in_the_given_area: {type: Number, required: false},
    total_number_of_units: {type: Number, required: false},
    parkingSpace: {type: Number, required: false},
    availableMoveInDate: {type: Date, required: false},
}, {
    timestamps: true,
}
);

const itemModel = mongoose.model("Item", itemSchema);
module.exports = itemModel;