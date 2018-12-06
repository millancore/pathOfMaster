module.exports = function getFormDataAsJSON(formLogin,type) {
    var doc = new FormData(formLogin);

    var dataObject = {};

    doc.forEach(function (value, key) {
        dataObject[key] = value;
    });
    var dataJson = JSON.stringify(dataObject);

     if( type == true){
        return dataObject
     }else{
        return dataJson
     }
}
