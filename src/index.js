require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const Order = require('./models/Order.js');
const Record = require('.models/Record.js');
const User = require('./models/User.js');

const { connect, closeConnection } = require('./configs/db.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT;

app.post('/Orders/', async (req, res) => {
    console.log(req.body);

    const { }
})