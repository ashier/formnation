(function() {

    var LinkedInStrategy = require('passport-linkedin').Strategy,
        http = require('http');

    module.exports = function() {
        return {
            initialize: function(app, express, passport, api_key, secret) {

                /*
                *
                * Code Taken from
                * https://github.com/jaredhanson/passport-linkedin/tree/master/examples
                *
                */

                passport.serializeUser(function(user, done) {
                  done(null, user);
                });

                passport.deserializeUser(function(obj, done) {
                  done(null, obj);
                });

                // Use the LinkedInStrategy within Passport.
                //   Strategies in passport require a `verify` function, which accept
                //   credentials (in this case, a token, tokenSecret, and LinkedIn profile), and
                //   invoke a callback with a user object.
                passport.use(new LinkedInStrategy({
                    consumerKey: api_key,
                    consumerSecret: secret,
                    callbackURL: "/auth/linkedin/callback"
                  },
                  function(token, tokenSecret, profile, done) {
                    // asynchronous verification, for effect...
                    process.nextTick(function () {

                      // To keep the example simple, the user's LinkedIn profile is returned to
                      // represent the logged-in user.  In a typical application, you would want
                      // to associate the LinkedIn account with a user record in your database,
                      // and return that user instead.
                      return done(null, profile);
                    });
                  }
                ));

                app.get('/auth/linkedin',
                  passport.authenticate('linkedin'),
                  function(req, res){
                    // The request will be redirected to LinkedIn for authentication, so this
                    // function will not be called.
                  });

                app.get('/auth/linkedin/callback',
                    passport.authenticate('linkedin', { failureRedirect: '/login' }),
                    function(req, res) {
                        res.redirect('/#form');
//                        var authorizationCode = req.params.code;
//                        console.log('In callback already with auth code ', authorizationCode);
//                        console.log('In callback already with PARAMS ', req.params);
//                        console.log('In callback already with body ', req.body);
//
//                        var options = {
//                            host : 'https://www.linkedin.com',
//                            path : '/uas/oauth2/accessToken?grant_type=authorization_code&code=' + authorizationCode + '&redirecturi=/api/linkedin&client_id=' + api_key + '&client_secret=' + secret,
//                            port : 80,
//                            method : 'POST'
//                        };
//
//                        var request = http.request(options, function(response){
//                            var body = "";
//
//                            response.on('data', function(data) {
//                                body += data;
//                            });
//
//                            response.on('end', function() {
//                                res.send(JSON.parse(body));
//                            });
//                        });
//
//                        request.on('error', function(e) {
//                            console.log('Problem with request: ' + e.message);
//                            console.log( e.stack );
//                        });
                    });

                app.get('/api/linkedin', function(req, res) {

                    var options = {
                        host : 'http://api.linkedin.com',
                        path : '/v1/people/~',
                        port : 80,
                        method : 'GET'
                    };

                    var request = http.request(options, function(response){
                        var body = "";

                        response.on('data', function(data) {
                          body += data;
                        });

                        response.on('end', function() {
                          res.send(JSON.parse(body));
                        });
                    });

                    request.on('error', function(e) {
                        console.log('Problem with request: ' + e.message);
                    });

                    request.end();
                });

            }
        };
    }();

}());
