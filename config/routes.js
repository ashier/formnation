(function() {

    var IndexController = require('../controllers/IndexController');
    var UserController = require('../controllers/UserController');
    var FormController = require('../controllers/FormController');
    var FieldController = require('../controllers/FieldController');
    var PageController = require('../controllers/PageController');
    var ProfileController = require('../controllers/ProfileController');

    module.exports = function() {

        var app;

        return {
            initialize: function (app) {
                this.app = app;

                app.get('/', IndexController.index);
                app.get('/forms', IndexController.forms);
                app.get('/forms/open/', IndexController.openProfile);

                // user
                app.get('/api/user', UserController.index);
                app.post('/api/user', UserController.create);
                app.get('/api/user/:id', UserController.show);
                app.put('/api/user/:id', UserController.update);
                app.delete('/api/user/:id', UserController.destroy);

                // forms
                app.get('/api/form', FormController.index);
                app.post('/api/form', FormController.create);
                app.get('/api/form/:slug', FormController.show);
                app.put('/api/form/:slug', FormController.update);
                app.delete('/api/form/:slug', FormController.destroy);


                // fields
                app.get('/api/field', FieldController.index);
                app.post('/api/field', FieldController.create);
                app.get('/api/field/:id', FieldController.show);
                app.put('/api/field/:id', FieldController.update);
                app.delete('/api/field/:id', FieldController.destroy);


                // page
                app.get('/api/page', PageController.index);
                app.post('/api/page', PageController.create);
                app.get('/api/page/:id', PageController.show);
                app.put('/api/page/:id', PageController.update);
                app.delete('/api/page/:id', PageController.destroy);

                //hack
                app.post('/api/page0', PageController.createSSS0);
                app.post('/api/page1', PageController.createSSS1);


                // profile
                app.get('/api/profile', ProfileController.index);
                app.post('/api/profile', ProfileController.create);
                app.get('/api/profile/:id', ProfileController.show);
                app.put('/api/profile/:id', ProfileController.update);
                app.delete('/api/profile/:id', ProfileController.destroy);


                // profile fields
                app.post('/api/profile/:id/field', ProfileController.createField);
                app.get('/api/profile/:id/field/:field_id', ProfileController.showField);
                app.put('/api/profile/:id/field/:field_id', ProfileController.updateField);

            }
        };
    }();
}());
