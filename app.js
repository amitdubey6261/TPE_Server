const express = require('express')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');

const user = require('./routes/userRoutes');

app.use(cookieParser());
app.use(express.json());
app.use(cors());

const db = require('./config/db.js');

app.use('/api/v1' , user);




app.use(errorMiddleware);


module.exports = app ;