function signIn()
{
    var username = document.getElementById("username").value;
    var password =  document.getElementById("password").value;

    axios.post('api/current/user/login', {
      username: username,
      password: password
    }).then(function (response) {
        if (response.status == 200) {
            window.location.assign('/?#/home');
            localStorage.setItem('token', response.data.token);
        }
    });
}

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
  '/login': login,
  '/formnode': formnode,
  '/formtree': formtree,
  '/home': home,
  '/tree': tree,
};

var router = Router(routes);

router.init();

var token = localStorage.getItem('token');

if (token != undefined) {
    window.location.assign('/#/home');  
} else {
    window.location.assign('/#/login');
}
