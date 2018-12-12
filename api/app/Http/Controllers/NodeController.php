<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Everyman\Neo4j\Client;
use  Everyman\Neo4j\Cypher\Query;

class NodeController extends Controller
{
    public function add(Request $request)
    {
        $data = $request->all();

        $client = new Client();
        
        $client->getTransport()
               ->setAuth('neo4j', 'pom');

        $node = $client->makeNode();

        /*
        $node->setProperty('name', $data['name'])
            ->setProperty('description', $data['descripcion'])
            ->setProperty('link1', $data['link1'])
             ->save();
        $label  = $client->makeLabel('nodo');
         
        $label = $node->addLabels(array($label));
        $nodeId = $node->getId();

        $treename = $data["treename"];
        $treename = "cosina";
        $queryString = "MATCH (n:tree {name:'".$treename."'}) RETURN n";
        $query = new Query($client, $queryString);
        $result = $query->getResultSet();
        $treenode;
        foreach ($result as $row) {
            foreach ($row as $value) {
                $treenode = $value;
            }
        }
        $treenode->relateTo($node , 'pertenece a')
        ->save();*/

        

        $queryString = "MATCH p=(arbol)-[r:sept]->() RETURN p";
        $query = new Query($client, $queryString);
        $result = $query->getResultSet();
        $treeArray1 = [];
        foreach ($result as $row) {
                $treeArray1[] = $row['p'];
        }
        var_dump($treeArray1[3]->getProperty($name));
    }

    public function list()
    {

    }
}
