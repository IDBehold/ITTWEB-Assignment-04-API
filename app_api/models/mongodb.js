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

module.exports.getId = function (id, callback) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        var o_id = new mongo.ObjectID(id);
        collection.findOne({_id:o_id}, function(err, doc) {
            assert.equal(null, err);
            callback(doc);
        });
        db.close();
    });
};

module.exports.insert = function (workout, callback) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        collection.insert(workout, function(err, r) {
            assert.equal(null, err);
            callback(r.ops[0]);
        });

        db.close();
    });
};

module.exports.insertExercise = function (exercise, id, callback) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        var o_id = new mongo.ObjectID(id);
        collection.update({'_id' : o_id}, { $push : {exercises :exercise} }, function(err, r) {
            assert.equal(null, err);
            callback(r);
        });
        db.close();
    });
};

module.exports.insertExercise = function (exercise, id, callback) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        var o_id = new mongo.ObjectID(id);
        collection.update({'_id' : o_id}, { $push : {exercises :exercise} }, function(err, r) {
            assert.equal(null, err);
            callback(r);
        });
        db.close();
    });
};

module.exports.updateCount = function (id, callback) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        var o_id = new mongo.ObjectID(id);
        collection.update({'_id' : o_id}, { $inc: {count: 1}}, function(err, r) {
            assert.equal(null, err);
            callback(r);
        });
        db.close();
    });
};

module.exports.delete = function (workoutId, callback) {
    mongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to DB");
        var collection = db.collection('Workouts');
        var o_id = new mongo.ObjectID(workoutId);
        collection.deleteOne({'_id' : o_id}, function(err, r) {
            assert.equal(null, err);
            callback(r);
        });
        db.close();
    });
};