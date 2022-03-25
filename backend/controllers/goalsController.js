const { ApiError } = require('../errors/ApiError');
const { Goal } = require('../models/goalModel');
const { User } = require('../models/userModel');

class GoalsController {
    // @desc Get all goals
    // @route GET /api/goals
    // @access Private
    async get(req, res) {
        try {
            const goals = await Goal.find({ user: req.user._id });
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
            const goal = await Goal.findOne({
                _id: req.params.id,
                user: req.user._id,
            });
            if (!goal)
                return next(ApiError.notFound('Goal not found for this user'));
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
            const goal = await Goal.create({ text, user: req.user._id });
            return res.status(201).json(goal);
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
            const updatedGoal = await Goal.findOneAndUpdate(
                { _id: req.params.id, user: req.user._id },
                { text },
                { new: true },
            );
            if (!updatedGoal) {
                return next(ApiError.notFound('Goal not found for this user'));
            }
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
            const deletedGoal = await Goal.findOneAndDelete({
                _id: req.params.id,
                user: req.user._id,
            });
            if (!deletedGoal) {
                return next(ApiError.notFound('Goal not found for this user'));
            }
            return res.status(200).json({ _id: req.params.id });
        } catch (err) {
            return next(ApiError.badRequest('Bad database request'));
        }
    }
}

module.exports = { goalsController: new GoalsController() };