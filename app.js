const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const next = require('./next');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();
const blogpost = require('./routes/blogpost');
const auth = require('./routes/auth');
const users = require('./routes/users');
const comments = require('./routes/comments');

const app = express();

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());

app.use('/api/v1/auth', auth);
app.use('/api/v1/blogpost', blogpost);
app.use('/api/v1/users', users);
app.use('/api/v1/comments', comments);

const port = process.env.PORT || 5000;

const start = async (port) => {
    await next(app);
    app.listen(port,(err)=> {
        if (err) throw err
        console.log('server listening on http://localhost:5000')
    });
}

start(5000);
