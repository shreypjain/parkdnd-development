const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const drivewaySchema = mongoose.Schema({
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
        minamount: {
            type: Number
        } 
    },

});

drivewaySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Driveway", drivewaySchema);