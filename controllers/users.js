// CRUD for the admin(will be protected)
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/errorResponse');

// @route     POST /api/v1/users
exports.createUser = asyncHandler(async (req, res, next) => {
	const user = await User.create(req.body);

	res.status(201).json({
		success: true,
		data: user,
	});
});

// @route     GET /api/v1/users?users
exports.getallUsers = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const all = await User.find();

	if (!User) {
		return next(
			new ErrorResponse('Something got wrong with users collection', 500),
		);
	}

	res.status(200).json({ success: true, data: all });
});
