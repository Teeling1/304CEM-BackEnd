var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Users = require('./api/models/usersModel'),
Quiz = require('./api/models/quizModel'),
Questions = require('./api/models/questionsModel'),
Answers = require('./api/models/answersModel'),
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://adminXl:e3x2a16M@ds123946.mlab.com:23946/3-04-agb17');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/dataRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('RESTful API server for Quiz Maker Website started on: ' + port);
