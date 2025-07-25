const jwt = require('jsonwebtoken');

module.exports.verifyToken = async function(req,res,next) {
 

     try {
         const token = req.headers['token'];
         if(!token){
            return res.status(404).json({
                message: "token not found"
            })
         }
         const verified = jwt.verify(token,process.env.JWT_SECRET);
         req.user =verified;
         next()
        
     } catch (error) {

        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
        
     }
}


module.exports.verifyTokenOptional = (req, res, next) => {
  const token = req.headers['token'];
  if (!token) {
    req.user = null;  
    return next();
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};