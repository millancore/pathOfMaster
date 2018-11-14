const loadTemplate = require('./templateLoader');
const getFormDataAsJSON = require('./getFormDataAsJSON');

var addNode = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addNode', 'content')
    ).then(() => {
        newNode();
    })
};


function newNode() {
    var formNewNode = document.getElementById("formNewNode");

    formNewNode.addEventListener('submit', function (event) {
        event.preventDefault();

        var node = getFormDataAsJSON(formNewNode);

        if (localStorage.getItem("node") == null) {
            var nodeArray = [JSON.parse(node)];
            localStorage.setItem("node", JSON.stringify(nodeArray));
        } else {
            var nodeArray = JSON.parse(localStorage.getItem("node"));
            nodeArray.push(JSON.parse(node));
            localStorage.setItem("node", JSON.stringify(nodeArray));
        };

        window.location.assign('#/tree/sarza');

    }, false);

};


module.exports = addNode;