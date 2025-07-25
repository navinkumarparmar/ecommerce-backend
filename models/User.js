const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = new mongoose.Schema({
    name :{ 
        type: String,
        required:true,
     },
     email:{
        type: String,
        required:true,
        unique:true
     },
     password: {
        type:String,
        select:false
     }

},{
    timestamps:true
}
);


userModel.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const UserModel = mongoose.model('User', userModel);
module.exports = UserModel;
