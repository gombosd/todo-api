var mongoose = require('mongoose');

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
	},
	owner: {
		type: String,
		required: true
	} 
});

module.exports = Todo;