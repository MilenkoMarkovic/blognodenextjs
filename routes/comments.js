const express = require('express');
const {
	celebrate, Joi, errors, Segments,
} = require('celebrate');
const Comment = require('../models/Comment');
const { protect, authorize } = require('../middleware/auth');
const {
	addComment,
	getComment,
	getComments,
	deleteComment,
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

router.route('/')
	.get(getComments);

router.route('/:id')
	.post(protect, addComment)
	.get(getComment)
	.delete(protect, authorize, deleteComment);

module.exports = router;
