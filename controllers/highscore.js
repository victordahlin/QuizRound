var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {
  
  app.get('/highscore', function(req,res) {
      var highscore = db.get('Highscore');

      highscore.find({},{},function(e,scores){
        res.render('highscore', {
          'highscore' : scores
        });
      });
  });

}