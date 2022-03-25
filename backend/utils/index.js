const jwt = require('jsonwebtoken');

const generateJwt = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
};

module.exports = { generateJwt };
