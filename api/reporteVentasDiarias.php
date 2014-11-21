
<?php  
ini_set('max_input_vars', 3000);
include('../db_handler.php'); 
include('../db_functions.php'); 
if($_SERVER['REQUEST_METHOD'] === 'GET') {
  $db = openDB();
  $lugar = (string)$_GET['lugar'];
  $year = (string)$_GET['year'];
  $month = (string)$_GET['month'];
  $day = (string)$_GET['day'];


  if (strcmp($lugar,"Central") === 0 || strcmp($lugar,"Pueblos") === 0) {
     if (strcmp($lugar,"Pueblos") === 0) {
        $table = "VentasDiariasPueblos";
    } else {
        $table = "VentasDiarias";
    }
    if(ctype_digit($year) && ctype_digit($month) && ctype_digit($day) && strlen($year) === 4 && strlen($month) === 2 && strlen($day) <= 2){
        $results = getReporteVentasDiarias($db, $table, $year, $month, $day);
        closeDB($db);
        echo $results;
    }
  }
}
?>