const express = require('express');
const { protect } = require('../middleware/auth');
const {
	signup,
	login,
	logout,
	loggedinUser,
} = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/loggedinUser', protect, loggedinUser);
router.get('/logout', logout);

module.exports = router;
