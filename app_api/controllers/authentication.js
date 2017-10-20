const mongoose = require('mongoose');
require('../models/users');
const User = mongoose.model('User');

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            "message": "Email and password are required"
        });
        return;
    }
    User.findOne({'email': req.body.email}).exec(function (err, user) {
        var valid = user.validPassword(req.body.password);
        var token;
        if (!valid) {
            res.status(404).json({
                "message": err
            });
        } else {
            token = user.generateJwt();
            res.status(200).json({
                "token": token
            });
        }
    });
};

module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).json({
            "message": "All fields required"
        });
        return;
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function (err) {
        var token;
        if (err) {
            res.status(404).json({
                "message": err
            });
        } else {
            token = user.generateJwt();
            res.status(200).json({
                "token": token
            });
        }
    });
};