//const express = require('express');
//var router = express.Router();
const user = require('../models/user');

//GET req
module.exports.userGetAll = async (req, res) => {
    try {
        //find a blank user
        const users = await user.find({});
        return res.status(200).json({
            success: true,
            message: users
        });
        
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to get users",
            details : error.message
        });
    }
}

//POST req
module.exports.createUser = async (req, res) {
    const path = req.body
    const id = req.id
    try {
        //finding the user using inbuilt method
        const thisUser = await user.findById({ _id: id})
        
        thisUser.name = path.name;
        thisUser.age = path.age;
        thisUser.isHost = path.isHost;
        thisUser.email = path.email;
        thisUser.phoneNumber = path.phoneNumber;
        thisUser.dateJoined = path.dateJoined;
        thisUser.profilePic = path.profilePic;
        thisUser.password = path.password;

        const userDoc = await user.save();

        return res.status(200).json({
            success: true,
            message: 'created the user'
        }); 
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'could not create user'
        })
    }
}

//PUT req
module.exports.editUser = async (req, res) => {
    const path = req.body;
    const id = req.params.id;

    try {
        //find user by the inbuilt method findById by mongo
        const thisUser = await user.findById({_id: id});

        thisUser.name = path.name;
        thisUser.age = path.age;
        thisUser.isHost = path.isHost;
        thisUser.email = path.email;
        thisUser.phoneNumber = path.phoneNumber;
        thisUser.dateJoined = path.dateJoined;
        thisUser.profilePic = path.profilePic;
        thisUser.password = path.password;

        const userDoc = await thisUser.save();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'could not edit user',
            details: error.message
        })
    }

}
//DELETE req
module.exports.deleteUser = async (req,res) => {
    const path = req.body;
    const id = req.params._id

    try {
        const thisUser = await user.findById({_id: id})

        thisUser.name = "";
        thisUser.age = "";
        thisUser.isHost = "";
        thisUser.email = "";
        thisUser.phoneNumber = "";
        thisUser.dateJoined = "";
        thisUser.profilePic = "";
        thisUser.password = "";

        return res.status(200).json({
            success: true,
            message: "user has been deleted"
        })
    }
    catch (error) {
        return res.status(500).json({
            succcess: false,
            message: "user could not be deleted",
            details: error.message
        })
    }
}
