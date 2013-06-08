
var OpenForm = OpenForm || {};

(function() {

    "use strict";

    $.extend(true, OpenForm, {

        init: function() {
            var doc = new jsPDF();
            doc.setFontSize(40);
            doc.text(35, 25, "Octonyan loves jsPDF");
        }

    });

    OpenForm.init();

}());
