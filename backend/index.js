require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongoDB } = require('./config/database');
const { router } = require('./routes');
const { ApiError } = require('./errors/ApiError');
const {
    errorHandlerMiddleware,
} = require('./middleware/errorHandlerMiddleware');

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        optionsSuccessStatus: 200,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);
app.use('/*', (_, __, next) => {
    return next(ApiError.notFoundUrl());
});

app.use(errorHandlerMiddleware);

const start = () => {
    connectMongoDB();
    app.listen(PORT, () => {
        console.log('The server is running on port ' + PORT);
    });
};

start();
