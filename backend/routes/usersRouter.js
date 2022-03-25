const usersRouter = require('express').Router();
const { usersController } = require('../controllers/usersController');
const { authMiddleware } = require('../middleware/authMiddleware');

usersRouter.post('/register', usersController.register);
usersRouter.post('/login', usersController.login);
usersRouter.get('/auth', authMiddleware, usersController.auth);

module.exports = { usersRouter };
