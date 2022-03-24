const goalsRouter = require('express').Router();
const { goalsController } = require('../controllers/goalsController');

goalsRouter.route('/').get(goalsController.get).post(goalsController.create);

goalsRouter
    .route('/:id')
    .get(goalsController.getOne)
    .put(goalsController.updateOne)
    .delete(goalsController.deleteOne);

module.exports = { goalsRouter };
