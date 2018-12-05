<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Everyman\Neo4j\Client;

class NodeController extends Controller
{
    public function add(Request $request)
    {
        $data = json_decode($request->all());

        $client = new Client();
        
        $client->getTransport()
               ->setAuth('neo4j', 'pom');

        $node = $client->makeNode();

        $node->setProperty('name', $data['name'])
             ->save();

        echo 'ok';
    }

    public function list()
    {

    }
}
