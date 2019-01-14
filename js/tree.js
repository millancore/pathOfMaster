const loadTemplate = require('./templateLoader');
const getFormDataAsJSON = require('./getFormDataAsJSON');
const TreeGraph = require('./treegraph');


var addTree = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addTree', 'content')
    ).then(() => {
        treeListener();
    })
};

var tree = function (ID,pag) {
    loadTemplate('layout', 'render').then(() => {
        axios.get('templates/nodeDescription.hbs').then(
            function (response) {
                var template = Handlebars.compile(response.data);
                document.getElementById('content').innerHTML = template({id:ID});
              
                buttom(ID,pag)
                printtree(ID,pag);
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

function printtree(ID,pag){

    axios.get('/api/current/tree/'+ID+'/'+pag)
    .then(function (response) {
        var newtree = response.data;
        console.log(newtree);
        var canvas = SVG("tree-see").size(300, 1000);    
        var newTreeLength = newtree.length;
 
        var graph = new TreeGraph(canvas);

        for (let index = 0; index < newTreeLength; index++) {

            graph.add({
                name: newtree[index].name,
                dercripton: newtree[index].dercripton,
                id: newtree[index].id,
                click: function () {
                    document.getElementById('content').innerHTML = template(newtree[index]);
                }
            });
        }

        graph.render();  
})
.catch(function (error) {
  console.log(error);
})
    
}


function buttom(ID,pag){
         var para = document.createElement("a");
         para.setAttribute("id", "treeBotton");
         para.setAttribute("class","button");
  
         var node = document.createTextNode("siguiente");
         para.appendChild(node);
         
         var pags = parseInt(pag) + 1 ;

         para.addEventListener('click', function (event) {
             event.preventDefault();
             window.location.assign('#/tree/' + ID + '/'+ pags);
 
        
 
         }, false);
 
         document.getElementById("botomm").appendChild(para);
         
         
}





module.exports = {
    addTree: addTree,
    tree: tree
};
