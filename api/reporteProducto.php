
<?php  
include('../db_handler.php'); 
include('../db_functions.php'); 
if($_SERVER['REQUEST_METHOD'] === 'GET') {
  $db = openDB();
  $lugar = (string)$_GET['lugar'];
  $coid = (string)$_GET['coid'];
  
  if (strcmp($lugar,"Central") === 0 || strcmp($lugar,"Pueblos") === 0) {
    if (strcmp($lugar,"Pueblos") === 0) {
      $table = "VentasDiariasPueblos";
    } else {
      $table = "VentasDiarias";
    }
    if(ctype_alnum($coid)) {
      $results = getReporteProducto($db, $table, $coid);
      echo $results;  
    }
    
  }
  closeDB($db);

  
}
?>