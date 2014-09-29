//function to close view and clean DOM.
function closeView(view){
    if(view !== undefined) {
	console.log("Closing: " + view.cid);
    }

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

        if (response == '1452') {
            msg = msg + ' Foreign Key Constraint' ;
        }

        if (response.responseText !== undefined) {
            msg = msg + "Response text: " +response.responseText;
        }
    }

    alert(msg);
}
//val es el input or just simple span text. input es con val y span con html
function fetchAndDisplayProduct(model, el, val){
    val = val || false;
    model.fetch({
	success: function (m) {
	    if(!_.isNull(m.get('name'))){//if exist because name is not null always
    		if (val === false) {
    		    el.find("#productoName").html(m.escape("name"));
    		    el.find("#productoSize").html(m.escape("size"));
                el.find("#productoType").html(m.escape("type"));

    		} else{
    		    el.find("#productoName").val(m.escape("name"));
    		    el.find("#productoSize").val(m.escape("size"));
                el.find("#productoType").val(m.escape("type")).change();

    		}
	    } else {
		   el.find("#productoName").html("No existe este producto, <a href='#/agregar'>desea registrarlo?</a>");
		   el.find("#productoSize").html("");
	    }
	}
    });
}

function fetchAndDisplayCliente(model, el, val){
    val = val || false;
    model.fetch({
    success: function (m) {
        if(!_.isNull(m.get('nombre'))){//if exist because name is not null always
            if (val === false) {
                el.find("#cedulaCliente").val(m.escape("id"));
                el.find("#ventasCliente").html(m.escape("nombre"));
                el.find("#numeroCliente").html(m.escape("celular"));
            } else{
                el.find("#cedulaCliente").val(m.escape("id"));
                el.find("#ventasCliente").val(m.escape("nombre"));
                el.find("#numeroCliente").val(m.escape("celular"));
            }
        } else {
           el.find("#ventasCliente").html("No existe este cliente, <a href='#/clienteCredito'>desea registrarlo?</a>");
           el.find("#numeroCliente").html("");
        }
    }
    });
}

function resetForm(el){
    el.find('#productoName').html('');
    el.find('#productoSize').html('');

    el.find('input[type="text"]').val('');
}

function C(msg){
    console.log(msg);
}

