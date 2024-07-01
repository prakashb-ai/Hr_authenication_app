const jwt = require('jsonwebtoken');
const Usermodel = require('./models/user.model');

const middleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, 'JWT_SECRET');  // Replace 'JWT_SECRET' with your actual secret
        const user = await Usermodel.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;  // Attaching the user to the request object
        next();
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = middleware;
