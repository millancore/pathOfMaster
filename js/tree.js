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
        window.location.assign('#/tree/' + obj.name);

    }, false);
}

function printtree(treeName){
    var nodeArray = JSON.parse(localStorage.getItem(treeName+"-node"));
    Console.log("jajajajaj")
    var gitgraph = new GitGraph({
        template: "metro", 
        orientation: "vertical",
       author: '',
        mode: "extended" 
    });
  
    var master = gitgraph.branch("master");
  
    for (x=0;x<nodeArray.length;x++){
        gitgraph.commit(nodeArray[x].name);
    };
  
  }



module.exports = {
    addTree: addTree,
    tree: tree
};
