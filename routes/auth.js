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
//   const { username, password } = req.body;
//   // check if we have a user with that username in the database
//   User.findOne({ username: username }).then((userFromDB) => {
	
//     if (userFromDB === null) {
//       // if not -> the username is not correct -> show login again
//       res.status(400).json({ message: "incorrect credentials" });
//     }
//     // username is correct
//     // we check the password from the input against the hash in the database
//     // compareSync() returns true or false
//     if (bcrypt.compareSync(password, userFromDB.password)) {
//       // if it matches -> all credentials are correct
//       // we log the user in
//       req.session.user = userFromDB;
//       res.status(200).json(userFromDB);
//     } else {
//       // if the password is not matching -> show the form again
//       res.status(400).json({ message: "incorrect credentials" });
//     }
//   });
});

// router.post("/signup", (req, res, next) => {
//   console.log(req.body);
//   const { username, password } = req.body;
//   // validation
//   // is the password 4+ chars
//   if (password.length < 4) {
//     // if not show the signup form again with a message
//     res.status(400).json({ message: "Your password needs to be 4 chars min" });
//     return;
//   }
//   // is the username empty
//   if (username.length === 0) {
//     res.status(400).json({ message: "Username cannot be empty" });
//     return;
//   }
//   // validation passed
//   // we now check if the username already exists
//   User.findOne({ username: username }).then((userFromDB) => {
//     // if user exists
//     if (userFromDB !== null) {
//       // we render signup again
//       res.status(400).json({ message: "Username is already taken" });
//     } else {
//       // if we reach this line the username can be used
//       // password as the value for the password field
//       const salt = bcrypt.genSaltSync();
//       const hash = bcrypt.hashSync(password, salt);
//       console.log(hash);
//       // we create a document for that user in the db with the hashed
//       User.create({ username: username, password: hash })
//         .then((createdUser) => {
//           console.log(createdUser);
//           // log the user in
//           req.session.user = createdUser;
//           res.status(200).json(createdUser);
//         })
//         .catch((err) => {
//           next(err);
//         });
//     }
//   });
// });

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

// router.get("/loggedin", (req, res, next) => {
//   console.log(
//     "this is the loggedin in user from the session: ",
//     req.session.user
//   );
//   const user = req.session.user;
//   res.json(user);
// });

router.delete('/logout', (req, res) => {
	req.logout();
	res.status(200).json({ message: 'Successful Logout' });
})

module.exports = router;
