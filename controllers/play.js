var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {

	app.get('/play', function(req,res){

		//Här ska vi först kolla om det finns någon current round för den aktuella spelaren.
		//Om det inte finns det, så ska användaren få välja en runda.
		var currentDB = db.get('CurrentRound');
		var currentUser = req.cookies.user;

		currentDB.find({user : currentUser}, {}, function(e,user){
			if(user[0] != undefined && user[0].currentGameQuestion < 6){
				//console.log(user[0]);
				res.redirect('/question');
			}
			else{
				var game = db.get('Round');

				game.find({},{}, function(e, rounds){
					//console.log(rounds[0]);
					res.render('play', { 
						title : "Play",
						'Rounds' : rounds,
						chooseRound : "Choose round"
					});
				});
			}
		});		
	});

	app.post('/play', function(req,res){
		var pickedRound = req.body.roundID;
		var currentUser = req.cookies.user;

		var currentRound = db.get('CurrentRound');

		currentRound.insert({
			round : pickedRound, // sätt värde
			currentGameQuestion : 1, // något värde
			currentScore : 0, 
			user : currentUser
		});

		res.redirect('../question');

		//Här ska vi alltid skapa en currentRound.
		//När vi har gjort det så skickar vi vidare till question.

	});

}