<?php

function createModel(){
global $argv, $argc;
$argv1 = $argv[1];
$fileName = "js/model/$argv1".".js";

$modelApi = "api/$argv1".".php";
$file=fopen($fileName,"w") or exit("Unable to create view file!");

fwrite($file,"var $argv1 = Backbone.View.extend({
	events:{
	'click .template': 'templateFunc'
	},
	templateFunc: function(){
	},
    render:function() {
    	self = this;
    	 $.get('$modelApi', function (data) {
            template = _.template($(data).html(), {});
            self.\$el.html(template);
        }, 'html');

        return this;
    }
});");

fclose($file);
$fileTemplate=fopen("$modelApi","w") or exit("Unable to create template file!");

fwrite($fileTemplate, "<script type='text/template'>

<div class='.template'>Template for $modelApi and view $fileName. Click me!</div>

</script>");
fclose($fileTemplate);
}


createModel();


?>           