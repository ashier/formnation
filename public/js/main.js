var AppRouter = Backbone.Router.extend({

    routes: {
        ""        : "home",
        "home"    : "home",
        "form"    : "selectForm"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function () {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    selectForm: function () {

        var forms = new FormCollection({assessmentID: 1});
        forms.fetch({success: function(){
            if (!this.formView) {
                this.formView = new FormView({model: forms});
            }
            $('#content').html(this.formView.el);
            this.headerView.selectMenuItem('login-menu'); 
        }});       
    }
});

utils.loadTemplate(['HomeView', 'HeaderView', 'FormView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});