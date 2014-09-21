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

//substract inventory from table of mercanciAfuera and mercanciaBodega
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

function getNameOfProduct($con, $id){
  if($stmt = $con->prepare("SELECT name FROM Productos where id=?"))
      { 
        $id = (string)$id;
        if (!$stmt->bind_param("s", $id)){
          echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
         
        }
        $stmt->execute();
          /* Bind results */
        $stmt->bind_result($name);
        /* Fetch the value */
        $stmt->fetch();
        $stmt->close();
        return $name;
      }
 }

 function getTypeOfProduct($con, $id){
      if($stmt = $con->prepare("SELECT type FROM Productos where id=?"))
      { 
        $id = (string)$id;
        if (!$stmt->bind_param("s", $id)){
          echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
         
        }
        $stmt->execute();
          /* Bind results */
        $stmt->bind_result($type);
        /* Fetch the value */
        $stmt->fetch();
        $stmt->close();
        return $type;
      }
 }


  function getCantidadProducto($con, $id){
      $json = array();
      if($stmt = $con->prepare("SELECT cantidad FROM MercanciaBodega where id=?"))
      { 
	$cantidad = 0;
        $id = (string)$id;
        if (!$stmt->bind_param("s", $id)){
          echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
         
        }
        $stmt->execute();
          /* Bind results */
        $stmt->bind_result($cantidad);
        /* Fetch the value */
        $stmt->fetch();
        $stmt->close();
        $json['cantidad_bodega'] = $cantidad;       
      }
      if($stmt = $con->prepare("SELECT cantidad FROM MercanciaAfuera where id=?"))
      { 
	$cantidad = 0;
        $id = (string)$id;
        if (!$stmt->bind_param("s", $id)){
          echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
         
        }
        $stmt->execute();
          /* Bind results */
        $stmt->bind_result($cantidad);
        /* Fetch the value */
        $stmt->fetch();
        $stmt->close();
        $json['cantidad_afuera'] = $cantidad;       
      }

      if($stmt = $con->prepare("SELECT cantidad FROM MercanciaPueblos where id=?"))
      { 
	$cantidad = 0;
        $id = (string)$id;
        if (!$stmt->bind_param("s", $id)){
          echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
         
        }
        $stmt->execute();
          /* Bind results */
        $stmt->bind_result($cantidad);
        /* Fetch the value */
        $stmt->fetch();
        $stmt->close();
        $json['cantidad_pueblos'] = $cantidad;       
      }

      $json = json_encode($json);
      return $json;
 }


