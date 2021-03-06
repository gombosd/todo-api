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
		title: req.body.title,
		owner: req.user._id
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
	Todo.find({owner: req.user._id}, function(err, todos){
		if(err){
			return res.json(err);
		}

		res.json(todos);
	})
});

//del Todo
router.delete('/:todoId', function(req, res){
	Todo.findById(req.params.todoId, function (err, todo) {
		if (err) {
	  		return res.json(err);
	  	}
	  
	  	if(todo===null){
	  		return res.json({
	  			message: "már nem létezik a todo"
	  		})
	  	}

		if (req.user._id !== todo.owner) {
		  	return res.json({
		  		message: "Nem a tied a törölni kívánt todo"
		  	})
	  	}	

	  	todo.remove(function(err){
	  		if (err) {
	  			return res.json(err);
	  		}

	  		res.json({
					message: "todo removed"
				})
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

	  if (req.user._id !== todo.owner) {
	  	return res.json({
	  		message: "Nem a tied a modosítani kívánt todo"
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

	  if (req.user._id !== todo.owner) {
	  	return res.json({
	  		message: "Nem a tied a lekért todo"
	  	})
	  }
	  res.json(todo);
	});
});

module.exports = router;