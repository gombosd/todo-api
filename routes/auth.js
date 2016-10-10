var express = require('express');
var User = require('../models/user');

var router = express.Router();

// register
router.post('/signup', function(req, res){
	if(!req.body.email){
		return res.json({
			err: "Email is required"
		})
	}

	if(!req.body.password){
		return res.json({
			err: "Password is required"
		})
	}

	var user = new User({
		email: req.body.email,
		password: req.body.password
	})

	user.save(function (err) {
	  if (err && err.code===11000) {
	    return res.json({
	    	message: "Already existing email."
	    });
	  }

	  if (err) {
	    return res.json(err);
	  } 

	  res.json(user);
	});
});

// login
router.post('/login', function(req, res){
	if(!req.body.email){
		return res.json({
			err: "Email is required"
		})
	}

	if(!req.body.password){
		return res.json({
			err: "Password is required"
		})
	}

	User.findOne({email: req.body.email}, function(err, user){
		if (err) {
	    return res.json(err);
	  }

	  if (!user) {
	  	return res.json({
	  		message: "Wrong username or password"
	  	});
	  }

	  if (user.password!== req.body.password) {
	  	return res.json({
	  		message: "Wrong username or password"
	  	});
	  }

	  res.json({
	  	message: "login success!"
	  })
	});
});

module.exports = router;