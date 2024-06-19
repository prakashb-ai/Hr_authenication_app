const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        ;
        if (token) {
            return res.status(200).json({ message: "Token  found",data:token });
        }
        

        const decoded = jwt.verify(token, 'JWT_SECRET');
        req.user = decoded.user;

        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid token" });
    }
}