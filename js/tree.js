const loadTemplate = require('./templateLoader');
const getFormDataAsJSON = require('./getFormDataAsJSON')

var addTree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addTree', 'content')
    ).then(() => {newtre()})
};

var tree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('nodeDescription', 'content')
    )
};
function newtre() {

    var newtre = document.getElementById("newtre");
        console.log(newtre);
    newtre.addEventListener('submit', function (event) {
        event.preventDefault();

        var dataJson = getFormDataAsJSON(newtre);

        newtre.setItem('tree', dataJson);

        console.log(dataJson)

        //var obj = JSON.parse(dataJson);

        //console.log(obj)

        window.location.assign('#/tree');
    }, false);
}


module.exports = {
    newtre: newtre,
    addTree: addTree,
    tree: tree
};
