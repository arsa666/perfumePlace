<?php 
include('../db_handler.php'); 
include('../db_functions.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
	$data = json_decode(file_get_contents('php://input'));
	
	$coid = $data->{'coid'};
	$nombre = $data->{'nombre'};
	$precioVenta = $data->{'precioVenta'};
	$cantidad = $data->{'cantidad'};
	$tipoVenta = $data->{'tipoVenta'};
	$cedulaCliente = $data->{'cedulaCliente'};
	$total = $data->{'total'};
    
	$formaPago = $data->{'formaPago'};
	$otroAlmacen = $data->{'otroAlmacen'};

	//sanitation checks
    if(ctype_alnum($coid) == false){
      echo "Solo se permite numeros o letras en el codigo de barra, y no espacio en blanco";
      return;
    }

	//sanitation checks
 	$db = openDB();

 	$results = ventaRegistrar($db, $coid, $precioVenta, $cantidad, $tipoVenta, $total, $cedulaCliente, $formaPago, $otroAlmacen);
 	
 	closeDB($db);

 	echo $results;

}

?>