var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Administrators = new Schema({
	id 			: Number, 
	name 		: String, 
	password 	: String
});

var Players = new Schema({
	id 				: Number, 
	name 			: String, 
	email 			: String,
	password 		: String,
	roundsPlayed 	: Number
});

var GameQuestions = new Schema({
	id 			: Number, 
	question 	: String, 
	one 		: String,
	cross 		: String,
	two 		: String,
	answere 	: String
});

var CurrentRound = new Schema({
	id 					: Number, 
	round 				: Number, 
	currentGameQuestion : Number,
	currentScore 		: Number,
	user 				: Number
});

var Round = new Schema({
	id 		: Number, 
	q1 		: Number, 
	q2 		: Number,
	q3 		: Number,
	q4 		: Number,
	q5 		: Number
});

var Highscore = new Schema({
	id 			: Number, 
	name		: String, 
	totalScore 	: Number
});

var Comment = new Schema({
    username : String,
    password : String,
    content  : String,
    created  : Date
});
 
mongoose.model( 'Comment', Comment ); 
mongoose.connect( 'mongodb://localhost/express-comment' );