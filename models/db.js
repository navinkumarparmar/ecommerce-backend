const mongoose = require('mongoose');

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("succesfully connected database")
        
    } catch (error) {
        console.log("error",error.message);
        console.log("error",error);
        
    }
}


module.exports = connectDb;