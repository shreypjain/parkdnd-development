
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
module.exports.createUser = async (req, res) => {
    const path = req.body;
    const email = req.query.email;
    try {
        //finding the user using inbuilt method
        const thisUser = await user.findOne({ 'email': email});
        
        thisUser.name = path.name;
        thisUser.age = path.age;
        thisUser.isHost = path.isHost;
        thisUser.email = path.email;
        thisUser.phoneNumber = path.phoneNumber;
        thisUser.dateJoined = path.dateJoined;
        thisUser.profilePic = path.profilePic;
        thisUser.password = path.password;

        const userDoc = await thisUser.create();

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
    const email = req.query.email;

    try {
        //find user by the inbuilt method findById by mongo
        const thisUser = await user.findOne({'email': email});

        thisUser.name = path.name;
        thisUser.age = path.age;
        thisUser.isHost = path.isHost;
        thisUser.email = path.email;
        thisUser.phoneNumber = path.phoneNumber;
        thisUser.dateJoined = path.dateJoined;
        thisUser.profilePic = path.profilePic;
        thisUser.password = path.password;

        const userDoc = await thisUser.save();

        return res.status(200).json({
            success:true,
            message:'user has been edited'
        });
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
    //const path = req.body;
    const email = req.query.email

    try {
        const thisUser = await user.findOneAndDelete({'email': email})

        /*thisUser.name = "";
        thisUser.age = "";
        thisUser.isHost = "";
        thisUser.email = "";
        thisUser.phoneNumber = "";
        thisUser.dateJoined = "";
        thisUser.profilePic = "";
        thisUser.password = "";*/

        //const userDoc = await thisUser.save();

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
