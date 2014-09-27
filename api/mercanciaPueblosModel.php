<?php  
include('../db_handler.php'); 
include('../db_functions.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'));
    $id = $data->{'id'};
    $cantidad = $data->{'cantidad'};
    $trans = (string)$data->{'trans'};
    //sanitation checks
    //sanitationchecks
    if(ctype_alnum($id) == false){
      echo "Solo se permite numeros o letras en el codigo de barra, y no espacio en blanco";
      return;
    }
    
    if(is_numeric($cantidad) == false){
      echo "Solo se permiten numeros para la cantidad, no letras o symbolos o espacios en blanco.";
      return;
    }

    if (strcmp($trans, 'bodega') !== 0 && strcmp($trans, 'sala') !== 0) {
      echo "Solo se pueden transferir de Bodega o de Sala de Venta";
      return;
    }

    $db = openDB();
    

    $results = insertMercanciaPueblos($db, $id, $cantidad, $trans);
    
    closeDB($db);
    echo $results;

}
?>



