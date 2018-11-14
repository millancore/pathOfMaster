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

        console.log(node)

        if (localStorage.getItem("node") == null) {
            var nodeArray = [node];
            localStorage.setItem("node", nodeArray);

        } else {

            var bode = JSON.parse(localStorage.getItem("node"));
            console.log(bode);
            bode.push(JSON.parse(node));
            localStorage.setItem("node", JSON.stringify(bode));
        };

        window.location.assign('#/tree');

    }, false);

};


module.exports = addNode;