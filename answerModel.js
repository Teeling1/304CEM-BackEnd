// Answer Model, requiring mongoose and the mongoose schema to work with mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// setting up the schema
const AnswerSchema = new Schema({
	// parent answer field
	parent_answer: {
		type: String,
		required: 'Please select answer'
	},
	// answer field
	answer: {
		type: String,
		required: 'Please enter the answers question'
	},
	// created date field
	created_date: {
		type: Date,
		default: Date.now
	},
})

// setup the model for use
module.exports = mongoose.model('Answer', AnswerSchema)
