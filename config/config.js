(function() {

    var path = require('path'),
        passport = require('passport'),
        mongoose = require('mongoose'),
        engines = require('consolidate'),
        LinkedInAuth = require('../linkedinauth/LinkedInAuth');

    module.exports = function() {

        var app;

        return {
            initialize: function (app, express) {

                var LINKEDIN_API_KEY = "ft974z31qv7p";
                var LINKEDIN_SECRET_KEY = "j2epiHFx7FNK3YoT";

                // all environments
                app.set('port', process.env.PORT || 3000);
                app.set('views', __dirname + '/views');
                app.engine('html', engines.hogan);
                app.set('view engine', 'html');
                app.use(express.favicon());
                app.use(express.logger('dev'));
                app.use(express.cookieParser());
                app.use(express.bodyParser());
                app.use(express.session({secret: 'formnation2013'}));
                app.use(passport.initialize());
                app.use(passport.session());
                app.use(express.methodOverride());
                app.use(app.router);

                app.use('/public', express.static(path.join(__dirname, '..', 'public')));

                LinkedInAuth.initialize(app, express, passport, LINKEDIN_API_KEY, LINKEDIN_SECRET_KEY);


                // development only
                if ('development' == app.get('env')) {
                  app.use(express.errorHandler());
                }

                mongoose.connect('mongodb://localhost/formnation');
            }
        };

    }();

}());
