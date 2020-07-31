const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.as)

const webRoutes = require('./routes/web_home.js');

// connect database
MONGO_URI = 'mongodb://localhost:27017/mean_db';
mongoose.connect(MONGO_URI).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
// ends here ~ connect database

// all middleware
app.use(express.json())
app.use(morgan('dev'))
// ends here ~ all middleware

app.use('/',webRoutes);

module.exports = app;