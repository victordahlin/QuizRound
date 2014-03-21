var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');


module.exports.controller = function(app) {

	app.get('/question', function(req,res){
		res.render('main');


	});


}