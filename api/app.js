const createError = require('http-errors')
const mongoose = require('mongoose');
const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const db = require('../config/keys').mongoURI;

/**
* Routes
*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const routes = {
	"/": require('./routes/index'),
	"/armies/": require('./routes/armies'),
}

// MongoDB

mongoose
	.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', true);
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	// Pass to next layer of middleware
	next();
})
app.use(logger('dev'))
Object.keys(routes).forEach(key => {
	app.use(key, routes[key])
})
// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app