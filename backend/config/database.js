const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = { connectMongoDB };
