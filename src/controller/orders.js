const Order = require('./models/Order.js');
const { connect, closeConnection } = require('./configs/db.js');

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