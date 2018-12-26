<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pheo4j\Client;
use Pheo4j\Cypher;

class NodeController extends Controller
{
    public function add(Request $request)
    {   
        
        $data = $request->all();

        $cypher = new Cypher;
        $client = new Client('localhost', 7474);
        $client->setAuth('neo4j', 'pom');
        
        $name = $data['name'];
        $description = $data['descripcion'];
        $link1 = $data['link1'];
        $link2 = $data['link2'];
        $link3 = $data['link3'];




        $client->Cypher("CREATE (".$name.":nodo {name:'".$name."',dercripton:'".$description."',link1:'".$link1."',link2:'".$link2."',link3:'".$link3."'}) RETURN  ID(".$name.") as id " );
        $response = $client->execute();
        $nodoCreado = $response->toArray();




     
        $idCreado = $nodoCreado[0]['id']; 
        $idPadre = $data['id'];


        $client->Cypher("MATCH (n:nodo) WHERE ID(n) = ".$idPadre." RETURN n" );
        $response = $client->execute();
        $nodoPadre =  $response->toArray();
        
        if (empty($nodoPadre)) {
            $client->Cypher("MATCH (a:tree),(b:nodo) WHERE ID(a)=".$idPadre." AND ID(b)=".$idCreado." CREATE (a)-[r:sept]->(b) RETURN r" );
            $response = $client->execute();
            $treePadre =  $response->toArray();

            var_dump($treePadre);

        }else{
            $client->Cypher("MATCH (a:nodo) WHERE ID(a)=".$idPadre." MATCH (a)-[:sept]-(nodo) RETURN ID(nodo) as id" );
            $response = $client->execute();
            $treePadre =  $response->toArray();
            $longitud = count($treePadre);
          
           if ($longitud < 2) {


                $client->Cypher("MATCH (a:nodo),(b:nodo) WHERE ID(a)=".$idPadre." AND ID(b)=".$idCreado." CREATE (a)-[r:sept]->(b) RETURN r" );
                $response = $client->execute();
                $treePadre =  $response->toArray();
            }else{

                $idNodoDes = $treePadre [0]['id'];
                $client->Cypher("MATCH (a:nodo),(b:nodo)  WHERE ID(a)=".$idPadre." AND ID(b)=".$idNodoDes."  MATCH (a)-[r:sept]->(b) DELETE r" );
                $response = $client->execute();

                $client->Cypher("MATCH (a:nodo),(b:nodo)  WHERE ID(a)=".$idPadre." AND ID(b)=".$idCreado."  CREATE (a)-[r:sept]->(b) " );
                $response = $client->execute();

                $client->Cypher("MATCH (a:nodo),(b:nodo)  WHERE ID(a)=".$idCreado." AND ID(b)=".$idNodoDes."  CREATE (a)-[r:sept]->(b) " );
                $response = $client->execute();
            }
            var_dump($longitud);
            var_dump($treePadre);             
        }

    }


}
