<?php 
include('../db_handler.php'); 
include('../db_functions.php'); 


 $db = openDB();

 $results = getClientCollection($db);
 closeDB($db);

 echo ($results);
?>