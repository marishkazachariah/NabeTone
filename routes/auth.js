const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require('passport');

router.post("/login", (req, res, next) => {
	passport.authenticate('local', (err, user) => {
		if (err) {
			return res.status(400).json({ message: 'Error while logging in' });
		}
		if (!user) {
			return res.status(400).json({ message: 'Wrong credentials' });
		}
		req.login(user, err => {
			if (err) {
				return res.status(500).json({ message: 'Error while logging in' });
			}
			return res.status(200).json(user);
		})
	})(req, res)
});


router.post('/signup', (req, res, next) => {
	// get username and password
	const { username, password } = req.body;
	// is the password at least 8 chars
	if (password.length < 8) {
		// if not we show the signup form again with a message
		return res.status(400).json({ message: 'Your password has to be 8 chars min' });
	}
	if (username === '') {
		return res.status(400).json({ message: 'Your username cannot be empty' });
	}
	// validation passed - password is long enough and the username is not empty
	// check if the username already exists
	User.findOne({ username: username })
		.then(userFromDB => {
			// if user exists -> we render signup again
			if (userFromDB !== null) {
				return res.status(400).json({ message: 'This username is already taken' });
			} else {
				// the username is available
				// we create the hashed password
				const salt = bcrypt.genSaltSync();
				const hash = bcrypt.hashSync(password, salt);
				console.log(hash);
				// create the user in the database
				User.create({ username: username, password: hash })
					.then(createdUser => {
						console.log(createdUser);
						// log the user in immediately
						// req.session.user = createdUser; -> this is the 'node-basic'auth-way'
						// this is the passport login
						req.login(createdUser, err => {
							if (err) {
								return res.status(500).json({ message: 'Error while attempting to login' })
							} else {
								return res.status(200).json(createdUser);
							}
						})
					})
					.catch(err => {
						res.json(err);
					})
			}
		})
});

router.post('/signup', (req, res, next) => {
	// get username and password
	const { username, password } = req.body;
	// is the password at least 8 chars
	if (password.length < 8) {
		// if not we show the signup form again with a message
		return res.status(400).json({ message: 'Your password has to be 8 chars min' });
	}
	if (username === '') {
		return res.status(400).json({ message: 'Your username cannot be empty' });
	}
	// validation passed - password is long enough and the username is not empty
	// check if the username already exists
	User.findOne({ username: username })
		.then(userFromDB => {
			// if user exists -> we render signup again
			if (userFromDB !== null) {
				return res.status(400).json({ message: 'This username is already taken' });
			} else {
				// the username is available
				// we create the hashed password
				const salt = bcrypt.genSaltSync();
				const hash = bcrypt.hashSync(password, salt);
				console.log(hash);
				// create the user in the database
				User.create({ username: username, password: hash })
					.then(createdUser => {
						console.log(createdUser);
						// log the user in immediately
						// req.session.user = createdUser; -> this is the 'node-basic'auth-way'
						// this is the passport login
						req.login(createdUser, err => {
							if (err) {
								return res.status(500).json({ message: 'Error while attempting to login' })
							} else {
								return res.status(200).json(createdUser);
							}
						})
					})
					.catch(err => {
						res.json(err);
					})
			}
		})
});

router.get('/loggedin', (req, res) => {
	console.log('this is the user from the session: ', req.user);
	res.json(req.user);
})

router.delete('/logout', (req, res) => {
	req.logout();
	res.status(200).json({ message: 'Successful Logout' });
})

module.exports = router;
