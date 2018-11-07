
var login = function () {
  axios.get('templates/login.hbs').then(function (response) {

    var template = Handlebars.compile(response.data);

    document.getElementById('render').innerHTML = template();

    loginListener();

  })
};

var addNode = function () {
  loadTemplate('layout', 'render');
  loadTemplate('addNode', 'content');
};

var addTree = function () {
  loadTemplate('layout', 'render');
  loadTemplate('addTree', 'content');
};

var home = function () {
  loadTemplate('layout', 'render');
  loadTemplate('home', 'container');
};

var tree = function () {
  loadTemplate('layout', 'render');
  loadTemplate('NodeDescription', 'content');
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

async function loadTemplate(nameTemplate, element) {
  axios.get('templates/' + nameTemplate + '.hbs').then(
    function (response) {
      document.getElementById(element).innerHTML = response.data;
    }
  );
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
