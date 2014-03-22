var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {

  app.get('/', function(req,res){
    res.redirect('../login');
  });

  app.get('/login', function(req, res) {
    res.render('index', { title: 'Enter username and password' });
  });

  app.post('/login', function(req, res){

      var user = req.body.username;
      var pass = req.body.password;

      // Log in administrators to admin page
      var administrators = db.get('Administrators');
      administrators.find({name : user, password : pass}, {}, function(e, admin){
          if(admin[0] != undefined){
          res.redirect('../admin');
        }
      });

      // Log in player to main page
      var player = db.get('Player');
      player.find({name : user, password : pass}, {}, function(e, users){
        if(users[0] != undefined){
          res.cookie('user', users[0]._id);
          res.redirect('../main');
        }
        else{
          //Annars laddas sidan om med ett felmeddelande
          res.render('index', {title: 'Enter username and password' , name: 'Wrong username or password, try again'});
        }
      });
  });

}