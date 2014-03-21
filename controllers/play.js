var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

//require('../models/createDB');

module.exports.controller = function(app) {

	app.get('/play', function(req,res){

		//Här ska vi först kolla om det finns någon current round för den aktuella spelaren.
		//Om det inte finns det, så ska användaren få välja en runda.
		var game = db.get('Round');

		game.find({},{}, function(e, rounds){
			res.render('play', { 
				title : "Play",
				'Rounds' : rounds,
				chooseRound : "Choose round"
			});
		});

		
	});

	app.post('/play', function(req,res){
		var pickedRound = req.body.roundID;
		var currentUser = req.cookies.user;

		var currentRound = db.get('CurrentRound');

		/*currentRound.insert({
			round : pickedRound, // sätt värde
			currentGameQuestion : 1, // något värde
			currentScore : 0, 
			user : currentUser
		});*/

		res.redirect('../question');

		//Här ska vi alltid skapa en currentRound.
		//När vi har gjort det så skickar vi vidare till question.

	});

	app.get('/question', function(req,res){
		//kolla user, använd för att hitta current round, och 
		//använd sen current round för att hitta rätt fråga
		var currentRoundDB = db.get('CurrentRound');
		var cookieUser = req.cookies.user;
		var currentRound;
		var currentQuestion;
		currentRoundDB.find({user : cookieUser}, {}, function(e, current){
			currentRound = current[0].round;
			currentQuestion = current[0].currentGameQuestion;
		});



		var roundDB = db.get('Round');
		var question;
		roundDB.find({id : currentRound},{}, function(e, round){
			//var q = "q" + currentQuestion;
			switch(currentQuestion){
				case 1: 
					question = round[0].q1;
					break;
				case 2: 
					question = round[0].q2;
					break;
				case 3: 
					question = round[0].q3;
					break;
				case 4: 
					question = round[0].q4;
					break;
				case 5: 
					question = round[0].q5;
					break;
			}

			res.render('question', { 
				title : question 
			});

			//console.log(question);

		});
	});

	app.post('/question', function(req,res){
		//Uppdatera currentRound med om svaret var rätt osv.

		//Skicka antingen till nästa question eller till slutview

	});


}