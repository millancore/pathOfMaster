<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('user/login', 'UserController@login');
$router->post('tree/add', 'TreeController@add');
$router->post('node/add', 'NodeController@add');
$router->get('node/list', 'NodeController@list');
$router->get('tree/homeTree','TreeController@homeTree'); 
$router->get('tree/{id}','TreeController@showTree');
