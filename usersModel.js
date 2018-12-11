// User Model, requiring mongoose and the mongoose schema to work with mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// setting up the schema
const UsersSchema = new Schema({
	// email address field (for their username)
	email_address: {
		type: String,
		required: 'Please enter the email address'
	},
	// password field
	password: {
		type: String,
		required: 'Please enter the password'
	},
	// reason to join field
	university: {
		type: [{
			type: String,
			enum: ['Revision', 'Research', 'Making Friends', 'Socialising']
		}],
		default: ['Other']
	},
	// created date field
	created_date: {
		type: Date,
		default: Date.now
	},
	// admin level field
	admin_level: {
		type: Boolean,
		default: true
	}
})

// setup the model for use
module.exports = mongoose.model('Users', UsersSchema)
