module.exports.controller = function(app) {

  var mongo = require('mongodb');
  var monk = require('monk');
  var db = monk('localhost:27017/quiz');

  app.get('/login', function(req, res) {
    res.render('index', { title: 'QuizRound' });
  });

}
