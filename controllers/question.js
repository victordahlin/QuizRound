var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {

	app.get('/question', function(req,res){
		//kolla user, använd för att hitta current round, och 
		//använd sen current round för att hitta rätt fråga
		var currentRoundDB = db.get('CurrentRound');
		var cookieUser = req.cookies.user;
		var currentRound;
		var currentQuestion;
		var currentScore;
		currentRoundDB.find({user : cookieUser}, {}, function(e, current){

			currentRound = current[0].round;			
			currentQuestion = parseInt(current[0].currentGameQuestion);
			currentScore = parseInt(current[0].currentScore);
			console.log(currentQuestion);
			if( currentQuestion > 5 ) {
				//Här borde det hända lite fler saker. 
				//Typ lägga till en highscore
				//Och ta bort den currentround som finns
				res.redirect('../result');
			} else {

				var roundDB = db.get('Round');
				var question;
			
				roundDB.find({_id : currentRound},{}, function(e, round){

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

					var questionDB = db.get('GameQuestions');

					var correctQ;
					console.log(question);
					questionDB.find({_id:question},{}, function(e,que){
						console.log(question);
						correctQ = que[0];
						res.render('question', { 
							title : "Question " + currentQuestion,
							q : correctQ.question,
							one : correctQ.one,
							cross : correctQ.cross,
							two : correctQ.two,
							round : currentQuestion,
						});
					});
				});
			}
		});
	});

	app.post('/question', function(req,res){
		var one = req.body.one;		
		var cross = req.body.cross;
		var two = req.body.two;

		var r = parseInt(req.body.round)+1;
		//console.log(r);
		
		var u = req.cookies.user;
		//console.log(u);
		
		var qest = req.body.question;
		//console.log(qest);

		var gameQuestionDB = db.get('GameQuestions');
		gameQuestionDB.find({ question : qest },{}, function(e,q){
			var ans = q[0].answere;
			
			var correct = 0;
			if(one != undefined && one == ans) { 
				correct = 5;
			} 

			if(two != undefined && two == ans) {
				correct = 5;
			}

			if(cross != undefined && cross == ans) {
				correct = 5;
			}
		//	console.log(ans);
		//	console.log(correct);

			var currentRoundDB = db.get('CurrentRound');
			currentRoundDB.update( 
				{ user : u },
				{ $set : { currentGameQuestion : r },
				  $inc : { currentScore : correct } 
				});
    		res.redirect('../question');
		});

    

	});


}