const loadTemplate = require('./templateLoader');

var addTree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addTree', 'content')
    )
};

var tree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('nodeDescription', 'content')
    )
};


module.exports = {
    addTree: addTree,
    tree: tree
};
