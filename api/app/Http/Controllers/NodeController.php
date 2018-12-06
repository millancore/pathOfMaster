<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Everyman\Neo4j\Client;

class NodeController extends Controller
{
    public function add(Request $request)
    {
        $data = $request->all();

        $client = new Client();
        
        $client->getTransport()
               ->setAuth('neo4j', 'pom');

        $node = $client->makeNode();


        $node->setProperty('name', $data['name'])
            ->setProperty('description', $data['descripcion'])
            ->setProperty('link1', $data['link1'])
             ->save();
        $label  = $client->makeLabel('nodo');
         
        $label = $node->addLabels(array($label));
        $nodeId = $node->getId();

        echo $nodeId;
    }

    public function list()
    {

    }
}
