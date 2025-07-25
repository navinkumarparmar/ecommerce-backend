const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = 3001
const connectDb = require('./models/db');
//database
connectDb();
const seedProducts = require('./seed/productSeed');
//product seeds
seedProducts();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
const routes = require('./routes/index');

//routes
app.use('/api',routes);

app.use((req,res,next)=>{
    res.status(404).json({
        success: false,
        message:"Route not found",
        path: req.originalUrl
    })
})
app.listen(port,()=>{
    console.log(`your server is running on port ${port}`);
})