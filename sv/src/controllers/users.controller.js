const userController = {};
const User = require('../models/User');

userController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userController.createUser = async (req, res) => {
    const { username } = req.body;

    const user = new User({
        username
    });

    await user.save();

    res.json('User saved');
};

userController.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    const user = await User.findOneAndUpdate(id, {
        username
    });

    res.json('User updated');
};

userController.getUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    res.json(user);
};

userController.deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOneAndDelete(id);

    res.json({ message: 'User deleted successfully' }); 
};


module.exports = userController;