<?php  
echo '
<!DOCTYPE HTML>
<html>
<head>
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" type="text/css" href="jquery-ui.css">
	<!-- CSS -->
	<!-- JavaScript -->
    <script src="js/libs/jquery-2.0.3.min.js"></script>
    <script src="js/libs/underscore-min.js"></script>
    <script src="js/libs/backbone-min.js"></script> 
    <script src="js/functions.js"></script> 
    <script src="js/libs/Chart.js"></script>
    <script src="js/libs/jquery-ui.js"></script>';

    if ($handle = opendir('js/models')) {
    while (false !== ($entry = readdir($handle))) {
        $extension = substr($entry, -3);
        if ($entry != "." && $entry != ".." && $extension == ".js" && $entry[0] != ".") {
            echo "<script src='js/models/$entry'></script>";
        }
    }
    closedir($handle);
    }

    if ($handle = opendir('js/collections')) {
    while (false !== ($entry = readdir($handle))) {
        $extension = substr($entry, -3);
        if ($entry != "." && $entry != ".." && $extension == ".js" && $entry[0] != ".") {
            echo "<script src='js/collections/$entry'></script>";
        }
    }
    closedir($handle);
    }

    if ($handle = opendir('js/views')) {
    while (false !== ($entry = readdir($handle))) {
        $extension = substr($entry, -3);
        if ($entry != "." && $entry != ".." && $extension == ".js" && $entry[0] != ".") {
            echo "<script src='js/views/$entry'></script>";
        }
    }
    closedir($handle);
    }
    echo'
    <script src="js/router.js"></script>
    <!-- JavaScript -->

      <title>Admin</title>
    </head>';    
?>