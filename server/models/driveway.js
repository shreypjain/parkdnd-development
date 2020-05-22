const mongoose = require("mongoose");
const uniqueValidator = require("uniqueValidator");

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
        minamount: parkingSpaces 
    },

});