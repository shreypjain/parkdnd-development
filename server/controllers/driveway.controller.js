const driveway = require('../models/driveway');

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
//POST req
module.exports.createDriveway = async (req,res) => {
    const path = req.body;
    const id = req.id;
    
    try {
        const thisDriveway = await driveway.findById({_id: id});

        thisDriveway.address = path.address;
        thisDriveway.parkingSpaces = path.parkingSpaces;
        thisDriveway.parkingSpacesFull = path.parkingSpacesFull;

        const driveDoc = await driveway.save();

        res.status(200).json({
            success:true,
            message:'new driveway created'
        });
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:'driveway was not created properly'
        });
    }
}
//PUT req
module.exports.editDriveway = async (req,res) => {
    const path = req.body;
    const id = req.id;

    try {
        const thisDriveway = await driveway.findById({_id: id});

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
    const id = req.id;

    try {
        const thisDriveway = await driveway.findById({_id: id});

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