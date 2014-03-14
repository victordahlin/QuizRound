//var mongoose = require( 'mongoose' );
//var Comment = mongoose.model( 'Comment' );
// mongod --dbpath c:\Developement\Q\

module.exports.controller = function(app) {

  app.get('/login', function(req, res) {
    res.render('index', { title: 'Enter username and password' });
  });

  //app.post('/data', function(req, res) { });


  app.get('/highscore', function(req,res) {
      res.render('highscore', { title: 'Highscore' });
  });


  app.get('/admin', function(req,res) {
      res.render('admin', { title: 'Administration' });
  });

}