window.FormView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render: function () {
        var form = this.model.models;
        var len = forms.length;

        $(this.el).html('<div class="row-fluid answer">');

        for (var i = 0; i < len; i++) {
            $('.answer', this.el).append("<div class='span6 btn'>
            TEST FORM </h4></div>");
        }

        return this;
    }
});