
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

        // Refactorizar a Funcion
        var formData = new FormData(formLogin);

        var dataObject = {};

        formData.forEach(function (value, key) {
            dataObject[key] = value;
        });

        var dataJson = JSON.stringify(dataObject);
        // End


        // Localstore!!
        localStorage.setItem('tree', dataJson);

        localStorage.getItem('tree');


        axios.post('api/current/user/login', dataJson).then(function (response) {
            if (response.status == 200) {
                window.location.assign('#/home');
                localStorage.setItem('token', response.data.token);
            }
        });

    }, false);
}

module.exports = login;
