var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/QuizDB');

module.exports.controller = function(app) {
  
  app.get('/admin', function(req,res) {
    res.render('admin',{
      title : "Welcome admin"    
    });
  });

   app.post('/admin', function(req,res) {
    var quest = req.body.addQuestion;
    var user = req.body.createUser;
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

  app.get('/createUser', function(req,res) {
    res.render('createUser',{
      title : "Create new user"    
    });
  });

  app.get('/createRound', function(req,res) {
    res.render('createRound',{
      title : "Create new round"    
    });
  });


}