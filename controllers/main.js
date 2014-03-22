var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {

  app.get('/main', function(req,res){
    var userid = req.cookies.user;
    var con = db.get('Player');

    con.find({_id : userid},{},function(e,u){
      res.render('main', {
        title : "Welcome, " + u[0].name,
        status : "So far you have played " + u[0].roundsPlayed + " rounds."
      });
    }); 
  });

}