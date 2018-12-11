// require mongoose for working with mongodb, and the user model
const mongoose = require('mongoose')
// require password-hash for hashing (encrypting) the passwords
const pH = require('password-hash')
// require jsonwebtoken for creating the json web token (for authentication use)
const jwt = require('jsonwebtoken')
const User = mongoose.model('Users')
// require the config file for the use of the SLC
const Config = require('../con/config')
const noToken = 403

// function for verification where appropriate of requests, checking they have a valid token
exports.verification = function(req, res, next) {
	// checks the request body, query and headers for the token
	const token = req.body.token || req.query.token || req.headers['auth-token']
	// attempt to decode token to see if it is indeed a valid one
	  if (token) {
		jwt.verify(token, Config.SLC, (err, decoded) => {
			// if decode unsuccessful, return false success and appropriate message
		  if (err) {
				return res.json({ success: false, message: 'Invalid Token.' })
		  } else {
				req.decoded = decoded
				next()
		  }
		})
		// if here is no token at all, return false success and appropriate message
	  } else {
		return res.status(noToken).send({
			success: false,
			message: 'Token required.'
		})
	  }
}

// function for checking if the user already has a token
exports.token_check = function(req, res) {
	// the token is taken specifically from the request body
	const token = req.body.token
	// check if it can be decoded
	if (token) {
		jwt.verify(token, Config.SLC, (err, decoded) => {
		// if not, return false success and appropriate message
			if (err) {
				return res.json({ success: false, message: 'Invalid Token.' })
			} else {
				// if successful return true success
				req.decoded = decoded
				res.json({ success: true })
			}
		})
		// if no token at all, return false success and appropriate message
	} else {
		return res.status(noToken).send({
			success: false,
			message: 'Token required.'
		})
	}
}

// function for authenticating the user (user login)
exports.authenticate_user = function(req, res) {
	// find the user by their email address from the request body
	User.findOne({ email_address: req.body.email_address }, (err, user) => {
		if (err) throw err
		// if there is no matching user, return false success and appropriate message
		if (!user) {
		  res.json({ success: false, message: 'Authentication failed. Invalid Email Address.' })
		} else if (user) {
			// if there is a matching user, check the password, hashing it to check it matches
		  if (pH.verify(req.body.password, user.password) !== true) {
				// if the password does not match, return false success and appropriate message
				res.json({ success: false, message: 'Authentication failed. Invalid Password.' })
		  } else {
				// but if successful create the token, return true success and appropriate message
				const payload = {
		  admin_level: user.admin_level
				}
				const token = jwt.sign(payload, Config.SLC, {
				// expires in 24 hours
			  expiresIn: 1440
				})
				res.json({
			  success: true,
			  message: 'Token Granted.',
			  token: token
				})
		  }
		}
	  })
}

// function for listing all users
exports.list_all_users = function(req, res) {
	// finds all
	User.find({}, (err, user) => {
		if (err)
			res.send(err)
		res.json(user)
	})
}

// function for creating a user
exports.create_a_user = function(req, res) {
	// take the request body password and hash it in as the password
	const phPass = pH.generate(req.body.password)
	// setup the new user with the request body and the freshly hashed password
	const newUser = new User(req.body)
	newUser.password = phPass
	// save the new user
	newUser.save((err, user) => {
		if (err)
			res.send(err)
		res.json(user)
	})
}


// function for deleting a user
exports.delete_a_user = function(req, res) {
	// delete the user by its _id taken from the userId parameter in the request
	User.remove({
		_id: req.params.userId
	}, (err) => {
		if (err)
			res.send(err)
		res.json({ message: 'User successfully deleted' })
	})
}
