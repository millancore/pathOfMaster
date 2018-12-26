<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Everyman\Neo4j\Client as clientjadell;
use  Everyman\Neo4j\Cypher\Query;
use Pheo4j\Client;
use Pheo4j\Cypher;

class TreeController extends Controller
{
    public function add(Request $request)
    {   

        $data = $request->all();
        $client = new clientjadell();
        
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

    public function homeTree(Request $request){
 
        $cypher = new Cypher;
        $client = new Client('localhost', 7474);
        $client->setAuth('neo4j', 'pom');

        

        $client->Cypher('MATCH (n:tree) RETURN n.name as name ,ID(n) as id ');
        $response = $client->execute();
        $treeRaw =  $response->toArray();

        return $treeRaw;
    }
    public function showTree(Request $request, $id)
    {


        $cypher = new Cypher;
        $client = new Client('localhost', 7474);
        $client->setAuth('neo4j', 'pom');

        $id = $id;

        $client->Cypher('MATCH (tree) WHERE ID(tree) = '.$id.' RETURN tree.name as name,tree.description as description,ID(tree) as id');
        $response = $client->execute();
        $treeRaw =  $response->toArray();
    

    
        $client->Cypher('MATCH (n:tree) WHERE ID(n)='.$id.'  MATCH (n)-[r:sept*..]->(m) RETURN ID(m) as id , m.name  as name,m.dercripton as  dercripton');
        $response = $client->execute();
        $showTreeRaw =  $response->toArray();
        $showTree = [];
        $showTree[0] = $treeRaw[0];
        $x = 1 ;
        $longitud = count($showTreeRaw);

        for($i=0; $i<$longitud; $i = $i + 1)
        {
            $showTree[$x] = $showTreeRaw[$i];
            $x = $x +1;
        }
        

        return $showTree;

        
    }
}