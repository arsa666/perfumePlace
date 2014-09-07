<?php

function createModel(){
global $argv, $argc;
$argv1 = $argv[1];
$fileName = "js/models/$argv1".".js";
//$fileName = "js/model/test.js";
$modelApi = "api/$argv1".".php";
$file=fopen($fileName,"w") or exit("Unable to create model file!");

fwrite($file,"var $argv1 = Backbone.Model.extend({
	initialize: function () {
        this.url = 'api/".$argv1.".php';
    },});");

fclose($file);
$fileApi=fopen("$modelApi","w") or exit("Unable to create model file!");
$temp = "$"."_SERVER['REQUEST_METHOD']";
fwrite($fileApi, "
<?php  
include('../db_handler.php'); 
include('../db_functions.php'); 

if ( \$_SERVER['REQUEST_METHOD'] === 'POST' || \$_SERVER['REQUEST_METHOD'] === 'PUT') {
    \$data = json_decode(file_get_contents('php://input'));
    \$id = \$data->{'id'};
    \$name = \$data->{'name'};

    //sanitation checks
    \$db = openDB();

    //\$results = somefunc(\$db, \$id, \$name, \$cantidad);
    
    closeDB(\$db);
    echo \$results;
}elseif(\$_SERVER['REQUEST_METHOD'] === 'GET'){
    //return model;

}

?>");


fclose($fileApi);
}

createModel();


?>           