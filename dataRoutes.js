// requirements moved to the global level to satisfy ESLint
const quizSR = require('../controllers/quizController')
const userSR = require('../controllers/usersController')
const questionSR = require('../controllers/questionsController')
const answerSR = require('../controllers/answerController')

module.exports = function(app) {
	// require the controllers so that the routes can call the functions within them
	const quizS = quizSR
  const userS = userSR
	const questionS = questionSR
	const answerS = answerSR

	// in total 5 post (Create) requests, 3 get (Retrieve) requests, 3 put (Update) requests, 3 delete (Delete) requests

	// Routes that do not require a token
	// setup route
	app.route('/api/users/authenticate')
		// post request calling the authenticate_user function from the user controller
		.post(userS.authenticate_user)

	// setup route
	app.route('/api/users')
		// post request calling the create_a_user function from the user controller
		.post(userS.create_a_user)

	// setup route
	app.route('/api/tokencheck')
		// post request calling the token_check function from the user controller
		.post(userS.token_check)

	// All Routes below require token verification, as they all use the verification function
	app.use(userS.verification)

	// setup route for quiz 
	app.route('/api/quiz')
		// get request calling the list_all_quiz function from the quiz controller
		.get(quizS.list_all_quiz)
		// post request calling the create_an_quiz function from the quiz controller
		.post(examS.create_an_exam)

	// setup route with quizId parameter
	app.route('/api/quiz/:quizId')
		// put request calling the update_an_quiz function from the quiz controller
		.put(quizS.update_an_quiz)
		// delete request calling the delete_an_quiz function from the quiz controller
		.delete(quizS.delete_an_quiz)
    
    // Other User Routes
	// setup route
	app.route('/api/userslist')
		// get request calling the list_all_users function from the user controller
		.get(userS.list_all_users)

	// setup route with userId paramater
	app.route('/api/users/:userId')
		// put request calling the update_a_user function from the user controller
		.put(userS.update_a_user)
		// delete request calling the delete_a_user function from the user contoller
		.delete(userS.delete_a_user)

	// Question Routes
	// setup route
	app.route('/api/questions')
		// get request calling the list_all_questions function from the question controller
		.get(questionS.list_all_questions)
		// post request calling the create_a_question function from the question controller
		.post(questionS.create_a_question)

	// setup route with questionId parameter
	app.route('/api/questions/:questionId')
		// put request calling the update_a_question function from the question controller
		.put(questionS.update_a_question)
		// delete request calling the delete_a_question function from the question controller
		.delete(questionS.delete_a_question)

  // Answer Routes
	// setup route
	app.route('/api/answers')
		// get request calling the list_all_answers function from the answer controller
		.get(answerS.list_all_answers)
		// post request calling the create_a_answer function from the answer controller
		.post(answerS.create_a_answer)

	// setup route with answerId parameter
	app.route('/api/answer/:answerId')
		// put request calling the update_a_answer function from the answer controller
		.put(answerS.update_a_answer)
		// delete request calling the delete_a_answer function from the answer controller
		.delete(answerS.delete_a_answer)
}
