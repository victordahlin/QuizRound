var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/quizDB');

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
  });


  app.get('/highscore', function(req,res) {
      res.render('highscore', { title: 'Highscore' });
  });


  app.get('/admin', function(req,res) {
      res.render('admin', { title: 'Administration' });
  });

}