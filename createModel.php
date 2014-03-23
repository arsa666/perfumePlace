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
<?php  include('../db_functions.php'); 

if ( $temp === 'POST' || $temp === 'PUT') {
    \$data = json_decode(file_get_contents('php://input'));
    \$id = \$data->{'id'};
    \$name = \$data->{'name'};

    //sanitation checks
    \$db = openDB();

    //\$results = somefunc(\$db, \$id, \$name, \$cantidad);
    
    closeDB(\$db);
    echo \$results;
}

if (\$temp === 'GET') {
    //return model;

}

?>");


fclose($fileApi);
}

createModel();


?>           