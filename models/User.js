const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('email-validator');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			max: 32,
			unique: true,
			index: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32,
		},
		email: {
			type: String,
			trim: true,
			required: [true, 'Please add an email'],
			unique: true,
			lowercase: true,
		},
		profile: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 8,
			select: false,
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
);

userSchema.path('email').validate((email) => {
	if (!validator.validate(email)) { return false; }
	if (!email) { return false; }
	if (email.length === 0) { return false; }
	return true;
}, 'Email must have a valid format!');

// hash password only if it has been modified
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(13);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
	return resetToken;
};

module.exports = mongoose.model('User', userSchema);
