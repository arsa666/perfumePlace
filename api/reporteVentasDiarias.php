
<?php  
ini_set('max_input_vars', 3000);
include('../db_handler.php'); 
include('../db_functions.php'); 
if($_SERVER['REQUEST_METHOD'] === 'GET') {
  $db = openDB();
  $lugar = (string)$_GET['lugar'];
  if (strcmp($lugar,"Central") === 0 || strcmp($lugar,"Pueblos") === 0) {
    $results = getReporteVentasDiarias($db, $lugar);
    closeDB($db);
    echo $results;  
   }
}
?>