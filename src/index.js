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

// als controller in routen auslagern: 
app.post('/orders/', async (req, res) => {
    console.log(req.body);

    const { id, qty } = req.body;

    try {
        connect().then(async (db) => {
            const newOrder = new Order({
                id,
                qty
            });

            console.log(newOrder);

            newOrder
            .save()
            .then(doc => {
                res.status(201).json({
                    success: true,
                    data: doc
                })
            })
            .catch(err => {
                res.status(400).json({
                    success: false,
                    message: err.message
                });
            })

        })
        
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf port ${ port }`);
});
