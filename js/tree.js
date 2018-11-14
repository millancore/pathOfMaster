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
            }
        );
    });

};

function treeListener() {

    var formNewTree = document.getElementById("newTree");

    formNewTree.addEventListener('submit', function (event) {
        event.preventDefault();

        var dataJson = getFormDataAsJSON(formNewTree);
        var obj = JSON.parse(dataJson);
        localStorage.setItem(obj.name, dataJson);
        window.location.assign('#/tree/' + obj.name);

        if( localStorage.getItem("node") == null){
                var node = [{node:"new"}];
                localStorage.setItem("node",JSON.stringify(node));
                
        }else{

            var bode =JSON.parse(localStorage.getItem("node"));
            console.log(bode);
            var node = bode.push({node:obj.name})
            localStorage.setItem("node",JSON.stringify(node));
            
        }
        

    }, false);
}





module.exports = {
    addTree: addTree,
    tree: tree
};
