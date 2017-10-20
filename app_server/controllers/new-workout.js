const mongodb = require('../models/mongodb')
const sleep = require('system-sleep');
module.exports.newWorkout = function (req, res) {
    res.render('new-workout', {title: 'Create new workout'})
};

module.exports.create = function (req, res) {
    var workout = {
        name: req.body.name
    };

    mongodb.insert(workout);
    sleep(1);
    res.redirect('/');
};