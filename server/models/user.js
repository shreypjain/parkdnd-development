const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        default: "",
        required: true
    },
    username: {
        type: String,
        default: "",
        unique: true,
        required: true
    },
    age : {
        type: Number,
        default: 0,
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
    rentals : 
        {
            timeStart: {
                type: String,
                default:Date.now()
            },
            timeEnd: {
                type: String,
                default: ""
            },
            drivewayOwnerEmail: {
                type:String,
                default:""
            },
            rate: {
                type:Number,
                default: 0
            },
            buyer: {
                type: Boolean,
                default: true
            },
            fullDrivewayRental: {
                type: Boolean,
                default: false
            }
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