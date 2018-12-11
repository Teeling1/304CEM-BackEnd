// require mongoose for working with mongodb
const mongoose = require('mongoose')
const Question = mongoose.model('Questions')

// function for listing all questions
exports.list_all_questions = function(req, res) {
	// finds all
	Question.find({}, (err, question) => {
		if (err)
			res.send(err)
		res.json(question)
	})
}

// function for creating a question
exports.create_a_question = function(req, res) {

	// sets up new question from the request body
	const newQuestion = new Question(req.body)
  
	// saves the new question
	newQuestion.save((err, question) => {
		if (err)
			res.send(err)
		res.json(question)
	})
}

// function for deleting a question
exports.delete_a_question = function(req, res) {
	// removes the question by its _id from the questionId parameter
	Question.remove({
		_id: req.params.questionId
	}, (err) => {
		if (err)
			res.send(err)
		res.json({ message: 'Question successfully deleted' })
	})
}

// function for updating a question
exports.update_a_question = function(req, res) {
	// finds the question by its _id from the questionId parameter and updates it with the request body
	Question.findOneAndUpdate({_id: req.params.questionId}, req.body, {new: true}, (err, question) => {
		if (err)
			res.send(err)
		res.json(question)
	})
}
