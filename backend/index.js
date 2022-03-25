require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongoDB } = require('./config/database');
const { router } = require('./routes');
const {
    errorHandlerMiddleware,
} = require('./middleware/errorHandlerMiddleware');

const port = process.env.PORT ?? 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.use(errorHandlerMiddleware);

const start = () => {
    connectMongoDB();
    app.listen(port, () => {
        console.log('The server is running on port ' + port);
    });
};

start();
