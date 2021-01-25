const { nanoid } = require('nanoid');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/errorResponse');
const User = require('../models/User');

// eslint-disable-next-line consistent-return
exports.signup = asyncHandler(async (req, res, next) => {
	const {
		username, name, email, password, role,
	} = req.body;

	if (!email) {
		return next(new ErrorResponse('Email is taken!', 400));
	}

	// create user
	const profile = nanoid(12);
	const user = await User.create({
		username,
		name,
		email,
		password,
		role,
		profile,
	});

	sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}
	console.log(email, password);
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	sendTokenResponse(user, 200, res);
});

exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		data: {},
	});
});

exports.loggedinUser = asyncHandler(async (req, res, next) => {
	// user is already available in req due to the protect middleware(added)
	const { user } = req;

	res.status(200).json({
		success: true,
		data: user,
	});
});

function sendTokenResponse(user, statusCode, res) {
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
		),
		httpOnly: true,
	};

	res.status(statusCode).cookie('token', token, options)
		.json({ success: true, token });
}
