var mongoose = require('mongoose');

var User = mongoose.model('User', { 
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	}, 
	password: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	} 
});

module.exports = User;