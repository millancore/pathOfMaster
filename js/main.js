const login = require('./login');
const treeModule = require('./tree');
const loadTemplate = require('./templateLoader');


var addNode = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('addNode', 'content')
    )
};


var home = function () {
    loadTemplate('layout', 'render').then(() =>
        loadTemplate('home', 'container')
    )
};


var routes = {
    '/': login,
    '/addnode': addNode,
    '/addtree': treeModule.addTree,
    '/home': home,
    '/tree': treeModule.tree,
};

var router = Router(routes);

router.init('/');


var token = localStorage.getItem('token');

if (token != undefined) {
    window.location.assign('/#/home');
} else {
    window.location.assign('/#/login');
}