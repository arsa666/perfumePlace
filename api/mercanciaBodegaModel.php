<?php  
include('../db_handler.php'); 
include('../db_functions.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
	$data = json_decode(file_get_contents('php://input'));
	$id = $data->{'id'};//codigo de barra
	$cantidad = $data->{'cantidad'};//cantidad para ingresar a al bodega

	//sanitationchecks
	if(ctype_alnum($id) == false){
	  echo "Solo se permite numeros o letras en el codigo de barra, y no espacio en blanco";
	  return;
	}
	
	if(is_numeric($cantidad) == false){
	  echo "Solo se permiten numeros para la cantidad, no letras o symbolos o espacios en blanco.";
	  return;
	}
 	
	
	$db = openDB();
	
 	$results = insertMercanciaBodega($db, $id, $name, $cantidad);
 	
 	closeDB($db);
 	echo $results;

}
?>