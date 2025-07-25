const Product = require('../models/Product');

module.exports.listAll = async function(req,res,next) {
    try {
    const products = await Product.find({});
    if(products.length===0){
        return res.status(400).json({
            message:"product not found"
        })
    }
    res.status(200).json({ 
        success: true, 
        data:products 
    });
  } catch (error) {
    res.status(500).json({ 
        success: false,
         message: 'Something went wrong' 
    });
  }
    
}