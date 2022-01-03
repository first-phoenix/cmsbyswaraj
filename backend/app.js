const express = require('express');

const app = express();

const errormiddleware = require('./middleware/error');

app.use(express.json());

//route imports
const product = require('./routes/productRoute');

app.use("/api/v1",product);

//middleware for errors
app.use(errormiddleware);

module.exports = app;