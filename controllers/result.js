var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {


	app.get('/result', function(req,res){


		var currentRoundDB = db.get('CurrentRound');
		var currentUser = req.cookies.user;


		currentRoundDB.find({user : currentUser}, {}, function(e, round){

			var userDB = db.get('Player');

			userDB.find({_id:currentUser},{},function(e,user){

				res.render('result', {
					title : "Result",
					player : user[0].name,
					points : round[0].currentScore

				});
			});

		});

	});


	app.post('/result', function(req,res){


		//Att göra:
		//1. Lägg till en runda på användaren
		//2. Lägg in en highscore
		//3. Ta bort currentRound
		//4. Redirecta till main

		var currentUser = req.cookies.user;
		var currentScore;





		var currentRoundDB = db.get('CurrentRound');
		currentRoundDB.find({user : currentUser},{}, function(e2, curr){

			currentScore = curr[0].currentScore;

			currentRoundDB.remove({user : currentUser}, {}, function(e3, result){
				if (e3) {
					console.log(e + "Something went wrong when removing");
				};
				var userDB = db.get('Player');

				userDB.find({_id:currentUser}, {}, function(e4, user){
					var highscoreDB = db.get('Highscore');
					highscoreDB.insert({
						name : user[0].name,
						totalScore : currentScore
					});
				});



				userDB.update(
				{_id : currentUser},
				{$inc : {roundsPlayed: 1}
				});

				res.redirect('../main');
			});

		});

	});


}