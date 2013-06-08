var path = require('path');

exports.index = function(req, res) {
    res.render(path.join(__dirname, '..', '/views/index'));
};

exports.forms = function(req, res) {
    res.render(path.join(__dirname, '..', '/views/forms'));
};

