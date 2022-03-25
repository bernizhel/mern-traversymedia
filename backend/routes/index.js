const router = require('express').Router();
const { goalsRouter } = require('./goalsRouter');
const { usersRouter } = require('./usersRouter');

router.use('/goals', goalsRouter);
router.use('/users', usersRouter);

module.exports = { router };
