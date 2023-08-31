const Order = require('../models/Order.js');
const { connect, closeConnection } = require('../configs/db.js');

exports.createNewOrder = async (req, res) => {
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
};

exports.getAllOrders = async (req, res) => {
    try {
        connect().then(async (db) => {
            Order
            .find({})
            .then(docs => {
                res.status(200).json({
                    success: true,
                    data: docs
                })
            })
            .catch(err => {
                res.status(404).json({
                    success: false,
                    message: err.message
                })
            })
        })
    } catch (error) {
        console.log(error.message);
    }
};

exports.getOrder = async (req, res) => {
    const { id } = req.params;

    try {
        connect().then(async, (db) => {
            Order
            .findOne({ id: id}) // .findOne({ _id: id})
            .then(doc => {
                res.status(200).json({
                    success: true,
                    data: doc
                });
            })
            .catch(err => {
                res.status(404).json({
                    success: false,
                    message: err.message
                })
            })
        })
    } catch (error) {
        console.log(error.message);
    }
};

exports.filterOrders = async (req, res) => {

};

exports.updateOrder = async (req, res) => {
    const { id } = req.params;

    try {
        connect().then(async (db) => {
            Order
            .findOne({ id: id}) // eigentlich .findOne({ _id: id })
            .then(doc => {
                doc.id = req.body.id || doc.id;
                doc.qty = req.body.qty || doc.qty;

                doc.save()
                .then(doc => res.status(200).json({
                    success: true,
                    newData: doc
                }))
                .catch(err => res.status(400).json({
                    success: true,
                    message: err.message
                }));
            })
            .catch(err => console.log(err))
        });
    } catch (error) {
        
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        connect().then(async (db) => {
            Order
            .deleteOne({ id: id }) // .deleteOne({ _id: id })
            .then(doc => {
                res.status(200).json({
                    success: false,
                    message: "Bestellung wurde gelöscht"
                })
            })
            .catch(err => {
                res.status(404).json({
                    success: false,
                    message: err.messsage
                })
            })
        })
    } catch (error) {
        console.log(error.message);
    }
};
