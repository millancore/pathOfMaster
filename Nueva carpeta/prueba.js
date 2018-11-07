function loadTemplate(nameTemplate,element){
     let promesa = new Promise(function(bien,mal){
        axios.get('templates/' + nameTemplate + '.hbs').then(
            function (response) {
              document.getElementById(element).innerHTML = response.data;
            }
          );
        bien("geniall")
        });
        return promesa;
    }


var addNode = function(){
    loadTemplate('layout', 'render')
        .then(() => 
            loadTemplate('addNode', 'content')
        )
};





    var addNode = function () {
        loadTemplate('layout', 'render');
        loadTemplate('addNode', 'content');
      };