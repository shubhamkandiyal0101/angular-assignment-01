const express = require('express');
const app = express();
const morgan = require('morgan')


const webRoutes = require('./routes/web_home.js');

// all middleware
app.use(express.json())
app.use(morgan('combined'))
// ends here ~ all middleware

app.get('/',webRoutes);

module.exports = app;