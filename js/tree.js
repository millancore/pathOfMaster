const loadTemplate = require('./templateLoader');
const getFormDataAsJSON = require('./getFormDataAsJSON');


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
        var newtree = response.data;
        var canvas = SVG("tree-see").size(300, 600);    
        var newTreeLength = newtree.length;

        console.log(newTreeLength)
        var TreeGraph = new TreeGraph(canvas);



        for (let index = 0; index < newTreeLength; index++) {




            TreeGraph.add({
                name: newtree[index].name,
                dercripton: newtree[index].dercripton,
                id: newtree[index].id,
                click: function () {
                    document.getElementById('content').innerHTML = template(newtree[index]);
                }
            });
        }
        console.log(index);


        TreeGraph.render();  
})
.catch(function (error) {
  console.log(error);
})
    
}







module.exports = {
    addTree: addTree,
    tree: tree
};
