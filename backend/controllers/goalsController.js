class GoalsController {
    // @desc Get all goals
    // @route GET /api/goals
    // @access Private
    async get(req, res, next) {
        if (!req.body.text) {
            res.status(400);
            return next(new Error('Add text field'));
        }
        return res.status(200).json({ message: 'getAll' });
    }

    // @desc Get one goal
    // @route GET /api/goals/:id
    // @access Private
    async getOne(_, res) {
        return res.status(200).json({ message: 'getOne' });
    }

    // @desc Create a goal
    // @route POST /api/goals
    // @access Private
    async create(_, res) {
        return res.status(200).json({ message: 'create' });
    }

    // @desc Update one goal
    // @route PUT /api/goals/:id
    // @access Private
    async updateOne(_, res) {
        return res.status(200).json({ message: 'updateOne' });
    }

    // @desc Delete one goal
    // @route DELETE /api/goals/:id
    // @access Private
    async deleteOne(_, res) {
        return res.status(200).json({ message: 'deleteOne' });
    }
}

module.exports = new GoalsController();
