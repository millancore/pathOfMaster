module.exports = function loadTemplate(nameTemplate, element) {
    let promesa = new Promise(function (resolve, reject) {
        
        axios.get('templates/' + nameTemplate + '.hbs').then(
            function (response) {
                document.getElementById(element).innerHTML = response.data;
                resolve("ok")
            }
        );
    });
    return promesa
}