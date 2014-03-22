var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {

  app.get('/createPlayer', function(req,res){
      var game = db.get('Player');
      
      game.find({},{},function(e,player){
        res.render('createPlayer', { 
          title           : 'Add player info',
          'questions'     : player
        });
      });
  });

  app.post('/createPlayer', function(req,res){
    var player = db.get('Player');

    var n = req.body.name;
    var e = req.body.email;
    var p = req.body.password;

    player.insert({
      name : n,
      email : e,
      password : p,
      roundsPlayed : 0
    });
    res.redirect('../login');
  });

}