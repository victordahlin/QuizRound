var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

var administrators = db.get('Administrators');
administrators.insert({
	name 		: "admin", 
	password 	: "rootroot"
});

var player = db.get('Player');
administrators.insert({
	name 			: "user", 
	email			: "test@test.com",
	password 		: "root",
	roundsPlayed 	: 5
});

var gameQuestions = db.get('GameQuestions');
gameQuestions.insert({
	question 		: "admin", 
	one 			: "rootroot",
	cross 			: "rot",
	two 			: "meep", 
	answere 		: ""
});

var currentRound = db.get('CurrentRound');
currentRound.insert({
	round 				: "admin", 
	currentGameQuestion : "rootroot",
	currentScore 		: "rot",
	user 				: "meep"
});

var round = db.get('Round');
round.insert({
	q1 : "admin", 
	q2 : "rootroot",
	q3 : "rot",
	q4 : "meep",
	q5 : "",
});

var highscore = db.get('Highscore');
highscore.insert({
	name 		: "",
	totalScore 	: ""
});
