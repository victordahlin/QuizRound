var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

module.exports.controller = function(app) {
  
  app.get('/highscore', function(req,res) {
      var highscore = db.get('Highscore');

      highscore.find({},{ $sort : { totalScore : -1 } },function(e,scores){
        res.render('highscore', {
          title : "Top 20 players",
          'highscore' : scores
        });
      });
  });

}