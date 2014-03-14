var mongoose = require( 'mongoose' );
var Comment = mongoose.model( 'Comment' );

module.exports.controller = function(app) {

  app.get('/', function(req, res) {
    Comment.find( function ( err, comments, count ){
      res.render( 'index', {
          title : 'Node.js MongoDB Mongoose',
          comments : comments
      });
    });
  });

  app.post('/login', function(req, res) {
    new Comment({
      username : req.body.username,
      password : req.body.password
    }).save( function( err, comment, count ){
      res.redirect( '/' );
    });
  });


}
