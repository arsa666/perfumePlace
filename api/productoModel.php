<?php  include('../db_functions.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
	$data = json_decode(file_get_contents('php://input'));
	$id = $data->{'id'};
	$name = $data->{'name'};

	//sanitation checks
 	$db = openDB();

 	$results = updateOrCreateProducto($db, $id, $name);
 	
 	closeDB($db);

 	echo $results;

}elseif($_SERVER['REQUEST_METHOD'] === 'GET'){

	$db = openDB();

 	$results = getProducto($db, $_GET["id"]);
 	
 	closeDB($db);

 	echo $results;
}


?>