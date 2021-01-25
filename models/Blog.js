const mongoose = require('mongoose');

const BlogPost = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	body: {
		type: String,
		trim: true,
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	tags: {
		type: String,
		ref: 'Tag',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	}],
});

module.exports = mongoose.model('BlogPost', BlogPost);
