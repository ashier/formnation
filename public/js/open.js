
var OpenForm = OpenForm || {};

(function() {

    "use strict";

    $.extend(true, OpenForm, {

        init: function() {

            var Router = Backbone.Router.extend({
                routes: {
                    "/forms/open/"        : "initialize"
                },
                initialize: function (id) {
                    console.log('init > ', id);
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
