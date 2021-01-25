const BlogPost = require('../models/Blog.js');
const ErrorResponse = require('../helpers/errorResponse');
const asyncHandler = require('../middleware/async');

// @route   POST /api/v1/blogpost
exports.createBlogpost = asyncHandler(async (req, res, next) => {
	req.body.postedBy = req.user.id;
	console.log(req.body);
	console.log(req.user);
	const post = await BlogPost.create(req.body);

	res.status(201).json({
		success: true,
		data: post,
	});
});

// @route   GET /api/v1/blogpost/:id
exports.getBlogpost = asyncHandler(async (req, res, next) => {
	const post = await BlogPost.findById(req.params.id);

	if (!BlogPost) {
		return next(
			new ErrorResponse(`Blogpost not found with id of ${req.params.id}`, 404),
		);
	}

	res.status(200).json({ success: true, data: post });
});

// @route  GET /api/v1/blogpost?blogposts
exports.getallBlogposts = asyncHandler(async (req, res, next) => {
	const all = await BlogPost.find();

	if (!BlogPost) {
		return next(
			new ErrorResponse('Something got wrong with blogposts', 500),
		);
	}

	res.status(200).json({ success: true, data: all });
});

// @route  DELETE /api/v1/blogpost/:id
exports.deleteBlogpost = asyncHandler(async (req, res, next) => {
	const post = await BlogPost.findById(req.params.id);

	if (!post) {
		return next(
			new ErrorResponse(`Blogpost not found with id of ${req.params.id}`, 404),
		);
	}

	if (req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`User ${req.user.id} is not authorized to delete this blogpost!`,
				401,
			),
		);
	}

	await post.remove();

	res.status(200).json({ success: true, data: {} });
});
