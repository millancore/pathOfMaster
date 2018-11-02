
var login = function () {
  axios.get('templates/login.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;
  })
};

var formnode = function () {
  axios.get('templates/formnode.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;
  })
};

var formtree = function () {
  axios.get('templates/formtree.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;
  })
};

var home = function () {
  axios.get('templates/home.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;
  })
};

var tree = function () {
  axios.get('templates/tree.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;
  })
};

var routes = {
  '/': login,
  '/formnode': formnode,
  '/formtree': formtree,
  '/home': home,
  '/tree': tree,



};

var router = Router(routes);

router.init();

window.location.assign('/#/');