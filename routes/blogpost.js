const express = require('express');
const {
	celebrate, Joi, errors, Segments,
} = require('celebrate');
const { protect, authorize } = require('../middleware/auth');
const {
	createBlogpost,
	getBlogpost,
	getallBlogposts,
	deleteBlogpost,
	addComment,
} = require('../controllers/blogposts');

const BlogPost = require('../models/Blog');

const router = express.Router({ mergeParams: true });

router.route('/')
	.get(getallBlogposts)
	.post(protect,
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				title: Joi.string().required(),
				body: Joi.string().required(),
			}),
		}), createBlogpost);

router.route('/:id')
	.get(getBlogpost)
	.delete(protect, authorize('admin'), deleteBlogpost);

module.exports = router;
