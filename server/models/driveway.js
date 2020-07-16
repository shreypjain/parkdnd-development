const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const drivewaySchema = mongoose.Schema({
    email : {
        type: String,
    },
    address : {
        type: String,
        default: "",
        required: true
    },
    parkingSpaces : [{
        name: String,
    }],
    parkingSpacesFull : {
        type: Number,
        required: true
    },

});

drivewaySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Driveway", drivewaySchema);