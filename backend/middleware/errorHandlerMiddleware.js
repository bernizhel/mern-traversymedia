const { ApiError } = require('../errors/ApiError');

const errorHandlerMiddleware = (err, _, res, __) => {
    if (err instanceof ApiError) {
        return res.status(err.code).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Unpredictable error' });
};

module.exports = { errorHandlerMiddleware };
