var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {
  
  app.get('/admin', function(req,res) {
    res.render('admin',{
      title : "Welcome admin"    
    });
  });

   app.post('/admin', function(req,res) {
    var quest = req.body.addQuestion;
    var user = req.body.createAdmin;
    var round = req.body.createRound;
    console.log(quest + " " + user + " " + round);

    if(quest != undefined){
      res.redirect(quest);
    }

    if(user != undefined){
      res.redirect(user);
    }

    if(round != undefined){
      res.redirect(round);
    }

   });

  app.get('/addQuestion', function(req,res) {
      var game = db.get('GameQuestions');
      
      game.find({},{},function(e,question){
        res.render('addQuestion', { 
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
    var ans = req.body.answer;

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
    res.redirect('/admin');
  });

  app.get('/createAdmin', function(req,res) {
    res.render('createAdmin',{
      title : "Create new admin"    
    });
  });


  app.post('/createAdmin', function(req,res){

  });

  app.get('/createRound', function(req,res) {
    var questionsDB = db.get('GameQuestions');

    questionsDB.find({},{}, function(e,questions){
        res.render('createRound', { 
          title           : 'Create Round',
          'questions'     : questions
        });
    });
    //Här tänkte jag bara populera 5 dropdowns med frågor, sen beroende på vilka
    //som väljs så skapar man en runda som består av ID:n till de fem som valts
  });

  app.post('/createRound', function(req,res){

    var roundName = req.body.name;
    var question1 = req.body.one;
    var question2 = req.body.two;
    var question3 = req.body.three;
    var question4 = req.body.four;
    var question5 = req.body.five;

    var roundDB = db.get('Round');

    roundDB.insert({
      name : roundName,
      q1 : question1, 
      q2 : question2,
      q3 : question3, 
      q4 : question4,
      q5 : question5
    });

    res.redirect('/admin');

  });

}