
<?php  
include('../db_handler.php'); 
include('../db_functions.php'); 

if ( $_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    // $data = json_decode(file_get_contents('php://input'));
    // $id = $data->{'id'};
    // $name = $data->{'name'};

    // //sanitation checks
    // $db = openDB();

    // //$results = somefunc($db, $id, $name, $cantidad);
    
    // closeDB($db);
    // echo $results;
}elseif($_SERVER['REQUEST_METHOD'] === 'GET'){
    $id = $_GET["id"];
   
    if(ctype_digit($id)){
        $db = openDB();
        $results = getCantidadProducto($db, $id);  
        closeDB($db);
        echo $results;
    }
}

?>