var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressListEndpoints = require('express-list-endpoints')
require('dotenv').config();

const compression = require('compression')
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

const router = require('./routes/index');
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => {
  console.log(err);
});
async function main() {
  console.log('connecting')
  await mongoose.connect(mongoDB);
}

var app = express();

app.use(compression());
app.use(helmet());
app.use(limiter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
// console.log(expressListEndpoints(app));


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
