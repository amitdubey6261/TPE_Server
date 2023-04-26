const express = require('express')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cors());

const db = require('./config/db.js');


app.get('/' , (req , res , next)=>{
    res.send('get hitted')
})


app.use(errorMiddleware);


module.exports = app ;