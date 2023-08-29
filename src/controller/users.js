const User = require('../models/User.js');
const { connect, closeConnection } = require('../configs/db.js');

exports.createNewUser = async (req, res) => {
    console.log(req.body);

    const { id, firstname, lastname, email, password } = req.body;

    try {
        connect().then(async (db) => {
            const newUser = new User({
                id,
                firstname,
                lastname,
                email,
                password
            });

            console.log(newUser);

            newUser
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

exports.getAllUsers = async (req, res) => {
    try {
        connect().then(async (db) => {
            User
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

exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        connect().then(async, (db) => {
            User
            .findOne({ _id: id})
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

exports.updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        connect().then(async (db) => {
            User
            .findOne({ _id: id})
            .then(doc => {
                doc.firstname = req.body.firstname || doc.firstname;
                doc.lastname = req.body.lastname || doc.lastname;
                doc.email = req.body.email || doc.email;
                doc.password = req.body.password || doc.password;

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

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        connect().then(async (db) => {
            User
            .deleteOne({ _id: id })
            .then(doc => {
                res.status(200).json({
                    success: false,
                    message: "User wurde gelöscht"
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
