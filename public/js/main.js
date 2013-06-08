var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "home"              : "home"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    }
});

utils.loadTemplate(['HomeView', 'HeaderView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});