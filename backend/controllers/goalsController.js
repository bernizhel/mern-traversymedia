const { ApiError } = require('../errors/ApiError');
const { Goal } = require('../models/goalModel');

class GoalsController {
    // @desc Get all goals
    // @route GET /api/goals
    // @access Private
    async get(_, res) {
        try {
            const goals = await Goal.find();
            return res.status(200).json(goals);
        } catch (err) {
            return next(ApiError.badRequest('Bad database request'));
        }
    }

    // @desc Get one goal
    // @route GET /api/goals/:id
    // @access Private
    async getOne(req, res, next) {
        try {
            const goal = await Goal.findById(req.params.id);
            if (!goal) return next(ApiError.notFound('The goal not found'));
            return res.status(200).json(goal);
        } catch (err) {
            return next(ApiError.badRequest('Bad database request'));
        }
    }

    // @desc Create a goal
    // @route POST /api/goals
    // @access Private
    async create(req, res, next) {
        const text = req.body.text;
        if (!text) return next(ApiError.badRequest('Text field not applied'));
        try {
            const goal = await Goal.create({ text });
            return res.status(200).json(goal);
        } catch (err) {
            return next(ApiError.badRequest('Bad database request'));
        }
    }

    // @desc Update one goal
    // @route PUT /api/goals/:id
    // @access Private
    async updateOne(req, res, next) {
        const text = req.body.text;
        if (!text) return next(ApiError.badRequest('Text field not applied'));
        try {
            const updatedGoal = await Goal.findByIdAndUpdate(
                req.params.id,
                { text },
                { new: true },
            );
            if (!updatedGoal)
                return next(ApiError.notFound('The goal not found'));
            return res.status(200).json(updatedGoal);
        } catch (err) {
            return next(ApiError.badRequest('Bad database request'));
        }
    }

    // @desc Delete one goal
    // @route DELETE /api/goals/:id
    // @access Private
    async deleteOne(req, res, next) {
        try {
            const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
            if (!deletedGoal) {
                return next(ApiError.notFound('The goal not found'));
            }
        } catch (err) {
            return next(ApiError.badRequest('Bad database request'));
        }
        return res.status(200).json({ id: req.params.id });
    }
}

module.exports = { goalsController: new GoalsController() };
