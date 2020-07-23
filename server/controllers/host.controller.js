const host = require('../models/host');
const user = require('../models/user')

//GET req
module.exports.getHost = async (req,res) => {
    try {
        const hosts = await host.find({});
        return res.status(200).json({
            success:true,
            message: hosts
        });
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:'user not found '
        });
    }
}
//POST req
module.exports.createHost = async (req,res) => {
    const path = req.body;
    const email = req.query.email;
    try {
        if(user.exists({_id: id})) {
            const thisHost = new host({
                liability : path.liability,
                email : path.email
            })
            const hostDoc = await thisHost.save();
            return res.status(200).json({
                success:true,
                message:'host successfully created'
            });
        } 
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "host could not be created",
            details: error.message,
        });
    }
}
//PUT req
module.exports.editHost = async (req,res) => {
    const path = req.body
    const email = req.query.email

    try {
        const thisHost = await host.findOne({_id: id});

        thisHost.liability = path.liability
        thisHost.driveway = path.driveway

        const hostDoc = await thisHost.save();
        return res.status(200).json({
            success:true,
            message: 'host was edited'
        })
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message: 'host could not be edited',
            details: error.message
        })
    }
}
//DELETE req
module.exports.deleteHost = async (req, res) => {
    //const path = req.body;
    const email = req.query.email;

    try {
        const thisHost = await host.findOneAndDelete({_id: id});
        return res.status(200).json({
            success: true,
            message: 'host successfully deleted'
        })
    }
    catch(error) {
        return res.status(500).json({
            success:true,
            message:'host could not be deleted',
            details: error.message
        })
    }
}

