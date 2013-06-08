
/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./config/config')
  , routes = require('./config/routes')
  , http = require('http');

var app = express();

config.initialize(app, express);
routes.initialize(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
