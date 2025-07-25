const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    try {
        const userBody = req.body;
       
        // check if user already exists
        const existingUser = await User.findOne({ email:userBody.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newUser = new User(userBody);
        await newUser.save();

        res.status(201).json({ 
            success:true,
            message: 'User registered successfully',

         });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ 
             success:false,
            message: 'Something went wrong',
            error:error.message
        });
    }
};



module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
       if(!email || !password){
        return res.status(400).json({
            message: "email and password are required"
        })
       }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ 
                message: 'email not exist'
             });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                message: 'Invalid email or password'
             });
        }

        // create token
        const token = jwt.sign({ id: user._id ,email:user.email}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({
            success:true,
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ 
            success:false,
            message: 'Something went wrong',
            error: error.message
         });
    }
};
