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

}