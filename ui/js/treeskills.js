
var login = function() {
  axios.get('templates/login.hbs').then(function (response) {
    document.getElementById('render').innerHTML = response.data;
  })
}

 var routes = {
  '/': login,
};

var router = Router(routes);

router.init();

window.location.assign('/#/');