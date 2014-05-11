<?php
function openDB()
  {
    
    // Create connection
    $con=mysqli_connect("localhost","root","","arsa666_perfumePlace");

    // Check connection
    if(mysqli_connect_errno())
    {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    return $con;
  }

  function closeDB($con)
  {
    mysqli_close($con);
  }//close

?>
