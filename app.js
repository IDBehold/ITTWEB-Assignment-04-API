require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var index = require('./app_server/routes/index');

var newExercise = require('./app_server/routes/new-exercise');
var newWorkout = require('./app_server/routes/new-workout');

//API
var indexApi = require('./app_api/routes/workout');
require('./app_api/models/mongodb');
require('./app_api/config/passport');

var app = express();

app.use(cors());
app.options('*', cors());
mongoose.connect('mongodb://test:test@ds129004.mlab.com:29004/heroku_6nwjgkpw');


// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', index);
app.use('/new-exercise', newExercise);
app.use('/new-workout', newWorkout);
//API
app.use('/api', indexApi);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message": err.name + ": " + err.message})
    } else {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
});

module.exports = app;
