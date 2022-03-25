const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'User required'],
            ref: 'User',
        },
        text: {
            type: String,
            required: [true, 'Text required'],
        },
    },
    {
        timestamps: true,
    },
);

const Goal = mongoose.model('Goal', goalSchema);

module.exports = { Goal };
