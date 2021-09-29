// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// session configuration
const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB_URL = 'mongodb://localhost/project-3';

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		// for how long is the user logged in -> this would be one day 	
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: true,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: DB_URL
		})
	})
)
// end of session configuration

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/api/auth", auth);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
