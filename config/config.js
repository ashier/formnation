(function() {

    var path = require('path'),
        mongoose = require('mongoose'),
        engines = require('consolidate');

    module.exports = function() {

        var app;

        return {
            initialize: function (app, express) {

                // all environments
                app.set('port', process.env.PORT || 3000);
                app.set('views', __dirname + '/views');
                app.engine('html', engines.hogan);
                app.set('view engine', 'html');
                app.use(express.favicon());
                app.use(express.logger('dev'));
                app.use(express.bodyParser());
                app.use(express.methodOverride());
                app.use(app.router);

                console.log(' >> ', path.join(__dirname, '..', 'public'));

                app.use('/public', express.static(path.join(__dirname, '..', 'public')));

                // development only
                if ('development' == app.get('env')) {
                  app.use(express.errorHandler());
                }

                mongoose.connect('mongodb://localhost/formnation');
            }
        };

    }();

}());
