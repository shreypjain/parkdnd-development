const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
module.exports = mongoose.model("Host", hostSchema);