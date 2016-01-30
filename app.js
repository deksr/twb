var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// methodoverride
var methodOverride = require('method-override');

// added favicon for favicon error
var favicon = require('serve-favicon');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twb');
var db = mongoose.connection;

db.on('error', function(msg) {
console.log('connection error  :sob(', msg);
});


db.once('open', function() {
console.log('connection established :sweet)');
});



var routes = require('./routes/index');
var users = require('./routes/users');
var items = require('./routes/items');
var posts = require('./routes/posts');



// *****************
var app = express();

// added favicons in the images directory //? remove this in production? 
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));


// *********** dont touch below
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// *********don't touch above



// // *****8 above or this **8

// app.set('views', path.join(__dirname, 'views'));
// app.engine('.html', require('ejs').__express);
// app.set('view engine', 'html');


// // *********






// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// methodOverride
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));





app.use('/', routes);
app.use('/users', users);
app.use('/items', items);
app.use('/posts', posts);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("message from error handler:")
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
