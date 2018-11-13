const loadTemplate = require('./templateLoader');
const getFormDataAsJSON = require('./getFormDataAsJSON')

var addTree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addTree', 'content')
    ).then(() => {
        treeListener();
    })
};

var tree = function (treeName) {
    loadTemplate('layout', 'render').then(() => {
        axios.get('templates/nodeDescription.hbs').then(
            function (response) {
                var template = Handlebars.compile(response.data);
                var dataTree = JSON.parse(localStorage.getItem(treeName));
                document.getElementById('content').innerHTML = template(dataTree);
            }
        );
    });

};

function treeListener() {

    var formNewTree = document.getElementById("newTree");

    formNewTree.addEventListener('submit', function (event) {
        event.preventDefault();

        var dataJson = getFormDataAsJSON(formNewTree);
        var obj = JSON.parse(dataJson);
        localStorage.setItem(obj.name, dataJson);


        var obj = JSON.parse(dataJson);

        console.log(obj)

        window.location.assign('#/tree/' + obj.name);
    }, false);
}


module.exports = {
    addTree: addTree,
    tree: tree
};
