const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
    {
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
