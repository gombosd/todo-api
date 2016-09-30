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
	if(!req.body.title){
		return res.json({
			err: "title is required"
		})
	}

	var todo = new Todo({
		title: req.body.title
	})

	todo.save(function (err) {
	  if (err) {
	    return res.json(err);
	  } 

	  res.json(todo);
	});
});

//list Todo
app.get('/todos', function(req, res){
	Todo.find({}, function(err, todos){
		if(err){
			return res.json(err);
		}

		res.json(todos);
	})
});

//del Todo
app.delete('/todos/:todoId', function(req, res){
	Todo.remove({_id: req.params.todoId}, function(err){
		if(err){
			return res.json(err);
		}
		res.json({
			message: "todo removed"
		})

	});
});

//app listener
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
