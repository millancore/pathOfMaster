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
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('nodeDescription', 'content')
    ).then(()=> {
        console.log(treeName)
    }    
    ).then(() => {
        treepPrint(treeName)
    })

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

        window.location.assign('#/tree/'+ obj.name );
    }, false);
}

function treepPrint(treeName){
    var tree = localStorage.getItem(treeName);
    var Printtree =JSON.parse(tree);

    p.innerHTML = Printtree.name; 

    console.log(Printtree)

  

    

    
}

module.exports = {
    addTree: addTree,
    tree: tree
};
