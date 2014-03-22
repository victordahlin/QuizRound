var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {

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

    game.insert({
      question : q, 
      one : fst,
      cross : snd, 
      two : thrd,
      answere : ans
    });
    res.redirect('/admin');
  });

}