window.FormViewList = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render: function () {
        var formModel = this.model.models;
        var len = formModel.length;

        $(this.el).html(' <div> <table class="table table-bordered table-striped"><colgroup><col class="span1"><col class="span7"></colgroup><thead><tr><th>Form Name</th> <th>Form Description</th></tr></thead><tbody class="formList"></tbody></table></div>');

        for (var i = 0; i < len; i++) {
            $('.formList', this.el).append(new FormView({model:formModel[i]}).render().el);
        }

        return this;
    },



});

window.FormView = Backbone.View.extend({
	tagName: "tr",

	initialize:function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
})