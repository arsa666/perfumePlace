<?php  
include('../db_handler.php'); 
include('../db_functions.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
	$data = json_decode(file_get_contents('php://input'));
	$id = $data->{'id'};
	$name = $data->{'name'};
    $size = $data->{'size'};
    $type = $data->{'type'};

    
	//sanitation checks
    if(ctype_alnum($id) == false || $name == ''){
      echo "Solo se permite numeros o letras en el codigo de barra, y no espacio en blanco";
      return;
    }


 	$db = openDB();

 	$results = updateOrCreateProducto($db, $id, $name, $size, $type);
 	
 	closeDB($db);

 	echo $results;

}elseif($_SERVER['REQUEST_METHOD'] === 'GET'){
    $id = $_GET["id"];
	 if(ctype_alnum($id) != false){
        $db = openDB();

     	$results = getProducto($db, $id);
     	
     	closeDB($db);

     	echo $results;
    }
}


?>