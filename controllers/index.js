var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/QuizDB');

require('../models/createDB');

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
      var admin = db.get('Administrators');
      //admin.insert({name : user, password : pass });
      admin.find({name : user, password : pass}, {}, function(e, users){
        console.log(users.lenght);
        if(typeof users.lenght == 'undefined'){
            res.render('index', { title: 'Error, wrong user' });
        }
        else{
           console.log(users.lenght);
           res.redirect('../highscore');
        }

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


  app.get('/addQuestion', function(req,res) {
      var game = db.get('GameQuestions');
      
      game.find({},{},function(e,question){
        res.render('admin', { 
          title           : 'Add question',
          'questions'     : question
        });
      });
  });

  app.post('/addQuestion', function(req,res) {
    var game = db.get('GameQuestions');

    var q = req.body.question;
    var fst = req.body.one;
    var snd = req.body.cross;
    var thrd = req.body.two;
    var ans = req.body.answere;

    //console.log(q + " " + fst + " " + snd + " " + thrd + " " + ans);
    /*  admin.jade
        h3= chooseQuestions  
        select
          each q, i in questions
            option(value=q.id)=q.id
    */

    game.insert({
      question : q, 
      one : fst,
      cross : snd, 
      two : thrd,
      answere : ans
    });
    res.redirect('/addQuestion');
  });

}