
<?php  include('../db_functions.php'); 

if ( $_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'));
    $cedula = $data->{'cedula'};
    $name = $data->{'name'};
    $celular = $data->{'celular'};

    //sanitation checks
    $db = openDB();

    $results = insertarClienteCredito($db, $cedula, $name, $celular);
    
    closeDB($db);
    echo $results;
}

if ($temp === 'GET') {
    //return model;

}

?>