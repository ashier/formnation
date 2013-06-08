(function() {

    var IndexController = require('../controllers/IndexController');
    var UserController = require('../controllers/UserController');
    var FormController = require('../controllers/FormController');
    var FieldController = require('../controllers/FieldController');

    module.exports = function() {

        var app;

        return {
            initialize: function (app) {
                this.app = app;

                app.get('/', IndexController.index);

                // user
                app.get('/api/user', UserController.index);
                app.post('/api/user', UserController.create);
                app.get('/api/user/:id', UserController.show);
                app.put('/api/user/:id', UserController.update);
                app.delete('/api/user/:id', UserController.destroy);

                // forms
                app.get('/api/form', FormController.index);
                app.post('/api/form', FormController.create);
                app.get('/api/form/:id', FormController.show);
                app.put('/api/form/:id', FormController.update);
                app.delete('/api/form/:id', FormController.destroy);


                // forms
                app.get('/api/field', FieldController.index);
                app.post('/api/field', FieldController.create);
                app.get('/api/field/:id', FieldController.show);
                app.put('/api/field/:id', FieldController.update);
                app.delete('/api/field/:id', FieldController.destroy);

            }
        };
    }();
}());
