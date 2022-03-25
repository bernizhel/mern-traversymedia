const jwt = require('jsonwebtoken');
const { ApiError } = require('../errors/ApiError');
const { User } = require('../models/userModel');
const { generateJwt } = require('../utils');

const authMiddleware = async (req, _, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return next(ApiError.unauthorizedAuthorizationHeader());
    }
    const token = auth.split(' ')[1];
    if (!token) {
        return next(ApiError.unauthorizedToken());
    }
    if (auth?.startsWith('Bearer')) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded._id);
            if (!user) {
                return next(ApiError.unauthorizedUser());
            }
            req.user = { _id: user._id };
            return next();
        } catch (err) {
            return next(ApiError.unauthorized());
        }
    }
    return next(ApiError.unauthorizedAuthorizationHeaderInvalid());
};

module.exports = { authMiddleware };
