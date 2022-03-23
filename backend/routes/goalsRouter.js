const router = require('express').Router();
const goalsController = require('../controllers/goalsController');

router.route('/').get(goalsController.get).post(goalsController.create);

router
    .route('/:id')
    .get(goalsController.getOne)
    .put(goalsController.updateOne)
    .delete(goalsController.deleteOne);

module.exports = router;
