
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

            var PageModel = Backbone.Model.extend({
                urlRoot: "/api/page/:id",
                idAttribute: "_id"
            });

            var Router = Backbone.Router.extend({

                routes: {
                    "pdf/:id/:pid"        : "initialize"
                },

                initialize: function (id, pid) {
                    var self = this;
                    var fields = [];
                    var value_fields = [];
                    var values = [];

                    var formColl = new FormModelCollection();
                    var profileColl = new ProfileModelCollection();

                    formColl.fetch({success:function(model) {
                        self.fields = model.toJSON();
                        var pages = self.fields[0].pages;
                        var pagelength = pages.length;

                        for (var i = 0; i < pagelength; i += 1) {
                            var page = new PageModel();
                            page.fetch({success: function(model) {
                                self.fields[0].pages[model.toJSON().page_index].fields = model.toJSON().fields;
                                if(i == pagelength) {
                                    profileColl.fetch({success:function(model) {
                                        that.generatePdf(self.fields[0], model.toJSON()[0].fields);
                                    }});
                                }
                            }});
                        }
                    }});
                }
            });

            var app = new Router();
            Backbone.history.start();
        },

        generatePdf: function(form, fields) {
            var doc = new jsPDF('p', 'pt', 'letter');
            console.log('doc.API > ', doc);
            doc.setFontSize(10);
            var pageCnt = 0;
            //loop through pages

            while(pageCnt < form.pages.length) {

                if(pageCnt > 0) doc.addPage();

                var forms = form.pages[pageCnt];
                doc.addImage(form.pages[pageCnt].page_image, 'JPEG', 0, 0, form.width, form.height);
                // doc.addImage(form.pages[pageCnt].page_image, 'JPEG', 0, 0, 215, 279);

                // doc.text(0, 10, '---');
                // doc.text(0, 20, '---');
                // doc.text(0, 30, '---');
                // doc.text(0, 40, '---');
                // doc.text(0, 50, '---');
                // doc.text(0, 60, '---');
                // doc.text(0, 70, '---');
                // doc.text(0, 80, '---');
                // doc.text(0, 90, '---');
                // doc.text(0, 100, '---');

                //loop through form fields
                for(var i=0; i < forms.fields.length; i += 1 ) {
                    var textValue = forms.fields[i].value;
                    // var textValue = '';
                    //loop through profile fields
                    for(var j=0; j < fields.length; j += 1) {
                        if (fields[j].name === forms.fields[i].value) {
                            textValue = fields[j].value;
                        }
                    }

                    console.log(forms.fields[i].cell_type);
                    if (forms.fields[i].cell_type !== 'text') {
                        textValue = 'X';
                    }
                    // console.log(forms.fields[i].x, forms.fields[i].y, textValue);
                    doc.text(parseInt(forms.fields[i].x, 10) * .56, parseInt(forms.fields[i].y, 10) * .57, textValue);
                }

                pageCnt ++;
            }

            var string = doc.output('datauristring');
            $('iframe').attr('src', string);

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
