//function to close view and clean DOM.
function closeView(view){

    if(!_.isUndefined(view)){
	view.unbind(); // Unbind all local event bindings

	if(view.model){
    	view.model.unbind( 'change', view.render, view ); // Unbind reference to the model
    }

	if(view.collection){
    	    view.collection.unbind( 'change', view.render, view ); // Unbind reference to the model
	}

	view.remove(); // Remove view from DOM

	delete view.$el; // Delete the jQuery wrapped object variable
	delete view.el; // Delete the variable reference to view node
	console.log('closing view');
    }
}

function addDisabled(elem) {
    elem.attr('disabled', 'disabled');
    elem.attr('style', 'background-color:grey');
}

function removeDisabled(elem) {
    elem.removeAttr('disabled', 'disabled');
    elem.removeAttr('style', 'background-color:grey');
}

//stop propagation and prevent default of events
function stop(event) {
    event.stopPropagation();
    event.preventDefault();
}

//error reporting of model save
function alertError(response){
    var msg = "Error: \n";

    if (response !== undefined){
        if (response == '1062') {
            msg = msg + ' Ya esta registrado' ;
        }

        if (response.responseText !== undefined) {
            msg = msg + "Response text: " +response.responseText;
        }
    }

    alert(msg);
}

 function C(msg){
 	console.log(msg);
 }