
var gitgraph = new GitGraph({
    template: "metro",
    orientation: "vertical",
    mode: "compact",
    elementId: "tree"
  });

  var master = gitgraph.branch("master");

  master.commit({
    message: "Variables",
    tag: "Variables",
    onClick: function(commit) {
        $("#description").text('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat provident iure id veniam maiores voluptates qui corrupti soluta pariatur quod consequatur ducimus consequuntur, ipsa non saepe adipisci! Voluptates, pariatur doloremque.');
    }
  });

  master.commit({
    message: "Variables",
    tag: "Control",
    onClick: function(commit) {
        $("#description").text('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat provident iure id veniam maiores voluptates qui corrupti soluta pariatur quod consequatur ducimus consequuntur, ipsa non saepe adipisci! Voluptates, pariatur doloremque.');
    }
  });


  master.commit({
    message: "Variables",
    tag: "Objetos",
    onClick: function(commit) {
        $("#description").text('Esta es una descripcion del Nodo Objetos');
    }
  });