var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {
  
  app.get('/createAdmin', function(req,res) {
    res.render('createAdmin',{
      title : "Create new admin"    
    });
  });
  
  app.post('/createAdmin', function(req,res){  

    var n = req.body.uid;
    var p = req.body.pwd;

	var administrators = db.get('Administrators');
	administrators.insert({
		name 		: n, 
		password 	: p
	});
    res.redirect('../admin');

  });

}