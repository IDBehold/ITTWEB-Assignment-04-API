const mongodb = require('../models/mongodb')
const sleep = require('system-sleep');
const uuid = require('uuid');
module.exports.newExercise = function (req, res) {
    mongodb.getAll(function (workouts) {
        res.render('new-exercise', {title: 'Create new exercise', workouts: workouts})
    });
};

module.exports.createExercise = function (req, res) {
    var exercise = {
        id: uuid(),
        exercise: req.body.exercise,
        description: req.body.description,
        set: req.body.set,
        reps: req.body.reps
    };

    mongodb.insertExercise(exercise, req.body.id);
    sleep(1);
    res.redirect('/');
};