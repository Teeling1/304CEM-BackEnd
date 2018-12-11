// require mongoose for working with mongodb
const mongoose = require('mongoose')
const Answer = mongoose.model('Answers')

// function for listing all answers
exports.list_all_answer = function(req, res) {
	// finds all
	Answer.find({}, (err, answer) => {
		if (err)
			res.send(err)
		res.json(answer)
	})
}

// function for creating a answer
exports.create_a_answer = function(req, res) {

	// sets up new answer from the request body
	const newAnswer = new Answer(req.body)
  
	// saves the new answer
	newAnswer.save((err, answer) => {
		if (err)
			res.send(err)
		res.json(answer)
	})
}

// function for deleting a answer
exports.delete_a_answer = function(req, res) {
	// removes the answer by its _id from the answerId parameter
	Answer.remove({
		_id: req.params.answerId
	}, (err) => {
		if (err)
			res.send(err)
		res.json({ message: 'Answer successfully deleted' })
	})
}

// function for updating a answer
exports.update_a_answer = function(req, res) {
	// finds the answer by its _id from the answerId parameter and updates it with the request body
	Answer.findOneAndUpdate({_id: req.params.answerId}, req.body, {new: true}, (err, answer) => {
		if (err)
			res.send(err)
		res.json(answer)
	})
}
