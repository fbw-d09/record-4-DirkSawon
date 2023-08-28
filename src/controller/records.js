const Record = require('.models/Record.js');
const { connect, closeConnection } = require('./configs/db.js');

exports.createNewRecord = async (req, res) => {
    console.log(req.body);

    const { id, title, artist, year, cover, price } = req.body;

    try {
        connect().then(async (db) => {
            const newRecord = new Record({
                id,
                title,
                artist,
                year,
                cover,
                price
            });

            console.log(newRecord);

            newRecord
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

exports.getAllRecords = async (req, res) => {

};

exports.getRecord = async (req, res) => {

};

exports.updateRecord = async (req, res) => {

};

exports.deleteRecord = async (req, res) => {

};