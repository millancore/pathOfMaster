const login = require('./login');
const treeModule = require('./tree');
const node = require('./node')
const home = require('./home')

var routes = {
    '/': login,
    '/addnode/:treeName': node,
    '/addtree': treeModule.addTree,
    '/home': home,
    '/tree/:treeName': treeModule.tree,
};

var router = Router(routes);

router.init('/');


var token = localStorage.getItem('token');

if (token != undefined) {
    window.location.assign('/#/home');
} else {
    window.location.assign('/#/login');
}