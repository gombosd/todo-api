var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var todoRouter = require('./routes/todo');
var authRouter = require('./routes/auth');
var expressJwt = require('express-jwt');

//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-api');

//express middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// todos routes
var secret = require('./config').secret;
app.use('/api/todos', expressJwt({secret: secret}), todoRouter);


// auth routes
app.use('/api/auth', authRouter);


app.use(function(err, req, res, next){
	res.status(400).json(err)
})

//bad map
app.use('/*',function(req, res){
	res.send("Page not found")
});

//app listener
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});