const mongodb = require('../models/mongodb')
module.exports.index = function (req, res) {
    mongodb.getAll(function (workouts) {
        res.render('index', {title: 'Fitness App-Grp19', workouts: workouts})
    });
};

module.exports.delete = function (req, res) {
    mongodb.delete(req.body.id);
}