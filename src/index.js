require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/users.js');
const orders = require('./routes/orders.js');
const records = require('./routes/records.js');

const { connect, closeConnection } = require('./configs/db.js');

const app = express();

const Chance = require('chance');
const chance = new Chance();

// write function to return object:
const chanceFirstname = chance.first();
const chanceLastname = chance.last();
const chanceCompany = chance.company().replace(' ', '');
const chanceEmail = `${ chanceFirstname }.${ chanceLastname }@provider.${ chance.country().toLowerCase() }`;
const chancePassword = chance.string({ length: 10 });

console.log("random firstname:", chanceFirstname);
console.log("random lastname:", chanceLastname);
console.log("random company:", chanceCompany);
console.log("random email:", chanceEmail);
console.log("random pw:", chancePassword);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", users);
app.use("/orders", orders);
app.use("/records", records);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server läuft auf port ${ port }`);
});
