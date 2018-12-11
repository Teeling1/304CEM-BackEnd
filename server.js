// require express as that is what we will be using
const express = require('express'),
	app = express(),
  
	// set the port number
	portno = 3000,
  
	// setup the port
	port = process.env.PORT || portno,
	// require mongoose and the config file
	mongoose = require('mongoose'),
	Config = require('./api/con/config'),
  
	// Users, Quiz, Questions, Answers declared for use by Mongoose in the controllers (by which they are indeed used)
	Users = require('./api/models/usersModel'),
	Quiz = require('./api/models/quizModel'),
	Questions = require('./api/models/questionsModel'),
  Answers = require('./api/models/answersModel'),
  
	// bodyParser for parsing the request bodies
	bodyParser = require('body-parser')

// setup the mongoose connection using the database connection details from the config file
mongoose.Promise = global.Promise
mongoose.connect(Config.db)

// parsing for the JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// import and register routes
const routes = require('./api/routes/dataRoutes')
routes(app)

// binds and listens for connections to the port
app.listen(port)

// output message to indicate server start
console.log('RESTful API server for Examination Website started on: ' + port)
