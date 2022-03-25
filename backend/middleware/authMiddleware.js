const jwt = require('jsonwebtoken');
const { User, generateUserObject } = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res
            .status(401)
            .json({ message: 'Authorization header not applied' });
    }
    const token = auth.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not applied' });
    }
    if (auth?.startsWith('Bearer')) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded._id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = generateUserObject(user, false);
            return next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    return res.status(401).json({ message: 'Bad authorization header' });
};

module.exports = { authMiddleware };
