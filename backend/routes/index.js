const router = require('express').Router();
const { goalsRouter } = require('./goalsRouter');

router.use('/goals', goalsRouter);

module.exports = { router };
