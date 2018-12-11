//Quiz model, requiring mongoose and the mongoose schema to work with mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// setting up the schema
const QuizSchema = new Schema({
	// name field
	name: {
		type: String,
		required: 'Please enter the name of the quiz'
	},
	// quiz field
	quiz: {
		type: [{
			type: String,
			enum: ['History', 'Science', 'Mathematics', 'French']
		}],
		default: ['Other']
	},
	
	// created date field
	created_date: {
		type: Date,
		default: Date.now
	}
// setup the model for use
module.exports = mongoose.model('Quiz', QuizSchema)
