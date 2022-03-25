const mongoose = require('mongoose');
const { generateJwt } = require('../utils');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required'],
        },
        email: {
            type: String,
            required: [true, 'Email required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password required'],
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

const generateUserObject = (user, tokenized = true) => {
    return Object.assign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        tokenized
            ? {
                  token: generateJwt(user._id),
              }
            : {},
    );
};

module.exports = { User, generateUserObject };
