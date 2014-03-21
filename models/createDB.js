var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

var administrators = db.get('Administrators');
administrators.insert({
	name 		: "admin", 
	password 	: "rootroot"
});

var player = db.get('Player');
player.insert({
	name 			: "user", 
	email			: "test@test.com",
	password 		: "root",
	roundsPlayed 	: 5
});

var gameQuestions = db.get('GameQuestions');
gameQuestions.insert({
	question 		: "Where is Waldo?", 
	one 			: "In spot one",
	cross 			: "In spot cross",
	two 			: "In spot two", 
	answere 		: "one"
});

var currentRound = db.get('CurrentRound');
currentRound.insert({
	round 				: "RoundID", 
	currentGameQuestion : 1,
	currentScore 		: 0,
	user 				: "UserID"
});

var round = db.get('Round');
round.insert({
	name : "Roundplaceholder",
	q1 : "QuestionID1", 
	q2 : "QuestionID2",
	q3 : "QuestionID3",
	q4 : "QuestionID4",
	q5 : "QuestionID5"
});

var highscore = db.get('Highscore');
highscore.insert({
	name 		: "UserID",
	totalScore 	: 0
});