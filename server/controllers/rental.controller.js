const user = require('../models/user');

//GET req
module.exports.getRentalInfo = async (req, res) => {
    try {
        const users = await user.find({});
        return res.status(200).json({
            success:true,
            message:users.rentals
        });
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:'could not find any rentals for this user'  
        });
    }
}

//POST req
module.exports.createRental = async (req,res) => {
    const path = req.body;
    const email = req.params.email;
    try {
        const users = await user.findOne({'email': email});

        users.rentals.timeStart = path.timeStart;
        users.rentals.timeEnd = path.timeEnd;
        user.rentals.parkedAddress = path.parkedAddress;
        users.rentals.rate = path.rate;
        users.rentals.fullDrivewayRental = path.fullDrivewayRental;

        const rentDoc = await users.save();
        return res.status(200).status({
            succes:true,
            message:"this rental was successfully created from" + String(users.rentals.timeStart) + "to" + String(users.rentals.timeEnd) + "at" + String(users.rentals.parkedAddress)
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message: 'rental could not successfully be created or deleted'
        });

    }
}