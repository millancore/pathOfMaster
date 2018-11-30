const loadTemplate = require('./templateLoader');
const getFormDataAsJSON = require('./getFormDataAsJSON');
const simpleConfig = require('./simpleConfig');

var addNode = function (treeName) {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addNode', 'content')
    ).then(() => {
        newNode(treeName);
        simpleConfig.element = document.getElementById("nodeDescription");
        var simplemde = new SimpleMDE(simpleConfig);
    })
};


function newNode(treeName) {
    var formNewNode = document.getElementById("formNewNode");

    formNewNode.addEventListener('submit', function (event) {
        event.preventDefault();

        var node = getFormDataAsJSON(formNewNode);

        if (localStorage.getItem(treeName+"-node") == null) {
            var nodeArray = [JSON.parse(node)];
            localStorage.setItem(treeName+"-node", JSON.stringify(nodeArray));
        } else {
            var nodeArray = JSON.parse(localStorage.getItem(treeName+"-node"));
            nodeArray.push(JSON.parse(node));
            localStorage.setItem(treeName+"-node", JSON.stringify(nodeArray));
        };

        window.location.assign('#/tree/'+treeName);

    }, false);

};


module.exports = addNode;