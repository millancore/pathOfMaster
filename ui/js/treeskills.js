
var gitgraph = new GitGraph({
  template: "metro",
  orientation: "vertical",
  mode: "compact",
  elementId: "tree"
});

var master = gitgraph.branch("master");


//const axios = require('axios');

// Make a request for a user with a given ID
axios.get('../api/current/tree')
  .then(function (response) {
    console.log(response);
  });