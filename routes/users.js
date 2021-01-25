const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const {
	createUser,
	getallUsers,
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

router.route('/')
	. get(protect, authorize('admin'), getallUsers)
	. post(createUser);

module.exports = router;
