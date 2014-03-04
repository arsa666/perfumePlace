<?php  include('../db_functions.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
	$data = json_decode(file_get_contents('php://input'));
	$id = $data->{'id'};
	$name = $data->{'name'};
	$cantidad = $data->{'cantidad'};

	//sanitation checks
 	$db = openDB();

 	$results = insertMercanciaBodega($db, $id, $name, $cantidad);
 	
 	closeDB($db);
 	echo $results;

}
?>