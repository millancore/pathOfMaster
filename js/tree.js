const loadTemplate = require('./templateLoader');
const getFormDataAsJSON = require('./getFormDataAsJSON');
const simpleConfig = require('./simpleConfig');

var addTree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addTree', 'content')
    ).then(() => {
        treeListener();
    })
};

var tree = function (ID) {
    loadTemplate('layout', 'render').then(() => {
        axios.get('templates/nodeDescription.hbs').then(
            function (response) {
                var template = Handlebars.compile(response.data);
                document.getElementById('content').innerHTML = template({id:ID});
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

        var config = {
            headers: {'Content-Type': 'application/json'}
          };

        axios.post('api/current/tree/add', dataJson, config).then(() => {
            window.location.assign('#/home');
        });
        
    }, false);
}

function printtree(ID){
    axios.get('api/current/tree/' + ID)
    .then(function (response) {
        var nodeArray = response.data;
        var size2 = 10 + (90 * nodeArray.length);
        var nodos = SVG("tree-see").size(300, size2);
        var circley = 50;
        var liney1 = 50;
        var liney2 = 0 + (90 * nodeArray.length);
        var texty = 58;
        

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
                        var template = Handlebars.compile(response.data);
                        var nodeName = i.name;
                        var nodeDescription = i.id;
                        var node = { id:i.id, name: nodeName, description: nodeDescription  };
                        document.getElementById('content').innerHTML = template(node);
                    }
                );
            })
        }
})
.catch(function (error) {
  console.log(error);
})
    
}







module.exports = {
    addTree: addTree,
    tree: tree
};
