window.FormViewList = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render: function () {
        var form = this.model.models;
        var len = form.length;

        $(this.el).html('<div class="row-fluid formList"><h1 class="span12">Select the form:</h1>');


        for (var i = 0; i < len; i++) {
            $('.formList', this.el).append(new FormView({model:form[i]}).render().el);
        }

        return this;
    }
});

window.FormView = Backbone.View.extend({
	tagName: "h4",

	initialize:function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
})