const getFormDataAsJSON = require('./getFormDataAsJSON')

var login = function () {

    //Check
    var token = localStorage.getItem('token');

    if (token != undefined) {
        window.location.assign('/#/home');
    } 

    axios.get('templates/login.hbs').then(function (response) {
        var template = Handlebars.compile(response.data);
        document.getElementById('render').innerHTML = template();
        loginListener();
    })
};

function loginListener() {

    var formLogin = document.getElementById("login");

    formLogin.addEventListener('submit', function (event) {
        event.preventDefault();

        var dataJson = getFormDataAsJSON(formLogin);
        axios.post('api/current/user/login', dataJson).then(function (response) {
            if (response.status == 200) {
                window.location.assign('#/home');
                localStorage.setItem('token', response.data.token);
            }
        });

    }, false);
}


module.exports = login;
