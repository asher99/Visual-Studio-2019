
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');	 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');	
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	
app.use(logger('dev'));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));	 
app.use(logger('dev'));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));	
app.use('/', indexRouter);
app.use('/users', usersRouter);	

module.exports = app;	 

