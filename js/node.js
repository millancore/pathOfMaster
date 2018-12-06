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

        var nodo = getFormDataAsJSON(formNewNode,true);
            nodo.treename = treeName;
          node= JSON.stringify(nodo)
           console.log(node)
        var config = {
            headers: {'Content-Type': 'application/json'}
          };

        axios.post('api/current/node/add', node, config).then(() => {
            window.location.assign('#/tree/'+treeName);
        });

    }, false);

};


module.exports = addNode;