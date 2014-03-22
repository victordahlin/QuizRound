var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {

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