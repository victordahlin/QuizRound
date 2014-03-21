var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

//require('../models/createDB');

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


  app.get('/main', function(req,res){
    //Här ska användaren få ett antal alternativ
    //Välkommen, användare. Du har hittills spelat x rundor
    //1. Gå en runda
    //2. Se Highscores



    var userid = req.cookies.user;

    var con = db.get('Player');

    con.find({_id : userid},{},function(e,u){


      res.render('main', {

        title : "Welcome, " + u[0].name,
        status : "So far you have played " + u[0].roundsPlayed + " rounds."
      });

    });

 
  });


  app.get('/highscore', function(req,res) {
      var highscore = db.get('Highscore');

      highscore.find({},{},function(e,scores){
        res.render('highscore', {
          'highscore' : scores
        });
      });
  });


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