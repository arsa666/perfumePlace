<?php include('../db_functions.php'); 

 $db = openDB();

 $results = getProductoCollection($db);
 closeDB($db);

 echo ($results);
?>