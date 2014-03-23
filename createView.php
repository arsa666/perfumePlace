<?php

function createView(){
global $argv, $argc;
$argv1 = $argv[1];
$fileName = "js/views/$argv1".".js";

$templateName = "js/templates/$argv1"."Template.html";
$file=fopen($fileName,"w") or exit("Unable to create view file!");

fwrite($file,"var $argv1 = Backbone.View.extend({
	events:{
	'click .template': 'templateFunc'
	},
	templateFunc: function(){
	},
    render:function() {
    	self = this;
    	 $.get('$templateName', function (data) {
            template = _.template($(data).html(), {});
            self.\$el.html(template);
        }, 'html');

        return this;
    }
});");

fclose($file);
$fileTemplate=fopen("$templateName","w") or exit("Unable to create template file!");

fwrite($fileTemplate, "<script type='text/template'>

<div class='.template'>Template for $templateName and view $fileName. Click me!</div>

</script>");
fclose($fileTemplate);
}


createView();


?>           