//insert into register table of either bodega or fuera. 
function plusRegisterInventory($con, $table, $id, $quantity,$precio, $lugar, $name) {
    if($stmt = $con->prepare ("INSERT INTO $table (id, name, cantidad, precio, lugar) values (?, ?, ?, ?, ?)")){
                    if (!$stmt->bind_param("ssids", $id, $name, $quantity, $precio, $lugar)){
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


function plusInventory($con, $table, $id, $quantity,$precio, $lugar){
        $totalAvaialable =  getTotalAvailable($con, $table, $id);
        $total = $totalAvaialable + $quantity;
        $name = getNameOfProduct($con, $id);
        if ($name === null) {
          return "Este Producto no esta registrado, porfavor registre el producto y luego ingrese a la bodega.";
        }
        if($stmt = $con->prepare ("INSERT INTO $table (id, name, cantidad, precio, lugar) values (?,?,?,?,?) ON DUPLICATE KEY UPDATE name=? ,cantidad=?, precio=?, lugar=?")){
                    if (!$stmt->bind_param("ssidssids", $id, $name, $total,$precio, $lugar, $name, $total, $precio, $lugar)){
                        $response = mysqli_stmt_errno($stmt);
                         return $response;
                    }
                    
                    if (!$stmt->execute()) {
                      $response = mysqli_stmt_errno($stmt);
                      return $response;   
                    }
                    $stmt->close(); 
                    $response = 0;

                    if ($response == 0) {
                        $table = "Registro". $table;
                        $response = plusRegisterInventory($con, $table, $id, $quantity, $precio, $lugar, $name);
                        return $response;
                    }                 
        }else{
            $response = mysqli_stmt_errno($stmt);
            return $response;
        }
 }

function getPrecioLugarBodega($con, $id, $table) {
    if($stmt = $con->prepare("SELECT precio, lugar FROM $table where id=?"))
      { 
        $id = (string)$id;
        if (!$stmt->bind_param("s", $id)){
          echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
         
        }
        $stmt->execute();
          /* Bind results */
        $stmt->bind_result($precio, $lugar);
        /* Fetch the value */
        $stmt->fetch();
        $stmt->close();
        $json = array();
        $json['precio'] = $precio;   
        $json['lugar'] = $lugar;
        return $json;
      }
 }


function insertMercanciaAfuera($con, $id, $cantidad){
  $id = $id;
  $cantidad = (int)$cantidad;
  $precio = floatval($precio);

  
  if(is_numeric($id) === false){
      return 0;
    }

    $cantidadActual = 0;
    $cantidadActual = getTotalAvailable($con, "MercanciaBodega", $id);//get total from bodega
    if($cantidadActual == 0){
        return -1;     
    }else{
      $total = $cantidadActual - $cantidad;//if amount wanted is possible. 
      if($total >= 0){
            $insertedCorrectly = false;
            $insertedCorrectly =  minusInventory($con, "MercanciaBodega", $id, $cantidad);//substract from bodega.

            if($insertedCorrectly === 0){ //if correctly substracted from bodega then add to sala de venta.
              $cantidadActual = 0;                
              $cantidadActual = getTotalAvailable($con, "MercanciaAfuera", $id);
              $getPrecioLugarBodega = getPrecioLugarBodega($con, $id, 'MercanciaBodega');
              $precio = $getPrecioLugarBodega['precio'];
              $lugar = $getPrecioLugarBodega['lugar'];
              $checkInsertion = plusInventory($con, "MercanciaAfuera", $id, $cantidad, $precio, $lugar);
              return $checkInsertion;             
            }
            return $insertedCorrectly;
      }else{
        return $cantidadActual;
      }
    }
}

function insertMercanciaPueblos($con, $id, $cantidad, $trans){
  
  $id = $id;
  $cantidad = (int)$cantidad;
  $precio = floatval($precio);
  
  $transTable = 'MercanciaBodega';

  if (strcmp($trans, 'sala') === 0){
    $transTable = 'MercanciaAfuera';
  }
    
  if(is_numeric($id) === false){
      return 0;
    }

    $cantidadActual = 0;
    $cantidadActual = getTotalAvailable($con, $transTable, $id);//get total from bodega
    if($cantidadActual == 0){
        return -1;     
    }else{
      $total = $cantidadActual - $cantidad;//if amount wanted is possible. 
      if($total >= 0){
            $insertedCorrectly = false;
            $insertedCorrectly =  minusInventory($con, $transTable, $id, $cantidad);//substract from bodega.

            if($insertedCorrectly === 0){ //if correctly substracted from bodega then add to sala de venta.
              $cantidadActual = 0;                
              $cantidadActual = getTotalAvailable($con, "MercanciaPueblos", $id);
              $getPrecioLugarBodega = getPrecioLugarBodega($con, $id, $transTable);
              $precio = $getPrecioLugarBodega['precio'];
              $lugar = $getPrecioLugarBodega['lugar'];
              $checkInsertion = plusInventory($con, "MercanciaPueblos", $id, $cantidad, $precio, $lugar);
              return $checkInsertion;             
            }
            return $insertedCorrectly;
      }else{
        return $cantidadActual;
      }
    }
}


function insertMercanciaBodega($con, $id, $cantidad, $precio, $lugar){
  $id = $id;
  $cantidad = (int)$cantidad;
  $precio = floatval($precio);
  
  if(is_numeric($id) === false){
      return 0;
    }

    $checkInsertion = plusInventory($con, "MercanciaBodega", $id, $cantidad, $precio, $lugar); 
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

function ventaRegistrar($con, $coid, $precioVenta, $cantidad, $tipoVenta, $total, $cedulaCliente, $formaPago, $otroAlmacen){
  
  $precioVenta = floatval($precioVenta);
  $cantidad = intval($cantidad);
  $total = floatval($total);
  $nombre = getNameOfProduct($con, $coid);
  $type = getTypeOfProduct($con, $coid);

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
        if($stmt = $con->prepare ("INSERT INTO VentasDiarias (coid, nombre, type, precioVenta, cantidad, tipoVenta, total, cedulaCliente, formaPago, otroAlmacen) values (?,?,?,?,?,?,?,?,?,?)")){

              if (!$stmt->bind_param("sssdisdsss", $coid, $nombre, $type, $precioVenta, $cantidad, $tipoVenta, $total, $cedulaCliente, $formaPago, $otroAlmacen)){
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



function ventaRegistrarPueblos($con, $coid, $precioVenta, $cantidad, $tipoVenta, $total, $cedulaCliente, $formaPago, $otroAlmacen){
  
  $precioVenta = floatval($precioVenta);
  $cantidad = intval($cantidad);
  $total = floatval($total);
  $nombre = getNameOfProduct($con, $coid);
  $type = getTypeOfProduct($con, $coid);
  

  if(is_numeric($coid) == false){
      return 0;
    }

    $cantidadPueblos =  getTotalAvailable($con, "MercanciaPueblos", $coid);
    $totalLeft = $cantidadPueblos - $cantidad;
    if($totalLeft >= 0 && $cantidadPueblos !== 0){
      if($formaPago == 'Credito') {//if credito venta then check for valid clientecredito. 
          $clienteBool = checkClienteCredito($con, $cedulaCliente);
          if($clienteBool === false) {
            return 10;//cedula cliente error
          }          
      }
        if($stmt = $con->prepare ("INSERT INTO VentasDiariasPueblos (coid, nombre, type, precioVenta, cantidad, tipoVenta, total, cedulaCliente, formaPago, otroAlmacen) values (?,?,?,?,?,?,?,?,?,?)")){

              if (!$stmt->bind_param("sssdisdsss", $coid, $nombre, $type, $precioVenta, $cantidad, $tipoVenta, $total, $cedulaCliente, $formaPago, $otroAlmacen)){
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
            //venta registered correctly so now substract from mercanciaPueblos.
            $insertedCorrectly =  minusInventory($con, "MercanciaPueblos", $coid, $cantidad);

            return $insertedCorrectly;
            
        }
    }else{
        if($cantidadPueblos === 0){
            return "Este producto no se encuentra en los pueblos";
        }
        return $cantidadPueblos;
    }        
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

function getEntradaBodega($con, $year, $month, $day)
{ 
  $start = $year."-".$month."-".$day." 00:00:00";
  $end = $year."-".$month."-".$day." 23:59:59";

    $sql="SELECT * FROM `RegistroMercanciaBodega` WHERE time BETWEEN '$start' AND '$end' ORDER BY `name` ASC";
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

function getEntradaPueblos($con, $year, $month, $day)
{ 
  $start = $year."-".$month."-".$day." 00:00:00";
  $end = $year."-".$month."-".$day." 23:59:59";

    $sql="SELECT * FROM `RegistroMercanciaPueblos` WHERE time BETWEEN '$start' AND '$end' ORDER BY `name` ASC";
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

function getEntradaAfuera($con, $year, $month, $day)
{ 
  $start = $year."-".$month."-".$day." 00:00:00";
  $end = $year."-".$month."-".$day." 23:59:59";

    $sql="SELECT * FROM `RegistroMercanciaAfuera` WHERE time BETWEEN '$start' AND '$end' ORDER BY `name` ASC";
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
      $stmt->bind_result($id, $name, $size, $type);
      /* Fetch the value */
      $stmt->fetch();
      $stmt->close();
      $json = array();

      $json['id'] = $id;
      $json['name'] = $name;
      $json['size'] = $size;
      $json['type'] = $type;


      return json_encode($json);
    }
}

  function getCliente($con, $id)
  { 
    if($stmt = $con->prepare("SELECT * FROM ClienteCredito where id=?"))
      { 
        $id = (string)$id;
        if (!$stmt->bind_param("s", $id)){
          echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
         
        }
        $stmt->execute();
          /* Bind results */
        $stmt->bind_result($id, $nombre, $celular);
        /* Fetch the value */
        $stmt->fetch();
        $stmt->close();
        $json = array();

        $json['id'] = $id;
        $json['nombre'] = $nombre;
        $json['celular'] = $celular;

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

  function updateOrCreateProducto($con, $id, $name, $size, $type)
  {
    if(is_numeric($id) == false){
      return 0;
    }
    if($stmt = $con->prepare ("INSERT INTO Productos (id, name, size, type) values (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=?, size=?, type=?")){

      if (!$stmt->bind_param("sssssss", $id, $name, $size, $type, $name, $size, $type)){
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
