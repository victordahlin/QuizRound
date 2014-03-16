var express = require('express');
var http = require('http');
var path = require('path');
var fs 	 = require('fs');
//var mongoose = require( 'mongoose' );

var app = express();

//require( './models/createDB' );

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(express.cookieParser('your secret here'));
//app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


/*mongoose.connect('mongodb://127.0.0.1:27017/quiz');

var PlayerModel = require('models/player');
    PlayerModel.find({"name" : "testuser1"}, function(err, player){
      if(err){
        console.log(err);
      }
      else{
        console.log("User: %j", player);
      }
    });
*/


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}




// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
