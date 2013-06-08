
var OpenForm = OpenForm || {};

(function() {

    "use strict";

    $.extend(true, OpenForm, {

        init: function() {

            var FormModel = Backbone.Model.extend({

                urlRoot: "/api/form/",

                idAttribute: "_id",

                defaults: {
                    __v: 0,
                    _id: "51b3074bf9cd6206fb000001",
                    height: "792",
                    slug: "sss-e1-61184785724",
                    type: "SSS-E1",
                    description:'SSS Government form',
                    width: "612",
                    pages: [
                        {
                            slug: "publicformssss_e1_0png",
                            page_image: "/public/forms/sss_e1_0.png",
                            page_index: "0",
                            _id: "51b31592aced300000000002",
                            __v: 0,
                            fields: [],
                            id: "51b31592aced300000000002"
                        }
                    ],
                    profiles:[],
                    id: "51b3074bf9cd6206fb000001"
                }
            });

            var Router = Backbone.Router.extend({

                routes: {
                    "pdf/:id/:pid"        : "initialize"
                },

                initialize: function (id, pid) {
                    console.log('init > ', id, pid);
                }

            });

            var app = new Router();
            Backbone.history.start();

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
