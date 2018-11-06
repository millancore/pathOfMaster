
var login = function () {
  axios.get('templates/login.hbs').then(function (response) {

    var template = Handlebars.compile(response.data);

    document.getElementById('render').innerHTML = template();

    loginListener();

  })
};

var addNode = function () {
  axios.get('templates/layout.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;

    loadTemplate('tree', function (response){
      document.getElementById('tree').innerHTML = response.data;
    });

    axios.get('templates/addNode.hbs').then(function (response) {
      document.getElementById('content').innerHTML = response.data;
    });

  });
};

var addTree = function () {
  axios.get('templates/layout.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;

    axios.get('templates/tree.hbs').then(function (response) {
      document.getElementById('tree').innerHTML = response.data;
    });

    axios.get('templates/addTree.hbs').then(function (response) {
      document.getElementById('content').innerHTML = response.data;
    });

  });
};

var home = function () {
  axios.get('templates/layout.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;

    axios.get('templates/home.hbs').then(function (response) {
      document.getElementById('container').innerHTML = response.data;
    });

  });
};

var tree = function () {
  axios.get('templates/layout.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;

    axios.get('templates/tree.hbs').then(function (response) {
      document.getElementById('tree').innerHTML = response.data;
    });

    axios.get('templates/nodeDescription.hbs').then(function (response) {
      document.getElementById('content').innerHTML = response.data;
    });

  });
};

var routes = {
  '/': login,
  '/addnode': addNode,
  '/addtree': addTree,
  '/home': home,
  '/tree': tree,
};

var router = Router(routes);

router.init('/');

var token = localStorage.getItem('token');

if (token != undefined) {
  window.location.assign('/#/home');
} else {
  window.location.assign('/#/login');
}

function loadTemplate(nameTemplate, callback)
{
    axios.get('templates/'+ nameTemplate + '.hbs').then(callback);
}


loginListener = function () {

  var formLogin = document.getElementById("login");

  formLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    var data = new FormData(formLogin);

    axios.post('api/current/user/login', data).then(function (response) {
      if (response.status == 200) {
        window.location.assign('#/home');
        localStorage.setItem('token', response.data.token);
      }
    });

  }, false);
}
