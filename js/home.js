const loadTemplate = require('./templateLoader');

var home = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('home', 'container').then(() => {
            homeTree();
            console.log("jajajajajaja")

        }

        )
    )
};


function homeTree() {
    var treArray = JSON.parse(localStorage.getItem("usuarioarbol"));
    for (x = 0; x < treArray.length; x++) {
        var para = document.createElement("p");
        para.setAttribute("id", treArray[x]);

        var node = document.createTextNode(treArray[x]);
        para.appendChild(node);
        var element = document.getElementById("desss");
        element.appendChild(para);

        para.addEventListener('onclick', function (event) {
            event.preventDefault();
            console.log("holaaa")
            window.location.assign('#/tree/' + treArray[x]);

        }, false);



    };


}

module.exports = home;