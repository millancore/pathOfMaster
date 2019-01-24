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
                    {        
                        axios.get('templates/nodeDescription.hbs').then(
                        function (response) {
                            var template = Handlebars.compile(response.data);
                            document.getElementById('content').innerHTML = template(newtree[index]);
                            buttom(ID,pag)  
                        }
                        );
                    }
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
    var pags = parseInt(pag);
    var paginaNex = pags +1;

        document.getElementById("botomm").appendChild
         
         var buttomnex = document.createElement("a");
         buttomnex.setAttribute("id", "treeBottonNex");
         buttomnex.setAttribute("class","button");
         buttomnex.setAttribute("href","http://pathofmaster.local/#/tree/"+ID+"/"+paginaNex+"");
        var node = document.createTextNode("siguiente");
         buttomnex.appendChild(node);
         document.getElementById("botomm").appendChild(buttomnex);
    
    var paginaAfter = pags - 1;
    console.log(paginaNex);

    if(pags > 1 ){
        document.getElementById("botomm").appendChild
         
        var buttomalfter = document.createElement("a");
        buttomalfter.setAttribute("id", "treeBottonAfter");
        buttomalfter.setAttribute("class","button");
        buttomalfter.setAttribute("href","http://pathofmaster.local/#/tree/"+ID+"/"+paginaAfter+"");
       var node = document.createTextNode("anterior");
        buttomalfter.appendChild(node);
        document.getElementById("botomm").appendChild(buttomalfter);
    
    }

         

        
}





module.exports = {
    addTree: addTree,
    tree: tree
};
