const bcrypt = require('bcryptjs');
const { ApiError } = require('../errors/ApiError');
const { User, generateUserObject } = require('../models/userModel');

class UsersController {
    // @desc Register user
    // @route POST /api/users/register
    // @access Public
    async register(req, res, next) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(
                ApiError.badRequestUserFields(req.body, [
                    'name',
                    'email',
                    'password',
                ]),
            );
        }
        try {
            if (await User.findOne({ email })) {
                return next(ApiError.alreadyExistsUser());
            }
        } catch (err) {
            return next(ApiError.databaseError());
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            if (!user) {
                return next(ApiError.badRequestUserFieldsInvalid());
            }
            return res.status(201).json(generateUserObject(user));
        } catch (err) {
            return next(ApiError.databaseError());
        }
    }

    // @desc Authenticate user
    // @route POST /api/users/login
    // @access Public
    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(
                ApiError.badRequestUserFields(req.body, ['email', 'password']),
            );
        }
        try {
            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                return res.status(200).json(generateUserObject(user));
            }
            return next(ApiError.badRequestUserFieldsInvalid());
        } catch (err) {
            return next(ApiError.databaseError());
        }
    }

    // @desc Get user data
    // @route GET /api/users/auth
    // @access Private
    async auth(req, res, next) {
        try {
            const user = await User.findById(req.user._id);
            return res.status(200).json(generateUserObject(user, false));
        } catch (err) {
            return next(ApiError.databaseError());
        }
    }
}

module.exports = { usersController: new UsersController() };
