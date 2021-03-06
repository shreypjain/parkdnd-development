const driveway = require('../models/driveway');
const user = require('../models/user')

//GET req
module.exports.getDriveway = async (req,res) => {
    try {
        const thisDriveway = await driveway.find({});
        return res.status(200).json({
            success:true,
            message:thisDriveway
        });
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:'driveway not found'
        });
    }
}
//GET single driveway
module.exports.getSingleDriveway = async (req,res) => {
    email = req.query.email
    try {
        const thisDriveway = await driveway.findOne({_id: id})

        return res.status(200).json({
            sucess: true,
            message: thisDriveway
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//POST req
module.exports.createDriveway = async (req,res) => {
    const path = req.body;
    const email = req.query.email;
    
    try {
        const thisUser = await user.findOne({_id: id});
        if(!(thisUser == undefined)) {
        const thisDriveway = new driveway({
            email: email,
            address: path.address,
            parkingSpaces: path.parkingSpaces,
            parkingSpacesFull: path.parkingSpacesFull
        });
        const driveDoc = await thisDriveway.save();

        res.status(200).json({
            success:true,
            message:'new driveway created'
        });
        }
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:'driveway was not created properly',
            details: error.message
        });
    }
}
//PUT req
module.exports.editDriveway = async (req,res) => {
    const path = req.body;
    const email = req.query.email;

    try {
        const thisDriveway = await driveway.findOne({_id: id});

        thisDriveway.address = path.address;
        thisDriveway.parkingSpaces = path.parkingSpaces;
        thisDriveway.parkingSpacesFull = path.parkingSpacesFull;

        const driveDoc = await driveway.save();

        res.status(200).json({
            success:true,
            message:'driveway was successfully edited'
        });
    }
    catch (error) {
        return res.status(500).json({
            success:true,
            message:'driveway could not be edited'
        });
    }
}
//DELETE req
module.exports.deleteDriveway = async (req,res) => {
    const path = req.body;
    const email = req.query.email;

    try {
        const thisDriveway = await driveway.findOneAndDelete({_id: id});

        thisDriveway.address = "";
        thisDriveway.parkingSpaces="";
        thisDriveway.parkingSpacesFull="";

        const driveDoc = thisDriveway.save();
        return res.status(200).json({
            success:true,
            message:'driveway was successfully deleted'
        });
    }
    catch (error) {
        res.status(500).json({
            success:true,
            message:'coach could not be deleted'
        });
    }
}