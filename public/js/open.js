
var OpenForm = OpenForm || {};

(function() {

    "use strict";

    $.extend(true, OpenForm, {

        init: function() {
            var that = this;

            var FormModel = Backbone.Model.extend({
                urlRoot: "/api/form/",
                idAttribute: "_id"
            });

            var FormModelCollection = Backbone.Collection.extend({
                url:'/api/form/',
                model: FormModel
            });

            var ProfileModel = Backbone.Model.extend({
                urlRoot: "/api/profile/:id",
                idAttribute: "_id"
            });

            var ProfileModelCollection = Backbone.Collection.extend({
                url:'/api/profile/',
                model: ProfileModel
            });

            var Router = Backbone.Router.extend({

                routes: {
                    "pdf/:id/:pid"        : "initialize"
                },

                initialize: function (id, pid) {
                    var self = this;
                    var fields = [];
                    var value_fields = [];

                    var formColl = new FormModelCollection();
                    var profileColl = new ProfileModelCollection();

                    formColl.fetch({success:function(model) {
                        self.fields = model.toJSON()[0].pages;
                        profileColl.fetch({success:function(model) {
                            that.generatePdf(self.fields, model.toJSON()[0].fields);
                        }});

                    }});
                }
            });

            var app = new Router();
            Backbone.history.start();
        },

        generatePdf: function(fields, value_fields) {
            console.log('generate dude', fields, value_fields);
            // var imgData = '';
            // var imgData2 = '';
            // var doc = new jsPDF('p', 'pt', 'letter');
            // doc.setFontSize(9);
            // doc.addImage(imgData, 'JPEG', 0, 0, 612, 792);
            // doc.text(15, 60, "Octonyan loves jsPDF");
            // doc.addPage();
            // doc.addImage(imgData2, 'JPEG', 0, 0, 612, 792);
            // doc.text(20, 20, 'Do you like that?');

            // var string = doc.output('datauristring');
            // $('iframe').attr('src', string);
        }

    });

    OpenForm.init();

}());
