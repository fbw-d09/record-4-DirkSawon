const User = require('./models/User.js');
const { connect, closeConnection } = require('./configs/db.js');

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

};

exports.getUser = async (req, res) => {

};

exports.updateUser = async (req, res) => {

};

exports.deleteUser = async (req, res) => {

};
