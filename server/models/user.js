const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        default: "",
        required: true
    },
    age : {
        type: Number,
        default: 0,
    },
    isHost : {
        type: mongoose.Schema.ObjectId,
        ref: "Host"
    },
    email : {
        type: String,
        default: "",
        unique: true
    },
    phoneNumber : {
        type:String,
        default : ""
    },
    dateJoined : {
        type: Date,
        default: Date.now()
    },
    profilePic : {
        type: String,
        default: ""
    },
    password : {
        type: String,
        trim: true,
        required: [true, "password is required"],
        minlength: [8, "password is too short"]
    }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);