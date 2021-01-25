const Comment = require('../models/Comment.js');
const BlogPost = require('../models/Blog.js');
const ErrorResponse = require('../helpers/errorResponse');
const asyncHandler = require('../middleware/async');

// @description      Add Comment
// @route  POST /api/v1/blogpost/:blogid/comment
exports.addComment = asyncHandler(async (req, res, next) => {
	req.body.blog = req.params.id;
	req.body.postedBy = req.user.id;

	const post = await BlogPost.findById(req.params.id);

	if (!BlogPost) {
		return next(
			new ErrorResponse(`Blogpost not found with id of ${req.params.id}`, 404),
		);
	}

	const comment = await Comment.create(req.body);
	console.log(comment);
	res.status(200).json({
		success: true,
		data: comment,
	});
});

// @description      Get all Comments(for one post)
// @route     GET /api/v1/blogposts/:blogid/comments
exports.getComments = asyncHandler(async (req, res, next) => {
	if (req.params.id) {
		const post = await BlogPost.findById(req.params.id);

		if (!BlogPost) {
			return next(
				new ErrorResponse(`Blogpost not found with id of ${req.params.id}`, 404),
			);
		}
	}

	const comments = await Comment.find();

	if (!Comment) {
		return next(
			new ErrorResponse('Something got wrong with Comments collection', 500),
		);
	}

	res.status(200).json({
		success: true,
		data: comments,
	});
});

// @description      Get single Comment
// @route     GET /api/v1/Comments/:id
exports.getComment = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const comment = await Comment.findById(req.params.id);

	if (!comment) {
		return next(
			new ErrorResponse(`No Comment found with the id of ${req.params.id}`, 404),
		);
	}

	res.status(200).json({
		success: true,
		data: comment,
	});
});

// @desc      Delete Comment(only admin allowed)
// @route     DELETE /api/v1/Comments/:id
exports.deleteComment = asyncHandler(async (req, res, next) => {
	const comment = await Comment.findById(req.params.id);

	if (!Comment) {
		return next(
			new ErrorResponse(`No Comment with the id of ${req.params.id}`, 404),
		);
	}

	if (req.user.role !== 'admin') {
		return next(new ErrorResponse('Not authorized to delete this comment', 401));
	}

	await comment.remove();

	res.status(200).json({
		success: true,
		data: {},
	});
});
