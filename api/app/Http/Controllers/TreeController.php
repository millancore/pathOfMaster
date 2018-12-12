<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Everyman\Neo4j\Client;
use  Everyman\Neo4j\Cypher\Query;

class TreeController extends Controller
{
    public function add(Request $request)
    {   

        $data = $request->all();

        $client = new Client();
        
        $client->getTransport()
               ->setAuth('neo4j', 'pom');

        $tree = $client->makeNode();

        $tree->setProperty('name', $data['name'])
        ->setProperty('description', $data['description'])
         ->save();

         $label  = $client->makeLabel('tree');
         
         $label = $tree->addLabels(array($label));

         $nodeId = $tree->getId();
    echo $nodeId;
    }

    public function home_tree(Request $request){
        $client = new Client();
        
        $client->getTransport()
               ->setAuth('neo4j', 'pom');

        $queryString = "MATCH (n:tree) RETURN n";
        $query = new Query($client, $queryString);
        $result = $query->getResultSet();
        $treeArray = [];
        $x = 0;
        foreach ($result as $row) {
                
                $treeArray[$x]['ID'] = $row->getid();
                $treeArray[$x]['name'] = $row->name;
                $x= $x + 1;
        
        }

        var_dump($treeArray);
        //return response()->json($treeArray;);
    }
}