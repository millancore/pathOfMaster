const loadTemplate = require('./templateLoader');

var home = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('home', 'container').then(() =>{
            homeTree();
            console.log("jajajajajaja")

        }
        
        )
    )
};


function homeTree(){
    var treArray = JSON.parse(localStorage.getItem("usuarioarbol"));
    for (x=0;x<treArray.length;x++){
        var para = document.createElement("p");
        var node = document.createTextNode(treArray[x]);
        para.appendChild(node);
         var element = document.getElementById("desss");
        element.appendChild(para);
    };


}

module.exports = home;