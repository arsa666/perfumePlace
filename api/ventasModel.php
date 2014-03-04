<?php  include('../db_functions.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
	$data = json_decode(file_get_contents('php://input'));
	$coid = $data->{'coid'};
	$nombre = $data->{'nombre'};
	$precioVenta = $data->{'precioVenta'};
	$cantidad = $data->{'cantidad'};
	$tipoVenta = $data->{'tipoVenta'};
	$nombreCliente = $data->{'nombreCliente'};
	$numeroCliente = $data->{'numeroCliente'};
	$total = $data->{'total'};

	//sanitation checks
 	$db = openDB();

 	$results = ventaRegistrar($db, $coid, $nombre ,$precioVenta, $cantidad, $tipoVenta, $total, $nombreCliente, $numeroCliente);
 	
 	closeDB($db);

 	echo $results;

}

?>