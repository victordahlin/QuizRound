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
      var player = db.get('Player');

      player.find({name : user, password : pass}, {}, function(e, users){

        if(users[0] != undefined){
          //den här ska istället redirecta till en main
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