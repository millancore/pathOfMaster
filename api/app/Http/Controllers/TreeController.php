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
        ->setProperty('link1', $data['link1'])
        ->setProperty('link2', $data['link2'])
        ->setProperty('link3', $data['link3'])
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
    public function showTree(Request $request, $id,$pag)
    {

        $pags= intval($pag);

        $cypher = new Cypher;
        $client = new Client('localhost', 7474);
        $client->setAuth('neo4j', 'pom');

        $id = $id;


        if($pags < 2){
            $client->Cypher('MATCH (tree) WHERE ID(tree) = '.$id.' RETURN tree.name as name,tree.description as description,ID(tree) as id,tree.link1 as link1,tree.link2 as link2,tree.link3 as link3');
            $response = $client->execute();
            $treeRaw =  $response->toArray();


    
        
            $client->Cypher('MATCH (n:tree) WHERE ID(n)='.$id.'  MATCH (n)-[r:sept*..   ]->(m) RETURN ID(m)  as id , m.name  as name,m.dercripton as  dercripton,m.link1 as link1,m.link2 as link2,m.link3 as link3 LIMIT 9');
            $response = $client->execute();
            $showTreeRaw =  $response->toArray();
            $showTree = [];
            $showTree[0]  = $treeRaw[0];
            $x = 1 ;
            $longitud = count($showTreeRaw);
    
            for($i=0; $i<$longitud; $i = $i + 1)
            {
                $showTree[$x] = $showTreeRaw[$i];
                $x = $x +1;
            }

            return $showTree;
            
    
        }else{
            $limt = $pags * 10;
            $skip = ($pags - 1) * 10;

            $client->Cypher('MATCH (n:tree) WHERE ID(n)='.$id.'  MATCH (n)-[r:sept*..   ]->(m) RETURN ID(m)  as id , m.name  as name,m.dercripton as  dercripton,m.link1 as link1,m.link2 as link2,m.link3 as link3 SKIP '.$skip.' LIMIT 10');
            $response = $client->execute();
            $showTreeRaw =  $response->toArray();
            $showTree = [];
            $x = 0 ;
            $longitud = count($showTreeRaw);
    
            for($i=0; $i<$longitud; $i = $i + 1)
            {
                $showTree[$x] = $showTreeRaw[$i];
                $x = $x +1;
            }

           return $showTree;
        }
        





        
    }
}