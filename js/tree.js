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

function printtree(treeName){
    var nodeArray = JSON.parse(localStorage.getItem(treeName+"-node"));

    var myTemplateConfig = {
        colors: [ "#F00", "#0F0", "#00F" ], // branches colors, 1 per column
        branch: {
          lineWidth: 8,
          spacingX: 50,
          showLabel: true,                  // display branch names on graph
        },
        commit: {
          spacingY: -80,
          dot: {
            size: 12
          },
          message: {
            displayAuthor: true,
            displayBranch: false,
            displayHash: false,
            font: "normal 12pt Arial"
          },
          shouldDisplayTooltipsInCompactMode: false, // default = true
          tooltipHTMLFormatter: function ( commit ) {
            return "" + commit.sha1 + "" + ": " + commit.message;
          }
        }
      };
      var myTemplate = new GitGraph.Template( myTemplateConfig );

      var gitgraph = new GitGraph({
        template: myTemplate, 
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
