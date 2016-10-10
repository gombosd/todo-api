var express = require('express');
var Todo = require('../models/todo');

var router = express.Router();

//add Todo
router.post('/',function(req, res){
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
router.get('/', function(req, res){
	Todo.find({}, function(err, todos){
		if(err){
			return res.json(err);
		}

		res.json(todos);
	})
});

//del Todo
router.delete('/:todoId', function(req, res){
	Todo.remove({_id: req.params.todoId}, function(err){
		if(err){
			return res.json(err);
		}
		res.json({
			message: "todo removed"
		})

	});
});

//update Todo
router.put('/:todoId', function(req, res){
	Todo.findById(req.params.todoId, function (err, todo) {
	  if (err) {
	  	return res.json(err);
	  }
	  
	  if(todo===null){
	  	return res.json({
	  		message: "már nem létezik a todo"
	  	})
	  }

	  if(req.body.title){
	  	todo.title = req.body.title;
	  }

	  if(req.body.completed){
	  	todo.completed = req.body.completed;
	  }
	  
	  todo.save(function (err, todo) {
	    if (err) {
	  		return res.json(err);
	  	}
	  	res.json(todo);
	  });
	});
});

//get Todo
router.get('/:todoId', function(req, res){
	Todo.findById(req.params.todoId, function (err, todo) {
	  if (err) {
	  	return res.json(err);
	  }
	  if(todo===null){
	  	return res.json({
	  		message: "már nem létezik a todo"
	  	});
	  }
	  res.json(todo);
	});
});

module.exports = router;