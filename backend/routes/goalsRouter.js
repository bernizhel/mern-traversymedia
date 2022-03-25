const goalsRouter = require('express').Router();
const { goalsController } = require('../controllers/goalsController');
const { authMiddleware } = require('../middleware/authMiddleware');

goalsRouter
    .route('/')
    .get(authMiddleware, goalsController.get)
    .post(authMiddleware, goalsController.create);

goalsRouter
    .route('/:id')
    .get(authMiddleware, goalsController.getOne)
    .put(authMiddleware, goalsController.updateOne)
    .delete(authMiddleware, goalsController.deleteOne);

module.exports = { goalsRouter };
