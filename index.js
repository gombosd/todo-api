var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var todoRouter = require('./routes/todo');

//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//express middleware
app.use(bodyParser.json());

// todos routes
app.use('/todos', todoRouter);

//bad map
app.get('/*',function(req, res){
	res.send("Page not found")
});

//app listener
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
