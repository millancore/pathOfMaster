const loadTemplate = require('./templateLoader');
const getFormDataAsJSON = require('./getFormDataAsJSON')

var addTree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addTree', 'content')
    ).then(() => {
        treeListener();
    })
};

var tree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('nodeDescription', 'content')
    )
};

function treeListener() {

    var formNewTree = document.getElementById("newTree");

    formNewTree.addEventListener('submit', function (event) {
        event.preventDefault();

        var dataJson = getFormDataAsJSON(formNewTree);

        localStorage.setItem('tree', dataJson);

        localStorage.setItem('toke', 'dasdasdh2j31243u');

        //var obj = JSON.parse(dataJson);

        //console.log(obj)

        //window.location.assign('#/tree');
    }, false);
}


module.exports = {
    addTree: addTree,
    tree: tree
};
