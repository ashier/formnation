(function() {

    var IndexController = require('../controllers/IndexController');
    var UserController = require('../controllers/UserController');

    module.exports = function() {

        var app;

        return {
            initialize: function (app) {
                this.app = app;

                app.get('/', IndexController.index);

                // user
                app.get('/api/user', UserController.index);
                app.post('/api/user', UserController.create);
                app.get('/api/user/:slug', UserController.show);
                app.put('/api/user/:slug', UserController.update);
                app.delete('/api/user/:slug', UserController.destroy);

            }
        };
    }();
}());
