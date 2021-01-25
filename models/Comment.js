const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	body: String,
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BlogPost',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Comment', Comment);
