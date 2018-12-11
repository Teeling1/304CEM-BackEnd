// Question Model, requiring mongoose and the mongoose schema to work with mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// setting up the schema
const QuestionsSchema = new Schema({
	// parent quiz field
	parent_quiz: {
		type: String,
		required: 'Please select quiz'
	},
	// content field
	content: {
		type: String,
		required: 'Please enter the question content'
	},
	// answer field
	answer: {
		type: String,
		required: 'Please enter the question answer'
	},
	// created date field
	created_date: {
		type: Date,
		default: Date.now
	},
})

// setup the model for use
module.exports = mongoose.model('Questions', QuestionsSchema)
