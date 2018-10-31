
var gitgraph = new GitGraph({
    template: "metro",
    orientation: "vertical",
    mode: "compact",
    elementId: "tree"
  });

  var master = gitgraph.branch("master");

  $.ajax({
    url: "http://pathofmaster.lc/api/current/tree",
    
  }).done(function(response) {
    $.each(JSON.parse(response), function( index, value ) {
       master.commit(value);
    });
  });