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
    
    axios.get('api/current/tree/homeTree')
    .then(function (response) {
     var data = response.data
    

    let x = 0;

     for (x = 0; x <data.length; x++) {
         
         var para = document.createElement("li");
         para.setAttribute("id", data[x].id);
         para.setAttribute("class","treeName")
  
         var node = document.createTextNode(data[x].name);
         para.appendChild(node);

         let treeID = data[x].id;
         para.addEventListener('click', function (event) {
             event.preventDefault();
             window.location.assign('#/tree/' + treeID + '/1');
 
        
 
         }, false);
 
         document.getElementById("lists").appendChild(para);
         
     };
 
    })
    .catch(function (error) {
      console.log(error);
    });
    

}

module.exports = home;