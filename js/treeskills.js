
var login = function () {
  axios.get('templates/login.hbs').then(function (response) {

    var template = Handlebars.compile(response.data);

    document.getElementById('render').innerHTML = template();

    loginListener();

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

router.init('/');

var token = localStorage.getItem('token');

if (token != undefined) {
  window.location.assign('/#/home');
} else {
  window.location.assign('/#/login');
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
