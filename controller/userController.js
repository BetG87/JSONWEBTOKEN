const User = require('../models/User');

const userController =
{
        //GET ALL USERS
    getAllUser: async (req, res) =>
        {
        try {
            const user = await User.find();

            return res.status(200).json(user)
        }
        catch (err) {
            return res.status(200).json(err)
        }
    },
    deletelUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            return res.status(200).json("Delete successfuly")
        }
        catch (err) {
            return res.status(200).json(err)
        }
    }
}

module.exports = userController;