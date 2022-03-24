const { ApiError } = require('../errors/ApiError');

const errorHandlerMiddleware = (err, _, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.code).json({ message: err.message });
    }
    res.status(500).json({ message: 'Unpredictable error occured' });
    return next();
};

module.exports = { errorHandlerMiddleware };
