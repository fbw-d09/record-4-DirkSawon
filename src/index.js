require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/users.js');
const orders = require('./routes/orders.js');
const records = require('./routes/records.js');

const { connect, closeConnection } = require('./configs/db.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", users);
app.use("/orders", orders);
app.use("/records", records);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server läuft auf port ${ port }`);
});
