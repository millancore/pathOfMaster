
var login = function () {
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

        var data = new FormData(formLogin);

        axios.post('api/current/user/login', data).then(function (response) {
            if (response.status == 200) {
                window.location.assign('#/home');
                localStorage.setItem('token', response.data.token);
            }
        });

    }, false);
}

module.exports = login;
