const loadTemplate = require('./templateLoader');

var addNode = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addNode', 'content')
    )
};

module.exports = addNode;