const loadTemplate = require('./templateLoader');

var home = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('home', 'container').then(() => {
            homeTree();

        }

        )
    )
};



function homeTree() {
    var treArray = JSON.parse(localStorage.getItem("usuarioarbol"));
    for (x = 0; x < treArray.length; x++) {
        
        var para = document.createElement("li");
        para.setAttribute("id", treArray[x]);
        para.setAttribute("class","treeName")

        var node = document.createTextNode(treArray[x]);
        para.appendChild(node);

        let treeName = treArray[x]
        para.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.assign('#/tree/' + treeName);



        }, false);

        document.getElementById("lists").appendChild(para);
        

    };


}

module.exports = home;