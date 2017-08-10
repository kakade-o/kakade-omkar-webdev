var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
//app.use(favicon(path.join(__dirname, 'public','images','apple.png')));

app.use(cookieParser());
app.use(session({ secret: "put text here" }));
//app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

require ("./test/app.js")(app);

require('./assignment/app')(app);

var port = process.env.PORT || 3000;

app.listen(port);