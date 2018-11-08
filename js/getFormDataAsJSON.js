module.exports = function getFormDataAsJSON(formLogin) {
    var doc = new FormData(formLogin);

    var dataObject = {};

    doc.forEach(function (value, key) {
        dataObject[key] = value;
    });
    var dataJson = JSON.stringify(dataObject)
    return dataJson
}
