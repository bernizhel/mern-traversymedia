require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');

const port = process.env.PORT ?? 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.use(errorMiddleware);

const start = () => {
    app.listen(port, () => {
        console.log('The server is running on port ' + port);
    });
};

start();
