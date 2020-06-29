const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const ObjectId = mongoose.Schema.ObjectId;

const hostSchema = mongoose.Schema({
    liability : {
        type: Boolean,
        default: false
    },
    email : {
        type: String,
        required: true
    }
});

hostSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Host", hostSchema);