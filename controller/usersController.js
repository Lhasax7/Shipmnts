const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            message: 'User created successfully',
            user: user
        });
    } catch (err) {
        res.status(409).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            message: 'All users',
            users: users
        });
    }    
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).populate('questions').populate('answers');
        res.status(200).json({
            message: 'User found',
            user: user
        });
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateUser = async (req, res) => {
    //find check the password req.body.password for authentication and then only update the details
    try{
        const user = await User.findById(req.params.id);
        if(user.password == req.body.oldpassword){
            console.log("Authentication successful");
            user.name = req.body.name;
            user.email = req.body.email;
            user.bio = req.body.bio;
            user.profilePic = req.body.profilePic;
            user.password = req.body.password;
            user.save();
            res.status(200).json({
                status: 'success',
                message: 'User updated successfully',
                user: user
            });
        }
        else{
            res.status(401).json({
                message: 'Authentication failed'
            });
        }
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}


