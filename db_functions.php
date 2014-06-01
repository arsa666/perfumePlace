<?php
  //database classs written by: Arsalan Ahmed 

function getTotalAvailable($con, $table, $id){

  if($stmt = $con->prepare("SELECT cantidad FROM $table where id=?")){ 
        $id = (string)$id;
        if (!$stmt->bind_param("s", $id)){
            $response = mysqli_stmt_errno($stmt);  
            return $response;
        }
        if(!$stmt->execute()){
           $response = mysqli_stmt_errno($stmt);  
           return $response;
       }
    $cantidadActual = 0;
    /* Bind results */
    $stmt->bind_result($cantidadActual);    
    /* Fetch the value */
    $stmt->fetch();
    $stmt->close();
    return $cantidadActual;
   }
 }

 function minusInventory($con, $table, $id, $quantity){
        $totalAvaialable =  getTotalAvailable($con, $table, $id);
        $total = $totalAvaialable - $quantity;
        if($totalAvaialable > 0 && $total >= 0){
            if($stmt = $con->prepare ("INSERT INTO $table (id, cantidad) values (?, ?) ON DUPLICATE KEY UPDATE cantidad=?")){
                        
                    if (!$stmt->bind_param("sii", $id, $total, $total)){
                        $response = mysqli_stmt_errno($stmt);
                         return $response;
                    }                    
                    if (!$stmt->execute()) {
                      $response = mysqli_stmt_errno($stmt);
                      return $response;   
                    }
                    $stmt->close();
                    return 0;
            }
        }else{
            return "Error in Minus Inventory.";
        }
 }

  function plusInventory($con, $table, $id, $quantity){
        $totalAvaialable =  getTotalAvailable($con, $table, $id);
        $total = $totalAvaialable + $quantity;
         if($stmt = $con->prepare ("INSERT INTO $table (id, cantidad) values (?,?) ON DUPLICATE KEY UPDATE cantidad=?")){
                    if (!$stmt->bind_param("sii", $id,$total, $total)){
                        $response = mysqli_stmt_errno($stmt);
                         return $response;
                    }
                    
                    if (!$stmt->execute()) {
                      $response = mysqli_stmt_errno($stmt);
                      return $response;   
                    }
                    $stmt->close(); 
                    $response = 0;                   
                    return $response;
        }else{
            $response = mysqli_stmt_errno($stmt);
            return $response;
        }
 }


function insertMercanciaAfuera($con, $id, $cantidad){
  $id = $id;
  $cantidad = (int)$cantidad;
  
  if(is_numeric($id) === false){
      return 0;
    }

    $cantidadActual = 0;
    $cantidadActual = getTotalAvailable($con, "MercanciaBodega", $id);
    if($cantidadActual == 0){
        return -1;     
    }else{
      $total = $cantidadActual - $cantidad;
      if($total >= 0){
            $insertedCorrectly = false;
            $insertedCorrectly =  minusInventory($con, "MercanciaBodega", $id, $cantidad);

            if($insertedCorrectly === 0){
              $cantidadActual = 0;                
              $cantidadActual = getTotalAvailable($con, "MercanciaAfuera", $id);    
              $checkInsertion = plusInventory($con, "MercanciaAfuera", $id, $cantidad);             
                return $checkInsertion;             
            }
            return $insertedCorrectly;
      }else{
        return $cantidadActual;
      }
    }
}

function insertMercanciaBodega($con, $id, $name, $cantidad){
  $id = $id;
  $cantidad = (int)$cantidad;
  
  if(is_numeric($id) === false){
      return 0;
    }

    $checkInsertion = plusInventory($con, "MercanciaBodega", $id, $cantidad); 
    return $checkInsertion;
}

function checkClienteCredito($con, $cedula) {
    if($stmt = $con->prepare("SELECT * FROM ClienteCredito where id=?")){ 
        $id = (string)$cedula;
        if (!$stmt->bind_param("s", $id)){
            $response = mysqli_stmt_errno($stmt);  
            return $response;
        }
        if(!$stmt->execute()){
           $response = mysqli_stmt_errno($stmt);  
           return $response;
       }
    $cedulaCliente = null;
    $nombre = null;
    $telefono = null;
    /* Bind results */
    $stmt->bind_result($cedulaCliente, $nombre, $telefono);    
    /* Fetch the value */
    $stmt->fetch();
    $stmt->close();
    if($cedulaCliente === null){
      return false;
    } else{
      return true;
    }
  }
}

