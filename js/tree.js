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

var tree = function (ID) {
    loadTemplate('layout', 'render').then(() => {
        axios.get('templates/nodeDescription.hbs').then(
            function (response) {
                var template = Handlebars.compile(response.data);
                document.getElementById('content').innerHTML = template();
                printtree(ID);
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
        var config = {
            headers: {'Content-Type': 'application/json'}
          };

        axios.post('api/current/tree/add', dataJson, config).then(() => {
            window.location.assign('#/tree/' + obj.name);
        });
        
    }, false);
}

function printtree(ID){
    axios.get('api/current/tree/' + ID)
    .then(function (response) {
        var nodeArray = response.data;

      

        size2 = 10;
        for (x = 0; x < nodeArray.length; x++) {
             size2 += 90; 
        }
        var nodos = SVG("tree-see").size(300, size2);
        var circley = 50;
        var liney1 = 60;
        var liney2 = 0;
        var texty = 58;
    
        for (x = 0; x < nodeArray.length; x++) {
            liney2 += 90;
        }
    
        var line = nodos.line(123, liney1, 123, liney2).stroke({ width: 7, color: '#f4f5f6' });
        
        line.fill( '#f09' )
    
        for (x = 0; x < nodeArray.length; x++) {
             var circle = nodos.circle(45).fill('#4e6fc9').move(100, circley).stroke({ width: 4, color: '#f4f5f6' });
    
        
             var text = nodos.text(nodeArray[x].name);
             text.move(160,texty)
             text.font({
                family:   'Helvetica'
              , size:     24
              , fill:  '#f4f5f6'
              })
                
            liney1 += 190;
            circley += 90;
            texty += 90;
    
            let i = nodeArray[x]
            circle.click(function () {
                axios.get('templates/nodeDescription.hbs').then(
                    function (response) {
                        var template = Handlebars.compile(response.datsa);
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
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
})
    
}







module.exports = {
    addTree: addTree,
    tree: tree
};
