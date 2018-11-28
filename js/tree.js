const loadTemplate = require('./templateLoader');
const getFormDataAsJSON = require('./getFormDataAsJSON');
const simpleConfig = require('./simpleConfig');

var addTree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addTree', 'content')
    ).then(() => {
        treeListener();
        simpleConfig.element = document.getElementById("treeDestrion");
        var simplemde = new SimpleMDE(simpleConfig);
    })
};

var tree = function (treeName) {
    loadTemplate('layout', 'render').then(() => {
        axios.get('templates/nodeDescription.hbs').then(
            function (response) {
                var template = Handlebars.compile(response.data);
                var dataTree = JSON.parse(localStorage.getItem(treeName));
                document.getElementById('content').innerHTML = template(dataTree);
                printtree(treeName);
            }
        );
    })

};

function treeListener() {

    var formNewTree = document.getElementById("newTree");

    formNewTree.addEventListener('submit', function (event) {
        event.preventDefault();

        var dataJson = getFormDataAsJSON(formNewTree);
        var obj = JSON.parse(dataJson);
        localStorage.setItem(obj.name, dataJson);

        if (localStorage.getItem("usuarioarbol") == null) {
            var treeArray = [obj.name];
            localStorage.setItem("usuarioarbol", JSON.stringify(treeArray));
        } else {
            var treeArray = JSON.parse(localStorage.getItem("usuarioarbol"));
            arbol = obj.name
            treeArray.push(arbol);
            localStorage.setItem("usuarioarbol", JSON.stringify(treeArray));
        };
        window.location.assign('#/tree/' + obj.name);
    }, false);
}

function printtree(treeName) {
    var nodeArray = JSON.parse(localStorage.getItem(treeName + "-node"));
    var nodos = SVG("tree-see").size(300, 10000);
    var circley = 50;
    var liney1 = 60;
    var liney2 = 0;

    for (x = 0; x < nodeArray.length; x++) {
        liney2 += 90;
    }

    var line = nodos.line(133, liney1, 133, liney2).stroke({ width: 10 });

    line.fill('#f09')

    for (x = 0; x < nodeArray.length; x++) {
        var circle = nodos.circle(65).fill('#4e6fc9').move(100, circley);

        liney1 += 190;
        circley += 90;

        let i = nodeArray[x]
        circle.click(function () {
            axios.get('templates/nodeDescription.hbs').then(
                function (response) {
                    var template = Handlebars.compile(response.data);
                    var dataTree = JSON.parse(localStorage.getItem(treeName + "-node"));
                    var nodeName = i.name;
                    var nodeDescription = i.descripcion;
                    var node = { name: nodeName, description: nodeDescription };
                    console.log(node)

                    document.getElementById('content').innerHTML = template(node);
                }
            );
        })
    }
}







module.exports = {
    addTree: addTree,
    tree: tree
};
