const login = require('./login');
const treeModule = require('./tree');
const node = require('./node')
const home = require('./home')

var logout = function() {
    localStorage.removeItem('token');
    window.location.assign('/#/login');
}

var routes = {
    '/login': login,
    '/addnode/:treeName': node,
    '/addtree': treeModule.addTree,
    '/home': home,
    '/tree/:treeID': treeModule.tree,
    '/logout':logout ,
};

var router = Router(routes);

router.init('/');

var token = localStorage.getItem('token');

if (token == undefined) {
    window.location.assign('/#/login');
} 

