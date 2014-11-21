
<?php  
include('../db_handler.php'); 
include('../db_functions.php'); 
if($_SERVER['REQUEST_METHOD'] === 'GET') {
  $db = openDB();
  $lugar = (string)$_GET['lugar'];
  $year1 = (string)$_GET['year1'];
  $month1 = (string)$_GET['month1'];
  $day1 = (string)$_GET['day1'];
  $year2 = (string)$_GET['year2'];
  $month2 = (string)$_GET['month2'];
  $day2 = (string)$_GET['day2'];

  if (strcmp($lugar,"Central") === 0 || strcmp($lugar,"Pueblos") === 0) {
    if (strcmp($lugar,"Pueblos") === 0) {
        $table = "VentasDiariasPueblos";
    } else {
        $table = "VentasDiarias";
    }
    if((ctype_digit($year1) && ctype_digit($month1) && ctype_digit($day1) && strlen($year1) === 4 && strlen($month1) === 2 && strlen($day1) <= 2) && (ctype_digit($year2) && ctype_digit($month2) && ctype_digit($day2) && strlen($year2) === 4 && strlen($month2) === 2 && strlen($day2) <= 2)){
        $results = getReporteVentasTimeRange($db, $table, $year1, $month1, $day1, $year2, $month2, $day2);
         closeDB($db);
         echo $results;  
      }
    }
}
?>