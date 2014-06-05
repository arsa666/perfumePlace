
<?php  
include('../db_handler.php'); 
include('../db_functions.php'); 

if ( $_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'));
    $cedula = $data->{'cedula'};
    $name = $data->{'name'};
    $celular = $data->{'celular'};

    //sanitationchecks
    if(ctype_alnum($cedula) == false){
        echo "Solo se permite numeros o letras en la cedula";
        return;
    }

    if(strlen($name) == 0){
      echo "El nombre no puede estar en blanco.";
      return;
    }

    if(is_numeric($celular) == false){
      echo "Solo se permiten numeros para el celular, no letras o symbolos, o espacios en blanco";
      return;
    }

    $db = openDB();
    $results = insertarClienteCredito($db, $cedula, $name, $celular);
    closeDB($db);
    echo $results;
}

?>