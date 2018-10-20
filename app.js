var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/locallibra';

//connect database
try{
  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  console.log("Connecting to mongodb");
}
catch(ex){
  var db = mongoose.connection();
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/home', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.use(function (req, res, next) {
  res.status(404);
  res.render('404.pug', {title : '404 Page not found'});
  next();
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error has occured');
});

module.exports = app;
