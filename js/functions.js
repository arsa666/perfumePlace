function CloseParent(view){
	
	view.unbind(); // Unbind all local event bindings
    
    if(view.model){
    	view.model.unbind( 'change', view.render, view ); // Unbind reference to the model
    }

    view.remove(); // Remove view from DOM
 
    delete view.$el; // Delete the jQuery wrapped object variable
    delete view.el; // Delete the variable reference to view node
 }

 function C(msg){
 	console.log(msg);
 }