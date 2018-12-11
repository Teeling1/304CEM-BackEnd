// require mongoose for working with mongodb, and the quiz model
const mongoose = require('mongoose')
const Quiz = mongoose.model('Quiz')

// function for listing all quizzes
exports.list_all_quizzes = function(req, res) {
	// finds all
	quiz.find({}, (err, quiz) => {
		if (err)
			res.send(err)
		res.json(quiz)
	})
}

// function for creating an quiz
exports.create_an_quiz = function(req, res) {

// function for updating any quiz
exports.update_an_quiz = function(req, res) {

	// finds the quiz by its _id from the quizId parameter and updates it with the request body
	Quiz.findOneAndUpdate({_id: req.params.quizId}, req.body, {new: true}, (err, quiz) => {
		if (err)
			res.send(err)
		res.json(quiz)
	})
}

// function for deleting a quiz
exports.delete_an_quiz = function(req, res) {

	// removes the quiz by its _id from the examId parameter
	Quiz.remove({
		_id: req.params.quizId
	}, (err) => {
		if (err)
			res.send(err)
		res.json({ message: 'Quiz removed' })
	})
}
