var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//express middleware
app.use(bodyParser.json());

//Todos model
var Todo = mongoose.model('Todo', { 
	title: {
		type: String,
		required: true
	}, 
	completed: {
		type: Boolean,
		default: false 
	},
	created_at: {
		type: Date,
		default: Date.now
	} 
});

//add Todo
app.post('/todos',function(req, res){
	var todo = new Todo({
		title: req.body.title
	})

	todo.save(function (err) {
	  if (err) {
	    return res.send(err);
	  } 

	  res.send(todo)
	});

});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
