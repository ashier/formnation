var AppRouter = Backbone.Router.extend({

    routes: {
        ""        : "home",
        "home"    : "home",
        "form"    : "selectForm",
        "about"    : "aboutUs",
        "open/:id/:pid" : "openForm"
    },

    initialize: function () {
        var user = new UserModel();
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);

        user.fetch({success: function(){
            if (!this.formView) {
            }
        }});        
    },

    home: function () {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    selectForm: function () {

        var forms = new FormCollection();
        forms.fetch({success: function(){
            if (!this.formView) {
                this.formView = new FormViewList({model: forms});
                
            }
            $('#content').html(this.formView.el);
        }});

        this.headerView.hideMenuItem('login-menu');        
    },

    openForm: function (id,pid) {
        console.log(id +' : ' + pid);      
    },

    aboutUs: function (id,pid) {
        if (!this.homeView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);     
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'FormView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});