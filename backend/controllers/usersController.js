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
            const message =
                'Not applied ' +
                ['name', 'email', 'password']
                    .filter((i) => !req.body[i])
                    .join(', ');
            return next(ApiError.badRequest(message));
        }
        try {
            if (await User.findOne({ email })) {
                return res.status(409).json({ message: 'User already exists' });
            }
        } catch (err) {
            return next(ApiError.badRequest('Bad database request'));
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
                return next(ApiError.badRequest('Invalid user data'));
            }
            return res.status(201).json(generateUserObject(user));
        } catch (err) {
            return next(ApiError.badRequest('Bad database request'));
        }
    }

    // @desc Authenticate user
    // @route POST /api/users/login
    // @access Public
    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            const message =
                'Not applied ' +
                ['email', 'password'].filter((i) => !req.body[i]).join(', ');
            return next(ApiError.badRequest(message));
        }
        try {
            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                return res.status(200).json(generateUserObject(user));
            }
            return next(ApiError.badRequest('Invalid credentials'));
        } catch (err) {
            return next(ApiError.badRequest('Bad database request'));
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
            return next(ApiError.badRequest('Bad database request'));
        }
    }
}

module.exports = { usersController: new UsersController() };
