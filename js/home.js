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
        var para = document.createElement("li");
        para.setAttribute("id", treArray[x]);

        var node = document.createTextNode(treArray[x]);
        para.appendChild(node);
        document.getElementById("desss").appendChild(para);

        para.addEventListener('onclick', function (event) {
            event.preventDefault();
            console.log("holaaa")
            window.location.assign('#/tree/' + treArray[x]);

        }, false);



    };


}

module.exports = home;