function ventaRegistrar($con, $coid, $nombre ,$precioVenta, $cantidad, $tipoVenta, $total, $cedulaCliente, $formaPago, $otroAlmacen){
  
  $precioVenta = floatval($precioVenta);
  $cantidad = intval($cantidad);
  $total = floatval($total);

  if(is_numeric($coid) == false){
      return 0;
    }

    $cantidadAfuera =  getTotalAvailable($con, "MercanciaAfuera", $coid);
    $totalLeft = $cantidadAfuera - $cantidad;
    if($totalLeft >= 0 && $cantidadAfuera !== 0){
      if($formaPago == 'Credito') {//if credito venta then check for valid clientecredito. 
          $clienteBool = checkClienteCredito($con, $cedulaCliente);
          if($clienteBool === false) {
            return 10;//cedula cliente error
          }          
      }
        if($stmt = $con->prepare ("INSERT INTO VentasDiarias (coid, nombre, precioVenta, cantidad, tipoVenta, total, cedulaCliente, formaPago, otroAlmacen) values (?,?,?,?,?,?,?,?,?)")){

              if (!$stmt->bind_param("ssdisdsss", $coid, $nombre, $precioVenta, $cantidad, $tipoVenta, $total, $cedulaCliente, $formaPago, $otroAlmacen)){
                 echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
                 $response = "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error; 
                 return $response; 
              }
              if (!$stmt->execute()) {
                  echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;   
                  $response =  "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
                  return $response;
                }              
            $stmt->close();
            //venta registered correctly so now substract from sala de venta.  
            $insertedCorrectly =  minusInventory($con, "MercanciaAfuera", $coid, $cantidad);

            return $insertedCorrectly;
            
        }
    }else{
        if($cantidadAfuera === 0){
            return "Este producto no se encuentra en la sala de ventas";
        }
        return $cantidadAfuera;
    }        
}

function getProductoCollection($con)
  {
    // $sql="SELECT * FROM Productos";
    // $result=mysqli_query($con, $sql);

    // $myArray = array();
    // $i = 0;
    // while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
    // {
    //   array_push($myArray, $row);

      
    //   // if($i > )
    //   //   break;

    //   // $i++;
    // }
    // //mysqli_free_result($result);
    // $myArray = json_encode($myArray);
    // return $myArray;


    ///


    // if($stmt = $con->prepare("SELECT * FROM Productos"))
    //   { 
    //     $myArray = array();
        
    //     $stmt->execute();
    //       /* Bind results */
    //     $stmt->bind_result($id, $name, $size);
    //     /* Fetch the value */
    //     //$stmt->fetch();
    //     //$json = array();

    //      while ($row = $stmt->fetch()) {
    //             $json = array();
    //             $json['id'] = $id;
    //             $json['name'] = $name;
    //             $json['size'] = $size;
    //             $json = json_encode($json);
    //             array_push($myArray, $json);
    //     }
    //     $stmt->close();

    //     return $myArray;
    //     //return json_encode($json);
    //   }


  }

  function getClientCollection($con)
  {
    $sql="SELECT * FROM ClienteCredito";
    $result=mysqli_query($con, $sql);

    $myArray = array();

    while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
    {
      array_push($myArray, $row);
    }
    mysqli_free_result($result);
    $myArray = json_encode($myArray);
    return $myArray;
  }

  function getProducto($con, $id)
  { 
    if($stmt = $con->prepare("SELECT * FROM Productos where id=?"))
      { 
        $id = (string)$id;
        if (!$stmt->bind_param("s", $id)){
          echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
         
        }
        $stmt->execute();
          /* Bind results */
        $stmt->bind_result($id, $name, $size);
        /* Fetch the value */
        $stmt->fetch();
        $stmt->close();
        $json = array();

        $json['id'] = $id;
        $json['name'] = $name;
        $json['size'] = $size;

        return json_encode($json);
      }
  }

  function insertarClienteCredito($con, $cedula, $name, $celular){
      if($stmt = $con->prepare ("INSERT INTO ClienteCredito (id, nombre, celular) values (?,?,?)")){
                    if (!$stmt->bind_param("sss", $cedula,$name, $celular)){
                        $response = mysqli_stmt_errno($stmt);
                         return $response;
                    }                    
                    if (!$stmt->execute()) {
                      $response = mysqli_stmt_errno($stmt);
                      return $response;   
                    }
                    $stmt->close(); 
                    $response = 0;                   
                    return $response;
        }else{
            $response = mysqli_stmt_errno($stmt);
            return $response;
        }
  }

  function updateOrCreateProducto($con, $id, $name)
  {
    if(is_numeric($id) == false){
      return 0;
    }

    if($stmt = $con->prepare ("INSERT INTO Productos (id, name) values (?, ?) ON DUPLICATE KEY UPDATE name=?")){

      if (!$stmt->bind_param("sss", $id, $name, $name)){
         echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
          $response = "0";    
          return $response;     
      }

      if (!$stmt->execute()) {
          echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
          $response = "0";
          return $response;     

      }
      $response = "1";
      return $response;     

    }
    $stmt->close();
  } 
?>
