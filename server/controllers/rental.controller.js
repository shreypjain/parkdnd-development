const user = require('../models/user');

//GET req
module.exports.getRentalInfo = async (req, res) => {
    email = req.query.email
    try {
        const users = await user.findOne({'email': email});
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
    const email = req.query.email;
    try {
        const users = await user.findOne({'email': email});

        console.log(users.rentals)
        users.rentals.timeStart = path.timeStart;
        users.rentals.timeEnd = path.timeEnd;
        users.rentals.drivewayOwnerEmail = path.drivewayOwnerEmail;
        users.rentals.rate = path.rate;
        users.rentals.buyer = path.buyer
        users.rentals.fullDrivewayRental = path.fullDrivewayRental;

        const rentDoc = await users.save();
        return res.status(200).json({
            succes:true,
            message:"this rental was successfully created"
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message: 'rental could not successfully be created or deleted',
            details: error.message
        });
    }
}