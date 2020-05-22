const mongoose = require("mongoose");
const uniqueValidator = require("uniqueValidator");

const hostSchema = mongoose.Schema({
    liability : {
        type: Boolean,
        default: false
    },
    driveway : {
        type: mongoose.Schema.ObjectId,
        ref: 'Driveway'
    }
});

hostSchema.plugin(uniqueValidator);
module.exports("Host", hostSchema);