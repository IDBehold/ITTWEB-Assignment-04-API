const mongodb = require('../models/mongodb');
const uuid = require('uuid');

module.exports.getAll = function (req, res) {
    mongodb.getAll(function (workouts) {
        res.status(200);
        res.json(workouts);
    });
};

module.exports.getId = function (req, res) {
    const id = req.params.id;
    mongodb.getId(id, function (workout) {
        if(!workout){
            res
                .status(404)
                .json({"message": "Not found " + id});
        }else{
            res
                .status(200)
                .json(workout);
        }
    });
};

module.exports.createWorkout = function (req, res) {
    if(!req.body.name){
        res
            .status(400)
            .json({"message": "name required"});
    }else{
        var workout = {
            name: req.body.name
        };

        mongodb.insert(workout, function (status) {
            res
                .status(201)
                .json(status);
        });
    }
};

module.exports.createExercise = function (req, res) {
    if (!req.body.id) {
        res
            .status(400)
            .json({"message": "id required"});
        return;
    }
    if (!req.body.exercise) {
        res
            .status(400)
            .json({"message": "exercise required"});
        return;
    }
    if (!req.body.description) {
        res
            .status(400)
            .json({"message": "description required"});
        return;
    }
    if (!req.body.set) {
        res
            .status(400)
            .json({"message": "set required"});
        return;
    }
    if (!req.body.reps) {
        res
            .status(400)
            .json({"message": "reps required"});
        return;
    }

    mongodb.getId(req.body.id, function (workout) {
        if (!workout) {
            res
                .status(400)
                .json({"message": "Workout not found"});
            return;
        }

        var exercise = {
            id: uuid(),
            exercise: req.body.exercise,
            description: req.body.description,
            set: req.body.set,
            reps: req.body.reps
        };

        mongodb.insertExercise(exercise, req.body.id, function (status) {
            if (status.result.ok) {

                mongodb.getId(req.body.id, function (workout) {
                    if(!workout){
                        res
                            .status(500)
                            .json({"message": "Error"});
                    }else{
                        res
                            .status(201)
                            .json(workout);
                    }
                });
            } else {
                res
                    .status(500)
                    .json({"message":"Error"});
            }
        });
    });
};


module.exports.countUp = function (req, res) {
    if (!req.params.id) {
        res
            .status(400)
            .json({"message": "id required"});
        return;
    }

    mongodb.updateCount(req.params.id, function (status) {
        if (status.result.ok) {
            mongodb.getId(req.params.id, function (workout) {
                if(!workout){
                    res
                        .status(500)
                        .json({"message": "Error"});
                }else{
                    res
                        .status(200)
                        .json(workout);
                }
            });
        }else {
            res
                .status(500)
                .json({"message":"Error"});
        }
    })
};

module.exports.delete = function (req, res) {
    if (!req.params.id) {
        res
            .status(400)
            .json({"message": "id required"});
        return;
    }
    mongodb.delete(req.params.id, function (status) {
        if(status.result.n > 0){
            res
                .status(200)
                .json({"message": "Succes"});
        }else{
            res
                .status(404)
                .json({"message": "Error not found"});

        }
    });
};