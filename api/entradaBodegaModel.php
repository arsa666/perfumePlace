
<?php  
include('../db_handler.php'); 
include('../db_functions.php'); 

if ( $_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'));
    $id = $data->{'id'};
    $name = $data->{'name'};

    //sanitation checks
    $db = openDB();

    //$results = somefunc($db, $id, $name, $cantidad);
    
    closeDB($db);
}elseif($_SERVER['REQUEST_METHOD'] === 'GET') {
    $year = $_GET["year"];
    $month = $_GET["month"];
    $day = $_GET["day"];

    if(ctype_digit($year) && ctype_digit($month) && ctype_digit($day) && strlen($year) === 4 && strlen($month) === 2 && strlen($day) <= 2){
        $db = openDB();
        $results = getEntradaBodega($db, $year, $month, $day);        
        closeDB($db);
        echo $results;
    }
}
?>