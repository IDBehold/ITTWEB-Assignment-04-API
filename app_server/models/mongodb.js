var mongo = require('mongodb');
var mongoClient = mongo.MongoClient ;
var assert = require('assert');

var url = 'mongodb://test:test@ds129004.mlab.com:29004/heroku_6nwjgkpw';



module.exports.getAll = function (callback) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        collection.find({}).toArray(function (err, workouts) {
            assert.equal(null, err);
            callback(workouts);
        });
        db.close();
    });
};

module.exports.insert = function (workout) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        collection.insertOne(workout);
        db.close();
    });
};

module.exports.insertExercise = function (exercise, id) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        var o_id = new mongo.ObjectID(id);
        collection.updateOne({'_id' : o_id}, { $push : {exercises :exercise} });
        db.close();
    });
};

module.exports.delete = function (workoutId) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        var o_id = new mongo.ObjectID(workoutId);
        collection.deleteOne({'_id' : o_id});
        db.close();
    });
};